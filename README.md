# 💅 Cnailist — Toko Kuku Palsu Online

> Full-stack e-commerce untuk penjualan kuku palsu dengan fitur custom order, live chat, dan dashboard admin.

![Tech Stack](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange) ![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green) ![Database](https://img.shields.io/badge/Database-MySQL-blue)

---

## 🗂️ Struktur Proyek

```
Cnailist/
├── cnailist/               # Frontend (HTML/CSS/JS)
│   ├── index.html          # Halaman utama
│   ├── collection.html     # Koleksi produk
│   ├── detail.html         # Detail produk
│   ├── cart.html           # Keranjang & checkout
│   ├── custom.html         # Custom order
│   ├── css/style.css       # Stylesheet utama
│   ├── js/app.js           # Logika frontend
│   ├── js/chat.js          # Widget live chat
│   ├── images/             # Aset gambar produk
│   └── admin/              # Panel admin
│       ├── index.html      # Dashboard
│       ├── products.html   # Manajemen produk
│       ├── orders.html     # Manajemen pesanan
│       ├── customers.html  # Manajemen pelanggan
│       ├── chat.html       # Live chat admin
│       └── login.html      # Login admin
└── cnailist-backend/       # Backend (Node.js + Express)
    ├── src/
    │   ├── app.js          # Entry point Express
    │   └── routes/         # Route handlers
    │       ├── auth.js
    │       ├── products.js
    │       ├── orders.js
    │       ├── customOrders.js
    │       ├── chat.js
    │       └── customers.js
    ├── uploads/            # File upload (gambar produk, bukti bayar)
    ├── .env                # Konfigurasi environment
    └── package.json
```

---

## 🚀 Cara Setup & Menjalankan

### Prasyarat

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) / XAMPP
- Browser modern
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (VSCode) atau servis HTTP statis

---

### 1. Clone Repositori

```bash
git clone https://github.com/<username>/cnailist.git
cd cnailist
```

### 2. Setup Database

Buka MySQL dan jalankan file SQL:

```bash
mysql -u root -p < cnailist-backend/database.sql
```

Atau buka file `database.sql` via phpMyAdmin dan import secara manual.

### 3. Setup Backend

```bash
cd cnailist-backend
npm install
```

Salin dan edit file environment:

```bash
cp .env.example .env
```

Edit `.env` sesuai konfigurasi lokal kamu:

```env
# Server
PORT=5001

# Database MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=      # isi password MySQL kamu
DB_NAME=cnailist_db

# JWT
JWT_SECRET=ganti_dengan_secret_key_yang_kuat
JWT_EXPIRES_IN=7d

# Upload
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880
```

Jalankan server:

```bash
npm run dev     # development — auto-restart dengan nodemon
npm start       # production
```

Server berjalan di: `http://localhost:5001`  
Health check: `http://localhost:5001/api/health`

### 4. Jalankan Frontend

Buka folder `cnailist/` dengan **Live Server** (VSCode) atau HTTP server lain:

```bash
# Contoh dengan Python
cd cnailist
python3 -m http.server 5500
```

Akses di: `http://localhost:5500`

---

## 🔑 Akun Default Admin

| Field    | Value               |
|----------|---------------------|
| Email    | `admin@cnailist.id` |
| Password | `admin123`          |

> ⚠️ Ganti password setelah pertama login di production!

---

## 📡 API Endpoints

Base URL: `http://localhost:5001/api`

### 🔐 Auth

| Method | Endpoint                   | Akses  | Keterangan          |
|--------|----------------------------|--------|---------------------|
| POST   | `/auth/login`              | Publik | Login admin         |
| GET    | `/auth/me`                 | Admin  | Info admin login    |
| PUT    | `/auth/change-password`    | Admin  | Ganti password      |

### 📦 Produk

| Method | Endpoint           | Akses  | Keterangan                                          |
|--------|--------------------|--------|-----------------------------------------------------|
| GET    | `/products`        | Publik | Semua produk (query: `category`, `status`, `search`, `sort`) |
| GET    | `/products/:id`    | Publik | Detail produk                                       |
| POST   | `/products`        | Admin  | Tambah produk (`multipart/form-data` + image)       |
| PUT    | `/products/:id`    | Admin  | Edit produk                                         |
| DELETE | `/products/:id`    | Admin  | Hapus produk                                        |

