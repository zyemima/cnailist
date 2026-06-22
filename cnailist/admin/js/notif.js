// ===== SISTEM NOTIFIKASI ADMIN =====
// Membaca dari localStorage (nanti diganti WebSocket/polling ke backend)

const _NOTIF_KEY      = 'cnailist_admin_notifs';
const _NOTIF_CHAT_KEY = 'cnailist_chats';
const _ORDERS_KEY     = 'cnailist_orders';
const _CUSTOM_KEY     = 'cnailist_custom_orders';
const _SEEN_CHAT_KEY  = 'cnailist_admin_seen_chats';
const _SEEN_ORDER_KEY = 'cnailist_admin_seen_orders';

// ===== AMBIL NOTIFIKASI =====
function getNotifications() {
  const notifs = [];

  // --- NOTIF CHAT BARU ---
  const chats    = JSON.parse(localStorage.getItem('cnailist_chats') || '{}');
  const seenChat = JSON.parse(localStorage.getItem('cnailist_admin_seen_chats') || '{}');

  Object.values(chats).forEach(session => {
    const unread = session.messages?.filter(m =>
      m.from === 'user' && !seenChat[m.id]
    ) || [];
    if (unread.length > 0) {
      const last = unread[unread.length - 1];
      notifs.push({
        id:      'chat_' + session.sessionId,
        type:    'chat',
        icon:    'fas fa-comment-dots',
        color:   '#e91e8c',
        bg:      '#fce4ec',
        title:   'Pesan baru dari ' + (session.name || 'Tamu'),
        body:    last.type === 'image' ? '📸 Mengirim foto' : last.text?.slice(0, 60) + (last.text?.length > 60 ? '...' : ''),
        time:    last.time,
        link:    'chat.html',
        count:   unread.length,
        rawIds:  unread.map(m => m.id),
      });
    }
  });

  // --- NOTIF PESANAN BARU ---
  const orders    = JSON.parse(localStorage.getItem('cnailist_orders') || '[]');
  const seenOrder = JSON.parse(localStorage.getItem('cnailist_admin_seen_orders') || '[]');

  orders.forEach(order => {
    if (!seenOrder.includes(order.id)) {
      notifs.push({
        id:    'order_' + order.id,
        type:  'order',
        icon:  'fas fa-shopping-bag',
        color: '#2196f3',
        bg:    '#e3f2fd',
        title: 'Pesanan baru masuk!',
        body:  order.name + ' · ' + formatNotifRp(order.total),
        time:  order.date,
        link:  'orders.html',
        count: 1,
        orderId: order.id,
      });
    }
  });

  // --- NOTIF CUSTOM ORDER BARU ---
  const customs = JSON.parse(localStorage.getItem('cnailist_custom_orders') || '[]');
  customs.forEach(co => {
    if (!seenOrder.includes(co.id)) {
      notifs.push({
        id:    'custom_' + co.id,
        type:  'custom',
        icon:  'fas fa-paint-brush',
        color: '#ff9800',
        bg:    '#fff3e0',
        title: 'Request Custom Order!',
        body:  co.name + ' · ' + co.budget,
        time:  co.date,
        link:  'orders.html',
        count: 1,
        orderId: co.id,
      });
    }
  });

  // Sort terbaru dulu
  notifs.sort((a, b) => new Date(b.time) - new Date(a.time));
  return notifs;
}

// ===== TANDAI SUDAH DIBACA =====
function markNotifRead(notif) {
  if (notif.type === 'chat') {
    const seen = JSON.parse(localStorage.getItem('cnailist_admin_seen_chats') || '{}');
    notif.rawIds?.forEach(id => { seen[id] = true; });
    localStorage.setItem('cnailist_admin_seen_chats', JSON.stringify(seen));
  } else {
    const seen = JSON.parse(localStorage.getItem('cnailist_admin_seen_orders') || '[]');
    if (!seen.includes(notif.orderId)) seen.push(notif.orderId);
    localStorage.setItem('cnailist_admin_seen_orders', JSON.stringify(seen));
  }
}

function markAllRead() {
  const notifs = getNotifications();
  notifs.forEach(markNotifRead);
  renderNotifDropdown();
  updateNotifBadge();
}

