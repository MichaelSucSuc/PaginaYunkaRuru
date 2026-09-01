/* ==========================================================================
   YUNKA RURU - PRODUCTS & TECHNICAL SHEET MODAL CONTROLLER
   ========================================================================== */

const PRODUCTS_DATA = {
  'cafe-altura': {
    title: 'Café de Altura Geisha & Típica',
    category: 'Café de Especialidad',
    image: 'assets/images/producto-cafe.jpg',
    origin: 'Inkawasi, La Convención, Cusco - Perú',
    altitude: '1,900 - 2,200 m.s.n.m.',
    varieties: 'Geisha & Típica',
    process: 'Lavado Artesanal (Agua de Manantial)',
    cupScore: '86+ Puntos SCAA',
    notes: 'Jazmín, bergamota, notas florales, durazno y miel de caña.',
    presentation: 'Grano Entero o Molido (250g, 500g, 1kg) en empaque trilaminado con válvula.',
    description: 'Cultivado en parcelas familiares de alta montaña bajo la sombra de flora nativa. Cada cereza es recolectada en su punto óptimo de madurez y fermentada cuidadosamente para resaltar la acidez brillante y el perfil aromático complejo distintivo de Inkawasi.',
    phone: '51914120519'
  },
  'cacao-chocolate': {
    title: 'Cacao Chuncho & Chocolate Artesanal',
    category: 'Cacao Fino de Aroma',
    image: 'assets/images/producto-cacao.jpg',
    origin: 'Valle de Inkawasi / La Convención, Cusco',
    altitude: '1,200 - 1,600 m.s.n.m.',
    varieties: 'Cacao Nativo Chuncho',
    process: 'Fermentación en Cajas de Madera y Secado Solar',
    cupScore: 'Cacao de Origen Selección Oro',
    notes: 'Frutos secos, ciruela pasa, notas florales y cacao tostado suave.',
    presentation: 'Tabletas de 70g y 100g (70% y 85% Cacao), Nibs de Cacao, Pasta Pura 100%.',
    description: 'El Cacao Chuncho es una variedad nativa milenaria reconocida mundialmente por su delicadeza, bajísima astringencia y riqueza en manteca natural. Elaborado artesanalmente sin aditivos químicos ni grasas añadidas.',
    phone: '51914120519'
  },
  'miel-abejas': {
    title: 'Miel de Abejas de Floración Andina',
    category: 'Miel 100% Pura & Cruda',
    image: 'assets/images/producto-miel.jpg',
    origin: 'Bosques y Quebradas de Inkawasi, Cusco',
    altitude: '1,800 - 2,400 m.s.n.m.',
    varieties: 'Apis mellifera en flora silvestre de montaña',
    process: 'Cosecha en Frío, Sin Pasteurizar ni Filtrar',
    cupScore: '100% Cruda y Orgánica',
    notes: 'Flores silvestres de altura, sutil toque a eucalipto y chilca.',
    presentation: 'Frascos de vidrio de 450g y 900g con precinto de garantía artesanal.',
    description: 'Obtenida en un entorno ecológico virgen de gran biodiversidad vegetal. Miel densa, aromática y cargada de enzimas naturales, polen y antioxidantes intactos.',
    phone: '51914120519'
  },
  'productos-naturales': {
    title: 'Infusiones & Productos Naturales del Valle',
    category: 'Biodiversidad Andina',
    image: 'assets/images/producto-naturales.jpg',
    origin: 'Inkawasi, Cusco - Perú',
    altitude: '2,000 - 2,500 m.s.n.m.',
    varieties: 'Muña Silvestre, Cedrón, Flor de Jamaica y Hierbas Nativas',
    process: 'Secado Deshidratado Solar Controlado',
    cupScore: 'Selección Botánica de Origen',
    notes: 'Aromas herbales intensos, digestivos y relajantes.',
    presentation: 'Tubos biodegradables de 50g y frascos de vidrio herméticos.',
    description: 'Línea botánica desarrollada a partir de plantas medicinales y aromáticas recolectadas éticamente por familias comuneras en las laderas de Inkawasi. Máxima pureza y bienestar natural.',
    phone: '51914120519'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initProductFilters();
  initProductModals();
});

/**
 * Filter product cards by category
 */
function initProductFilters() {
  const filterButtons = document.querySelectorAll('.products-filter-bar .filter-btn');
  const productCards = document.querySelectorAll('.products-grid .product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Open & render product technical sheet in modal
 */
function initProductModals() {
  const modal = document.getElementById('productDetailModal');
  const closeBtn = document.querySelector('.product-modal-close');
  const detailButtons = document.querySelectorAll('[data-product-modal-target]');

  if (!modal) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.getAttribute('data-product-modal-target');
      const product = PRODUCTS_DATA[productId];

      if (product) {
        document.getElementById('modalProductImg').src = product.image;
        document.getElementById('modalProductImg').alt = product.title;
        document.getElementById('modalProductCategory').textContent = product.category;
        document.getElementById('modalProductTitle').textContent = product.title;
        document.getElementById('modalProductOrigin').textContent = product.origin;
        document.getElementById('modalProductAltitude').textContent = product.altitude;
        document.getElementById('modalProductVariety').textContent = product.varieties;
        document.getElementById('modalProductProcess').textContent = product.process;
        document.getElementById('modalProductNotes').textContent = product.notes;
        document.getElementById('modalProductPresentation').textContent = product.presentation;
        document.getElementById('modalProductDesc').textContent = product.description;

        // WhatsApp Quote Link
        const message = encodeURIComponent(
          `¡Hola Yunka Ruru! Me gustaría solicitar información y cotización sobre su producto: *${product.title}* de Inkawasi, Cusco.`
        );
        const modalWhatsappBtn = document.getElementById('modalProductWhatsapp');
        if (modalWhatsappBtn) {
          modalWhatsappBtn.href = `https://wa.me/${product.phone}?text=${message}`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close handlers
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
