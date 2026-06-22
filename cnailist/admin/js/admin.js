// ===== SHARED DATA (simulasi, nanti connect ke backend) =====

const adminProducts = [
  { id: 1, name: "Glam Pink Nails",     price: 75000, category: "Glamour",   stock: 42, status: "Aktif",    image: "../images/nail-1.jpeg" },
  { id: 2, name: "Modern Nude Set",     price: 75000, category: "Elegan",    stock: 28, status: "Aktif",    image: "../images/nail-2.jpeg" },
  { id: 3, name: "Sparkle Blue Nails",  price: 75000, category: "Glamour",   stock: 15, status: "Aktif",    image: "../images/nail-3.jpeg" },
  { id: 4, name: "Classic French Tips", price: 75000, category: "Minimalis", stock: 0,  status: "Habis",    image: "../images/nail-4.jpeg" },
  { id: 5, name: "Floral Art Nails",    price: 75000, category: "Elegan",    stock: 33, status: "Aktif",    image: "../images/nail-5.jpeg" },
  { id: 6, name: "Chic Black Nails",    price: 75000, category: "Glamour",   stock: 7,  status: "Aktif",    image: "../images/nail-6.jpeg" },
  { id: 7, name: "Pastel Dream Set",    price: 75000, category: "Minimalis", stock: 20, status: "Aktif",    image: "../images/nail-7.jpeg" },
  { id: 8, name: "Rose Gold Glam",      price: 75000, category: "Glamour",   stock: 0,  status: "Nonaktif", image: "../images/nail-8.jpeg" },
  { id: 9, name: "Ombre Pink Set",      price: 75000, category: "Elegan",    stock: 18, status: "Aktif",    image: "../images/nail-9.jpeg" },
  { id: 10, name: "Crystal Clear Nails",price: 75000, category: "Minimalis", stock: 25, status: "Aktif",    image: "../images/nail-10.jpeg" },
  { id: 11, name: "Vintage Lace Nails", price: 75000, category: "Elegan",    stock: 11, status: "Aktif",    image: "../images/nail-11.jpeg" },
  { id: 12, name: "Neon Pop Nails",     price: 75000, category: "Glamour",   stock: 5,  status: "Aktif",    image: "../images/nail-12.jpeg" },
];

const adminOrders = [
  { id: "ORD-001", customer: "Siti Rahayu",    product: "Glam Pink Nails",     qty: 2, total: 150000, status: "Selesai",   date: "2026-05-13", phone: "081234567890", address: "Jl. Mawar No.5, Jakarta" },
  { id: "ORD-002", customer: "Dewi Lestari",   product: "Modern Nude Set",     qty: 1, total: 75000,  status: "Diproses",  date: "2026-05-13", phone: "082345678901", address: "Jl. Melati No.12, Bandung" },
  { id: "ORD-003", customer: "Rina Susanti",   product: "Sparkle Blue Nails",  qty: 3, total: 225000, status: "Dikirim",   date: "2026-05-12", phone: "083456789012", address: "Jl. Anggrek No.3, Surabaya" },
  { id: "ORD-004", customer: "Maya Putri",     product: "Classic French Tips", qty: 1, total: 75000,  status: "Pending",   date: "2026-05-12", phone: "084567890123", address: "Jl. Dahlia No.8, Yogyakarta" },
  { id: "ORD-005", customer: "Ayu Wulandari",  product: "Floral Art Nails",    qty: 2, total: 150000, status: "Selesai",   date: "2026-05-11", phone: "085678901234", address: "Jl. Kenanga No.15, Semarang" },
  { id: "ORD-006", customer: "Fitri Handayani",product: "Chic Black Nails",    qty: 1, total: 75000,  status: "Dibatalkan",date: "2026-05-11", phone: "086789012345", address: "Jl. Tulip No.2, Medan" },
  { id: "ORD-007", customer: "Nadia Permata",  product: "Rose Gold Glam",      qty: 2, total: 150000, status: "Selesai",   date: "2026-05-10", phone: "087890123456", address: "Jl. Cempaka No.7, Makassar" },
  { id: "ORD-008", customer: "Lina Marlina",   product: "Ombre Pink Set",      qty: 1, total: 75000,  status: "Diproses",  date: "2026-05-10", phone: "088901234567", address: "Jl. Seruni No.9, Palembang" },
];