// ===== FORMAT =====
function formatNotifRp(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function formatNotifTime(iso) {
  if (!iso) return '';
  const d    = new Date(iso);
  const now  = new Date();
  const diff = now - d;
  if (diff < 60000)      return 'Baru saja';
  if (diff < 3600000)    return Math.floor(diff / 60000) + ' mnt lalu';
  if (diff < 86400000)   return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
}

// ===== UPDATE BADGE =====
function updateNotifBadge() {
  const count = getNotifications().length;
  const badge = document.getElementById('notifBadge');
  if (!badge) return;
  badge.textContent    = count > 9 ? '9+' : count;
  badge.style.display  = count > 0 ? 'flex' : 'none';
}

// ===== RENDER DROPDOWN =====
function renderNotifDropdown() {
  const panel  = document.getElementById('notifPanel');
  if (!panel) return;
  const notifs = getNotifications();

  if (notifs.length === 0) {
    panel.querySelector('#notifList').innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:#bbb">
        <i class="fas fa-bell-slash" style="font-size:2rem;margin-bottom:10px;display:block"></i>
        <p style="font-size:0.85rem">Tidak ada notifikasi baru</p>
      </div>
    `;
    return;
  }

  panel.querySelector('#notifList').innerHTML = notifs.map(n => `
    <div class="notif-item" onclick="handleNotifClick('${n.id}')" style="cursor:pointer">
      <div class="notif-icon-wrap" style="background:${n.bg}">
        <i class="${n.icon}" style="color:${n.color}"></i>
      </div>
      <div class="notif-content">
        <p class="notif-title">${n.title}${n.count > 1 ? ` <span class="notif-count">${n.count}</span>` : ''}</p>
        <p class="notif-body">${n.body}</p>
        <p class="notif-time">${formatNotifTime(n.time)}</p>
      </div>
      <div class="notif-dot"></div>
    </div>
  `).join('');
}

// ===== KLIK NOTIF =====
function handleNotifClick(notifId) {
  const notifs = getNotifications();
  const notif  = notifs.find(n => n.id === notifId);
  if (!notif) return;
  markNotifRead(notif);
  updateNotifBadge();
  closeNotifPanel();
  window.location.href = notif.link;
}

// ===== TOGGLE PANEL =====
function toggleNotifPanel() {
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  if (isOpen) {
    closeNotifPanel();
  } else {
    renderNotifDropdown();
    panel.style.display = 'block';
    // Tutup kalau klik di luar
    setTimeout(() => {
      document.addEventListener('click', outsideNotifClick);
    }, 10);
  }
}

function closeNotifPanel() {
  const panel = document.getElementById('notifPanel');
  if (panel) panel.style.display = 'none';
  document.removeEventListener('click', outsideNotifClick);
}

function outsideNotifClick(e) {
  const panel  = document.getElementById('notifPanel');
  const btn    = document.getElementById('notifBtn');
  if (panel && !panel.contains(e.target) && !btn?.contains(e.target)) {
    closeNotifPanel();
  }
}

// ===== INJECT NOTIF BUTTON KE TOPBAR =====
function initNotifSystem() {
  // Cari tombol bell yang sudah ada dan replace
  const existingBtns = document.querySelectorAll('.topbar-icon-btn');
  let bellBtn = null;
  existingBtns.forEach(btn => {
    if (btn.querySelector('.fa-bell') || btn.querySelector('.topbar-notif-badge')) {
      bellBtn = btn;
    }
  });

  const notifHTML = `
    <div style="position:relative;display:inline-block">
      <button id="notifBtn" class="topbar-icon-btn" onclick="toggleNotifPanel()" title="Notifikasi">
        <i class="fas fa-bell"></i>
        <span id="notifBadge" style="
          display:none;
          position:absolute;top:-4px;right:-4px;
          background:#e91e8c;color:#fff;
          font-size:0.6rem;font-weight:800;
          min-width:16px;height:16px;
          border-radius:8px;padding:0 3px;
          align-items:center;justify-content:center;
          border:2px solid #fff;
          line-height:1;
        ">0</span>
      </button>

      <!-- DROPDOWN PANEL -->
      <div id="notifPanel" style="
        display:none;
        position:absolute;top:calc(100% + 10px);right:0;
        width:340px;
        background:#fff;
        border-radius:16px;
        box-shadow:0 8px 40px rgba(0,0,0,0.14);
        border:1px solid #f0d0dc;
        z-index:9999;
        overflow:hidden;
      ">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #f5f5f5;">
          <h4 style="font-size:0.92rem;font-weight:700">Notifikasi</h4>
          <button onclick="markAllRead()" style="background:none;border:none;font-size:0.78rem;color:#e91e8c;font-weight:600;cursor:pointer;font-family:inherit">
            Tandai semua dibaca
          </button>
        </div>
        <!-- List -->
        <div id="notifList" style="max-height:380px;overflow-y:auto"></div>
        <!-- Footer -->
        <div style="padding:10px 18px;border-top:1px solid #f5f5f5;text-align:center">
          <a href="orders.html" style="font-size:0.8rem;color:#e91e8c;font-weight:600;text-decoration:none">
            Lihat semua pesanan →
          </a>
        </div>
      </div>
    </div>
  `;

  if (bellBtn) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = notifHTML;
    bellBtn.replaceWith(wrapper.firstElementChild);
  } else {
    // Fallback: append ke topbar-right
    const topbarRight = document.querySelector('.topbar-right');
    if (topbarRight) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = notifHTML;
      topbarRight.appendChild(wrapper.firstElementChild);
    }
  }

  updateNotifBadge();

  // Auto refresh setiap 5 detik
  setInterval(() => {
    updateNotifBadge();
    const panel = document.getElementById('notifPanel');
    if (panel && panel.style.display !== 'none') renderNotifDropdown();
  }, 5000);
}

// ===== CSS NOTIF =====
function injectNotifCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .notif-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 13px 18px;
      border-bottom: 1px solid #f9f9f9;
      transition: background 0.15s;
      position: relative;
    }
    .notif-item:hover { background: #fdf0f5; }
    .notif-item:last-child { border-bottom: none; }

    .notif-icon-wrap {
      width: 38px; height: 38px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.95rem;
      flex-shrink: 0;
    }

    .notif-content { flex: 1; min-width: 0; }

    .notif-title {
      font-size: 0.83rem;
      font-weight: 700;
      color: #222;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .notif-count {
      background: #e91e8c;
      color: #fff;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 10px;
    }

    .notif-body {
      font-size: 0.78rem;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 3px;
    }

    .notif-time {
      font-size: 0.7rem;
      color: #bbb;
    }

    .notif-dot {
      width: 8px; height: 8px;
      background: #e91e8c;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 5px;
    }

    /* Animasi masuk panel */
    #notifPanel {
      animation: notifSlideIn 0.2s ease;
    }

    @keyframes notifSlideIn {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  injectNotifCSS();
  initNotifSystem();
});
