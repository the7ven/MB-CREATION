<?php
require 'vendor/autoload.php';

// Activation du rapport d'erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration des headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Si c'est une requête OPTIONS, on arrête ici
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad();

    $apiKey = $_ENV['STRIPE_SECRET_KEY'] ?? null;

    if (!$apiKey) {
        throw new Exception('Clé API Stripe non configurée');
    }

    \Stripe\Stripe::setApiKey($apiKey);

    // Récupération et validation des données
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || !isset($data['cartItems']) || empty($data['cartItems'])) {
        throw new Exception('Données du panier invalides ou manquantes');
    }

    $line_items = [];

    foreach ($data['cartItems'] as $item) {
        if (!isset($item['name']) || !isset($item['price']) || !isset($item['quantity'])) {
            throw new Exception('Données d\'article invalides');
        }

        $line_items[] = [
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => $item['name'],
                ],
                'unit_amount' => (int)$item['price'],
            ],
            'quantity' => (int)$item['quantity'],
        ];
    }

    $checkout_session = \Stripe\Checkout\Session::create([
        'line_items' => $line_items,
        'mode' => 'payment',
        'payment_method_types' => ['card'],
        'billing_address_collection' => 'required',
        'shipping_address_collection' => [
            'allowed_countries' => ['US', 'FR', 'DE']
        ],
        'success_url' => 'http://localhost/MB-CREATION/success.html',
        'cancel_url' => 'http://localhost/MB-CREATION/cancel.html',
    ]);

    echo json_encode(['id' => $checkout_session->id]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
?>
