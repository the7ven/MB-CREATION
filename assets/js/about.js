
const fullText = `MB-Creation... clothing that tells a story.

    
MB-Creation is an Afro-urban and chic Afro-urban clothing brand that was established under the initiative of its promoter and designer, Manuella Bufang, in 2017. Indeed, Mrs. Bufang has been passionate about fashion since her early adolescence. She is also very committed to the social and cultural development of her home country, Cameroon, through various charitable works and cultural events. This is how the idea came to her to combine her passions and her causes. The philosophy of the brand lies in its logo, which represents a proliferating root. This root refers to our essence but also to expansion. It is about reconnecting with our culture through clothing and sharing it with the world by connecting to it. To achieve this, the basic material for each piece will be AFRICAN PAGNE (traditional fabric).

Thus, the brand's production will be based in Cameroon, aiming for "Made in Cameroon" while also creating employment. After multiple name changes, including B-Wear by M, Unik, Icône, and Authentic during the brand's creation phase, it will ultimately be registered as MB-Creation. MB-Creation is a brand that focuses on creating unique clothing. Manuella Bufang, the creator, highlights her personal style and originality in her collections. The emphasis is often placed on creative designs, utilizing quality materials and artisanal techniques. The brand aims to offer pieces that allow customers to stand out while celebrating their individuality.

Through MB-Creation, Manuella Bufang proposes collections that reflect her identity and sense of fashion. Her creations are often characterized by bold patterns, modern cuts, and a blend of cultures, showcasing her multicultural background. She has drawn inspiration from her roots and personal experiences to design clothing that tells a story. Her artistic approach aims to celebrate individuality as well as diversity by offering pieces that cater to a clientele seeking style and authenticity.

The label offers premium quality products often made with sustainable local materials and in respect of ethics.`;
  
  const shortText = ` MB-Creation... clothing that tells a story...`;

  function renderContent() {
      const container = document.getElementById('content');
      
      // Title and tagline
      const header = document.createElement('h1');
      header.textContent = content.title;
      container.appendChild(header);

      const tagline = document.createElement('p');
      tagline.className = 'tagline';
      tagline.textContent = content.tagline;
      container.appendChild(tagline);

      // Sections
      content.sections.forEach((section, index) => {
          const div = document.createElement('div');
          div.className = 'section';
          div.innerHTML = section.text;
          container.appendChild(div);
      });
  }

  // Call function when page loads
  document.addEventListener('DOMContentLoaded', renderContent);

  const aboutText = document.getElementById('aboutText');
  const expandBtn = document.getElementById('expandBtn');
  const chevron = document.querySelector('.chevron');
  let isExpanded = false;

  expandBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
      aboutText.textContent = fullText;
      expandBtn.textContent = 'see less';
      chevron.classList.add('rotate');
    } else {
      aboutText.textContent = shortText;
      expandBtn.textContent = 'Clique To know More';
      chevron.classList.remove('rotate');
    }
    
    // Réinsérer l'icône après avoir changé le texte du bouton
    expandBtn.appendChild(chevron);
  });
