// ===== DATA PRODUK =====
const products = [
  {
    id: 1,
    name: "Glam Pink Nails",
    price: 75000,
    category: "Glamour",
    image: "images/nail-1.jpeg",
    images: ["images/nail-1.jpeg", "images/nail-2.jpeg", "images/nail-hero.jpeg"],
    description: "Set kuku palsu warna pink glamour dengan variasi glitter, cocok untuk tampilan elegan dan feminin. Mudah dipasang dan nyaman digunakan.",
    stock: "Tersedia"
  },
  {
    id: 2,
    name: "Modern Nude Set",
    price: 75000,
    category: "Elegan",
    image: "images/nail-2.jpeg",
    images: ["images/nail-2.jpeg", "images/nail-3.jpeg", "images/nail-4.jpeg"],
    description: "Set kuku palsu warna nude modern yang elegan. Cocok untuk berbagai kesempatan formal maupun kasual.",
    stock: "Tersedia"
  },
  {
    id: 3,
    name: "Sparkle Blue Nails",
    price: 75000,
    category: "Glamour",
    image: "images/nail-3.jpeg",
    images: ["images/nail-3.jpeg", "images/nail-4.jpeg", "images/nail-5.jpeg"],
    description: "Set kuku palsu biru berkilau dengan aksen sparkle yang memukau. Tampil beda dan percaya diri.",
    stock: "Tersedia"
  },
  {
    id: 4,
    name: "Classic French Tips",
    price: 75000,
    category: "Minimalis",
    image: "images/nail-4.jpeg",
    images: ["images/nail-4.jpeg", "images/nail-5.jpeg", "images/nail-6.jpeg"],
    description: "French tips klasik yang timeless. Cocok untuk tampilan profesional dan elegan sehari-hari.",
    stock: "Tersedia"
  },
  {
    id: 5,
    name: "Floral Art Nails",
    price: 75000,
    category: "Elegan",
    image: "images/nail-5.jpeg",
    images: ["images/nail-5.jpeg", "images/nail-6.jpeg", "images/nail-7.jpeg"],
    description: "Kuku palsu dengan motif bunga yang cantik dan detail. Sempurna untuk acara spesial.",
    stock: "Tersedia"
  },
  {
    id: 6,
    name: "Chic Black Nails",
    price: 75000,
    category: "Glamour",
    image: "images/nail-6.jpeg",
    images: ["images/nail-6.jpeg", "images/nail-7.jpeg", "images/nail-8.jpeg"],
    description: "Kuku palsu hitam chic yang bold dan stylish. Untuk tampilan yang berani dan modern.",
    stock: "Tersedia"
  },
  {
    id: 7,
    name: "Pastel Dream Set",
    price: 75000,
    category: "Minimalis",
    image: "images/nail-7.jpeg",
    images: ["images/nail-7.jpeg", "images/nail-8.jpeg", "images/nail-9.jpeg"],
    description: "Set kuku palsu pastel yang lembut dan dreamy. Cocok untuk tampilan cute dan feminin.",
    stock: "Tersedia"
  },
  {
    id: 8,
    name: "Rose Gold Glam",
    price: 75000,
    category: "Glamour",
    image: "images/nail-8.jpeg",
    images: ["images/nail-8.jpeg", "images/nail-9.jpeg", "images/nail-10.jpeg"],
    description: "Kuku palsu rose gold yang mewah dan glamour. Tampil memukau di setiap kesempatan.",
    stock: "Tersedia"
  },
  {
    id: 9,
    name: "Ombre Pink Set",
    price: 75000,
    category: "Elegan",
    image: "images/nail-9.jpeg",
    images: ["images/nail-9.jpeg", "images/nail-10.jpeg", "images/nail-11.jpeg"],
    description: "Set kuku palsu ombre pink yang gradasi indah. Tampilan modern dan trendi.",
    stock: "Tersedia"
  },
  {
    id: 10,
    name: "Crystal Clear Nails",
    price: 75000,
    category: "Minimalis",
    image: "images/nail-10.jpeg",
    images: ["images/nail-10.jpeg", "images/nail-11.jpeg", "images/nail-12.jpeg"],
    description: "Kuku palsu transparan dengan aksen kristal yang elegan. Minimalis namun tetap memukau.",
    stock: "Tersedia"
  },
  {
    id: 11,
    name: "Vintage Lace Nails",
    price: 75000,
    category: "Elegan",
    image: "images/nail-11.jpeg",
    images: ["images/nail-11.jpeg", "images/nail-12.jpeg", "images/nail-1.jpeg"],
    description: "Kuku palsu dengan motif renda vintage yang anggun. Sempurna untuk acara pernikahan.",
    stock: "Tersedia"
  },
  {
    id: 12,
    name: "Neon Pop Nails",
    price: 75000,
    category: "Glamour",
    image: "images/nail-12.jpeg",
    images: ["images/nail-12.jpeg", "images/nail-1.jpeg", "images/nail-2.jpeg"],
    description: "Kuku palsu neon yang cerah dan eye-catching. Untuk tampilan yang fun dan energik.",
    stock: "Tersedia"
  }
];

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('fnb_cart') || '[]');

function saveCart() {
  localStorage.setItem('fnb_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });
}

function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  saveCart();
  showToast(`${product.name} ditambahkan ke keranjang!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function formatPrice(price) {
  return 'Rp ' + price.toLocaleString('id-ID');
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== MODAL LOGIN =====
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('active');
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
}

// ===== NAVIGATE =====
function goTo(page, productId) {
  if (productId !== undefined) {
    localStorage.setItem('fnb_selected_product', productId);
  }
  window.location.href = page;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Close modal on overlay click
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLoginModal();
    });
  }
});
