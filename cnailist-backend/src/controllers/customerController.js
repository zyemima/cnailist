const db     = require('../config/database');
const bcrypt = require('bcryptjs');

// GET /api/customers  — admin only
async function getAll(req, res) {
  const { status, search } = req.query;
  let sql    = 'SELECT id, name, email, phone, address, status, created_at FROM customers WHERE 1=1';
  const params = [];

  if (status) { sql += ' AND status = ?';                          params.push(status); }
  if (search) { sql += ' AND (name LIKE ? OR email LIKE ?)';       params.push(`%${search}%`, `%${search}%`); }
  sql += ' ORDER BY created_at DESC';

  try {
    const [customers] = await db.query(sql, params);

    // Hitung total pesanan tiap customer
    for (const c of customers) {
      const [[{ orders, total_spent }]] = await db.query(
        "SELECT COUNT(*) as orders, COALESCE(SUM(total),0) as total_spent FROM orders WHERE customer_phone = ? AND status != 'Dibatalkan'",
        [c.phone]
      );
      c.orders      = orders;
      c.total_spent = total_spent;
    }

    res.json({ success: true, data: customers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// GET /api/customers/:id  — admin only
async function getOne(req, res) {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, address, status, created_at FROM customers WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Pelanggan tidak ditemukan' });

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE customer_phone = ? ORDER BY created_at DESC',
      [rows[0].phone]
    );
    rows[0].orders = orders;
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// POST /api/customers/register  — publik
async function register(req, res) {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'Nama, email, dan password wajib diisi' });

  try {
    const [existing] = await db.query('SELECT id FROM customers WHERE email = ?', [email]);
    if (existing.length > 0)
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar' });

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO customers (name, email, password, phone) VALUES (?,?,?,?)',
      [name, email, hashed, phone || null]
    );
    res.status(201).json({ success: true, message: 'Registrasi berhasil', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// PUT /api/customers/:id/status  — admin only
async function updateStatus(req, res) {
  const { status } = req.body;
  if (!['Aktif','Nonaktif'].includes(status))
    return res.status(400).json({ success: false, message: 'Status tidak valid' });

  try {
    await db.query('UPDATE customers SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: 'Status pelanggan diperbarui' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// DELETE /api/customers/:id  — admin only
async function remove(req, res) {
  try {
    await db.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Pelanggan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getAll, getOne, register, updateStatus, remove };
