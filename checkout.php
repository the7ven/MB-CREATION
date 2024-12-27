<?php
require 'vendor/autoload.php';

Dotenv\Dotenv::createUnsafeImmutable(__DIR__)->load();
\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

header('Content-Type: application/json');


$input = file_get_contents('php://input');
$data = json_decode($input, true);


try {
    $line_items = [];

  
    foreach ($data['cartItems'] as $item) {
        $line_items[] = [
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => $item['name'],
                ],
                'unit_amount' => $item['price'],
            ],
            'quantity' => $item['quantity'],
        ];
    }


    $checkout_session = \Stripe\Checkout\Session::create([
        'line_items' => $line_items,
        'mode' => 'payment',
        'payment_method_types' => ['card'], 
        'billing_address_collection' => 'required',
        'shipping_address_collection' => ['allowed_countries' => ['US', 'FR', 'DE'],],
        'success_url' => 'https://google.com',
        'cancel_url' => 'https://facebook.com',
    ]);

    echo json_encode(['id' => $checkout_session->id]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
