# 💅 Panduan Pengguna — Cnailist

> Panduan lengkap cara menggunakan website Cnailist untuk berbelanja kuku palsu.

---

## 🌐 Mengakses Website

Buka browser dan kunjungi: **http://localhost:5500** (atau URL yang diberikan)

---

## 🛍️ Untuk Pembeli

### 1. Melihat Koleksi Produk

1. Di halaman utama, klik tombol **"Lihat Koleksi"** atau menu **Collection**.
2. Kamu bisa memfilter produk berdasarkan kategori:
   - **Semua** — tampilkan semua produk
   - **Glamour** — kuku berkilau dan bold
   - **Elegan** — tampilan formal dan anggun
   - **Minimalis** — desain simpel dan bersih
3. Klik gambar atau nama produk untuk melihat **detail produk**.

---

### 2. Memesan Produk

1. Buka halaman detail produk yang ingin dibeli.
2. Pilih **jumlah** yang diinginkan.
3. Klik tombol **"Tambah ke Keranjang"**.
4. Buka halaman **Cart** (ikon keranjang di pojok kanan atas).
5. Periksa pesananmu, lalu klik **"Checkout"**.
6. Isi formulir:
   - Nama lengkap
   - Nomor WhatsApp
   - Alamat pengiriman
   - Metode pembayaran (Transfer Bank)
7. Upload **bukti pembayaran** setelah transfer.
8. Klik **"Kirim Pesanan"** — kamu akan mendapat nomor pesanan.

> 💡 Simpan nomor pesanan kamu untuk melacak status pengiriman!

---

### 3. Custom Order (Pesanan Kustom)

Ingin desain kuku yang unik dan personal? Gunakan fitur **Custom Order**!

1. Klik menu **Custom** di navigasi atas.
2. Isi formulir:
   - Nama & nomor WhatsApp
   - Deskripsi desain yang diinginkan (warna, motif, panjang, dll.)
   - Upload foto referensi desain (opsional, bisa lebih dari 1 foto)
3. Klik **"Kirim Request"**.
4. Admin akan menghubungi kamu via WhatsApp untuk diskusi harga dan detail.

---

### 4. Live Chat dengan Admin

Punya pertanyaan? Chat langsung dengan admin!

1. Klik ikon **chat** (💬) di pojok kanan bawah layar.
2. Ketik pesanmu dan tekan **Enter** atau klik tombol kirim.
3. Kamu juga bisa mengirim **foto** dengan klik ikon 📎.
4. Admin akan membalas pesanmu — akan muncul notifikasi jika ada balasan.

> ⏰ Admin biasanya membalas di jam operasional: **Senin–Sabtu, 08.00–21.00 WIB**

---

### 5. Status Pesanan

Berikut arti status pesanan yang mungkin kamu terima:

| Status       | Arti                                              |
|--------------|---------------------------------------------------|
| **Pending**  | Pesanan diterima, menunggu konfirmasi pembayaran  |
| **Diproses** | Pembayaran dikonfirmasi, pesanan sedang disiapkan |
| **Dikirim**  | Paket sudah dikirim, tunggu di rumah!             |
| **Selesai**  | Pesanan telah diterima                            |
| **Dibatalkan** | Pesanan dibatalkan                              |

---

## 🔐 Untuk Admin

### Mengakses Panel Admin

1. Buka: **http://localhost:5500/admin/login.html**
2. Login dengan:
   - **Email:** `admin@cnailist.id`
   - **Password:** `admin123`
3. Klik **"Login"** — kamu akan diarahkan ke dashboard.

> ⚠️ Jaga kerahasiaan akun admin. Jangan bagikan ke siapapun!

---

### Dashboard Admin

Setelah login, kamu akan melihat ringkasan:
- 📦 Total pesanan hari ini
- 💰 Total pendapatan
- 👤 Jumlah pelanggan aktif
- 💬 Pesan chat yang belum dibaca

---

### Manajemen Produk

1. Klik menu **Produk** di sidebar.
2. **Tambah Produk Baru:**
   - Klik tombol **"+ Tambah Produk"**
   - Isi nama, harga, kategori, stok, dan deskripsi
   - Upload foto produk
   - Klik **"Simpan"**
3. **Edit Produk:** Klik ikon ✏️ pada baris produk yang ingin diubah.
4. **Hapus Produk:** Klik ikon 🗑️ → konfirmasi penghapusan.
5. Ubah **status produk** (Aktif/Nonaktif) langsung dari tabel.

---

### Manajemen Pesanan

1. Klik menu **Pesanan** di sidebar.
2. Lihat daftar semua pesanan masuk.
3. Klik **detail** pesanan untuk melihat info lengkap (nama, alamat, bukti bayar).
4. **Update Status Pesanan:**
   - Pilih status baru dari dropdown
   - Klik **"Update"**
5. Hapus pesanan yang tidak diperlukan dengan ikon 🗑️.

---

### Manajemen Pelanggan

1. Klik menu **Pelanggan** di sidebar.
2. Lihat daftar semua pelanggan terdaftar.
3. Klik nama pelanggan untuk melihat **riwayat pesanan** mereka.
4. Nonaktifkan akun pelanggan bermasalah dengan toggle status.

---

### Live Chat Admin

1. Klik menu **Chat** di sidebar.
2. Pilih sesi chat dari daftar di sebelah kiri.
3. Ketik balasan dan tekan **Enter** atau klik **Kirim**.
4. Kamu juga bisa mengirim foto sebagai balasan.
5. Klik **"Tandai Dibaca"** setelah membalas semua pesan.
6. Hapus sesi chat yang sudah selesai dengan ikon 🗑️.

> 🔔 Jumlah pesan belum dibaca tampil di ikon chat pada sidebar.

---

## ❓ Pertanyaan Umum (FAQ)

**Q: Berapa lama pengiriman?**  
A: Estimasi 2–5 hari kerja tergantung lokasi pengiriman.

**Q: Metode pembayaran apa saja yang tersedia?**  
A: Saat ini tersedia Transfer Bank. Detail rekening akan ditampilkan saat checkout.

**Q: Apakah bisa retur/tukar produk?**  
A: Hubungi admin via Live Chat dalam 2×24 jam setelah produk diterima jika ada masalah.

**Q: Berapa biaya custom order?**  
A: Harga custom order bervariasi tergantung desain. Admin akan menginformasikan harga setelah kamu mengirim request.

**Q: Lupa password admin?**  
A: Reset langsung di database MySQL atau hubungi developer.

---

## 📞 Kontak & Bantuan

Jika mengalami kendala teknis, hubungi developer melalui Live Chat atau buat issue di repositori GitHub.
