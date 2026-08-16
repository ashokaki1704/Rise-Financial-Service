/**
 * Rise Financial Services - Backend Server (Node.js / Express)
 * --------------------------------------------------------------
 * - Serves the built React frontend (client/dist) as static files.
 * - Accepts loan application form submissions at POST /api/apply
 * - Stores every submission as a row in SQLite (see db.js).
 * - Exposes:
 *     GET  /api/health         -> verifies the database connection is alive
 *     GET  /api/submissions    -> view all submissions as JSON
 *     GET  /api/export-excel   -> generate & download Applications.xlsx
 *     POST /api/apply          -> save a new loan application (used by the form)
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8000;

const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');
const DATA_DIR = path.join(__dirname, 'data');
const EXCEL_EXPORT_PATH = path.join(DATA_DIR, 'Rise_Financial_Services_Applications.xlsx');

fs.mkdirSync(DATA_DIR, { recursive: true });

app.use(cors());
app.use(express.json());

const MOBILE_PATTERN = /^[0-9+\-\s]{10,15}$/;

// ---------------------------------------------------------------------------
// Connect to the database and verify it on startup (fails loudly if not)
// ---------------------------------------------------------------------------
db.initDb();
db.checkConnection();

// ---------------------------------------------------------------------------
// API: Health check -- confirms the backend can actually reach the database
// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  try {
    db.checkConnection();
    res.json({ success: true, database: db.DB_ENGINE, status: 'connected' });
  } catch (err) {
    res.status(500).json({
      success: false,
      database: db.DB_ENGINE,
      status: 'error',
      message: err.message,
    });
  }
});

// ---------------------------------------------------------------------------
// API: Submit loan application -> INSERT INTO SQLite
// ---------------------------------------------------------------------------
app.post('/api/apply', (req, res) => {
  const payload = req.body || {};

  const name = (payload.name || '').trim();
  const mobile = (payload.mobile || '').trim();
  const email = (payload.email || '').trim();
  const city = (payload.city || '').trim();
  const loan = (payload.loan || '').trim();
  const callTime = (payload.time || '').trim();
  const details = (payload.details || '').trim();

  if (!name || !mobile || !loan) {
    return res.status(400).json({
      success: false,
      message: 'Full Name, Mobile Number, and Required Loan are mandatory.',
    });
  }

  if (!MOBILE_PATTERN.test(mobile)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid mobile number.',
    });
  }

  const submittedAt = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).replace(',', '');

  try {
    const conn = db.getConnection();
    conn.prepare(
      `INSERT INTO applications
        (submitted_at, name, mobile, email, city, loan, call_time, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(submittedAt, name, mobile, email, city, loan, callTime, details);
  } catch (err) {
    console.error('Failed to save application:', err);
    return res.status(500).json({ success: false, message: 'Server error while saving application.' });
  }

  res.json({ success: true, message: 'Application saved successfully.' });
});

// ---------------------------------------------------------------------------
// API: View all submissions as JSON (reads straight from SQLite)
// ---------------------------------------------------------------------------
app.get('/api/submissions', (req, res) => {
  const conn = db.getConnection();
  const rows = conn.prepare('SELECT * FROM applications ORDER BY id ASC').all();
  res.json({ success: true, count: rows.length, submissions: rows });
});

// ---------------------------------------------------------------------------
// API: Export all submissions to an Excel file, then download it
// ---------------------------------------------------------------------------
app.get('/api/export-excel', async (req, res) => {
  const conn = db.getConnection();
  const rows = conn.prepare('SELECT * FROM applications ORDER BY id ASC').all();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Applications');

  sheet.columns = [
    { header: 'S.No', key: 'sno', width: 8 },
    { header: 'Date & Time', key: 'submitted_at', width: 20 },
    { header: 'Full Name', key: 'name', width: 24 },
    { header: 'Mobile Number', key: 'mobile', width: 18 },
    { header: 'Email ID', key: 'email', width: 26 },
    { header: 'City', key: 'city', width: 18 },
    { header: 'Required Loan', key: 'loan', width: 20 },
    { header: 'Preferred Call Time', key: 'call_time', width: 20 },
    { header: 'Additional Details', key: 'details', width: 40 },
  ];

  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  rows.forEach((row, i) => {
    sheet.addRow({
      sno: i + 1,
      submitted_at: row.submitted_at,
      name: row.name,
      mobile: row.mobile,
      email: row.email,
      city: row.city,
      loan: row.loan,
      call_time: row.call_time,
      details: row.details,
    });
  });

  await workbook.xlsx.writeFile(EXCEL_EXPORT_PATH);

  res.download(EXCEL_EXPORT_PATH, 'Rise_Financial_Services_Applications.xlsx');
});

// ---------------------------------------------------------------------------
// Static frontend routes (serves the built React app exactly as-is)
// ---------------------------------------------------------------------------
app.use(express.static(CLIENT_DIST));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('==========================================================');
  console.log('  Rise Financial Services - Node.js backend running');
  console.log(`  Database engine: ${db.DB_ENGINE}  (connected successfully)`);
  console.log(`  Website:      http://localhost:${PORT}`);
  console.log(`  Health check: http://localhost:${PORT}/api/health`);
  console.log(`  Submissions:  http://localhost:${PORT}/api/submissions`);
  console.log(`  Excel export: http://localhost:${PORT}/api/export-excel`);
  console.log('==========================================================');
});