### 🛒 Pesanan

| Method | Endpoint                 | Akses  | Keterangan                              |
|--------|--------------------------|--------|-----------------------------------------|
| GET    | `/orders/stats`          | Admin  | Statistik dashboard                     |
| GET    | `/orders`                | Admin  | Semua pesanan                           |
| GET    | `/orders/:id`            | Admin  | Detail pesanan                          |
| POST   | `/orders`                | Publik | Buat pesanan baru (+ bukti pembayaran)  |
| PUT    | `/orders/:id/status`     | Admin  | Update status pesanan                   |
| DELETE | `/orders/:id`            | Admin  | Hapus pesanan                           |

### 🎨 Custom Order

| Method | Endpoint                       | Akses  | Keterangan                  |
|--------|--------------------------------|--------|-----------------------------|
| GET    | `/custom-orders`               | Admin  | Semua custom order          |
| GET    | `/custom-orders/:id`           | Admin  | Detail custom order         |
| POST   | `/custom-orders`               | Publik | Kirim request custom        |
| PUT    | `/custom-orders/:id/status`    | Admin  | Update status               |
| DELETE | `/custom-orders/:id`           | Admin  | Hapus                       |

### 💬 Chat

| Method | Endpoint                        | Akses  | Keterangan                  |
|--------|---------------------------------|--------|-----------------------------||
| GET    | `/chat/sessions`                | Admin  | Semua sesi chat             |
| GET    | `/chat/unread-count`            | Admin  | Jumlah pesan belum dibaca   |
| GET    | `/chat/:sessionId`              | Publik | Pesan dalam satu sesi       |
| POST   | `/chat`                         | Publik | Kirim pesan/foto            |
| POST   | `/chat/:sessionId/reply`        | Admin  | Balas pesan                 |
| PUT    | `/chat/:sessionId/read`         | Admin  | Tandai sudah dibaca         |
| DELETE | `/chat/:sessionId`              | Admin  | Hapus sesi                  |

### 👤 Pelanggan

| Method | Endpoint                    | Akses  | Keterangan                     |
|--------|-----------------------------|--------|--------------------------------|
| GET    | `/customers`                | Admin  | Semua pelanggan                |
| GET    | `/customers/:id`            | Admin  | Detail + riwayat pesanan       |
| POST   | `/customers/register`       | Publik | Daftar akun                    |
| PUT    | `/customers/:id/status`     | Admin  | Aktif/nonaktif pelanggan       |
| DELETE | `/customers/:id`            | Admin  | Hapus pelanggan                |

### Autentikasi Admin

Semua endpoint bertanda **Admin** memerlukan header:

```http
Authorization: Bearer <token>
```

Token diperoleh dari `POST /api/auth/login`.

---

## 🛠️ Tech Stack

| Layer    | Teknologi                              |
|----------|----------------------------------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript        |
| Backend  | Node.js, Express.js                    |
| Database | MySQL 8                                |
| Auth     | JWT (jsonwebtoken), bcryptjs           |
| Upload   | Multer                                 |
| Dev Tool | Nodemon                                |

---

## 📁 Environment Variables

| Key              | Deskripsi                          | Default              |
|------------------|------------------------------------|----------------------|
| `PORT`           | Port server                        | `5001`               |
| `DB_HOST`        | Host database MySQL                | `localhost`          |
| `DB_PORT`        | Port database                      | `3306`               |
| `DB_USER`        | Username MySQL                     | `root`               |
| `DB_PASSWORD`    | Password MySQL                     | *(kosong)*           |
| `DB_NAME`        | Nama database                      | `cnailist_db`        |
| `JWT_SECRET`     | Secret key JWT                     | *(wajib diisi)*      |
| `JWT_EXPIRES_IN` | Masa berlaku token                 | `7d`                 |
| `UPLOAD_PATH`    | Folder penyimpanan upload          | `uploads`            |
| `MAX_FILE_SIZE`  | Ukuran file maksimum (bytes)       | `5242880` (5MB)      |

---

## 🤝 Kontribusi

1. Fork repositori ini
2. Buat branch fitur: `git checkout -b fitur/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buat Pull Request

---

## 📄 Lisensi

MIT License — bebas digunakan untuk keperluan belajar dan pengembangan.