const adminCustomers = [
  { id: 1, name: "Siti Rahayu",     email: "siti@email.com",   phone: "081234567890", orders: 5, total: 375000, joined: "2026-01-15", status: "Aktif" },
  { id: 2, name: "Dewi Lestari",    email: "dewi@email.com",   phone: "082345678901", orders: 3, total: 225000, joined: "2026-02-20", status: "Aktif" },
  { id: 3, name: "Rina Susanti",    email: "rina@email.com",   phone: "083456789012", orders: 7, total: 525000, joined: "2026-01-05", status: "Aktif" },
  { id: 4, name: "Maya Putri",      email: "maya@email.com",   phone: "084567890123", orders: 1, total: 75000,  joined: "2026-05-01", status: "Aktif" },
  { id: 5, name: "Ayu Wulandari",   email: "ayu@email.com",    phone: "085678901234", orders: 4, total: 300000, joined: "2026-03-10", status: "Aktif" },
  { id: 6, name: "Fitri Handayani", email: "fitri@email.com",  phone: "086789012345", orders: 2, total: 150000, joined: "2026-04-08", status: "Nonaktif" },
];

// ===== UTILS =====
function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function formatDate(d) {
  const date = new Date(d);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function showToast(msg, type = 'pink') {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast toast-${type} show`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'bell'}"></i> ${msg}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function openModal(id) {
  document.getElementById(id)?.classList.add('active');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const main = document.getElementById('mainContent');
  sidebar.classList.toggle('collapsed');
  main.classList.toggle('expanded');
}

// ===== STATUS BADGE =====
function statusBadge(status) {
  const map = {
    'Aktif':      'badge-success',
    'Nonaktif':   'badge-gray',
    'Habis':      'badge-danger',
    'Selesai':    'badge-success',
    'Dikirim':    'badge-info',
    'Diproses':   'badge-warning',
    'Pending':    'badge-pink',
    'Dibatalkan': 'badge-danger',
  };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

// ===== CONFIRM DELETE =====
function confirmDelete(msg, onConfirm) {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;
  document.getElementById('confirmMsg').textContent = msg;
  document.getElementById('confirmOkBtn').onclick = () => {
    onConfirm();
    closeModal('confirmModal');
  };
  openModal('confirmModal');
}


// ===== SEED DATA DEMO UNTUK NOTIFIKASI =====
// Jalankan sekali untuk isi localStorage dengan data demo
(function seedDemoNotifs() {
  // Hanya seed kalau belum ada data
  const existingOrders = JSON.parse(localStorage.getItem('cnailist_orders') || '[]');
  if (existingOrders.length === 0) {
    const demoOrders = [
      {
        id: 'ORD-001',
        name: 'Siti Rahayu',
        address: 'Jl. Mawar No.5, Jakarta',
        phone: '081234567890',
        method: 'seabank',
        items: [{ name: 'Glam Pink Nails', qty: 2, price: 75000 }],
        subtotal: 150000,
        shipping: 15000,
        total: 165000,
        status: 'Pending',
        date: new Date(Date.now() - 5 * 60000).toISOString() // 5 menit lalu
      },
      {
        id: 'ORD-002',
        name: 'Dewi Lestari',
        address: 'Jl. Melati No.12, Bandung',
        phone: '082345678901',
        method: 'gopay',
        items: [{ name: 'Sparkle Blue Nails', qty: 1, price: 75000 }],
        subtotal: 75000,
        shipping: 15000,
        total: 90000,
        status: 'Pending',
        date: new Date(Date.now() - 12 * 60000).toISOString() // 12 menit lalu
      }
    ];
    localStorage.setItem('cnailist_orders', JSON.stringify(demoOrders));
  }
})();
