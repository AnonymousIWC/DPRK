const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ── DATABASE ──────────────────────────────────────────────────────────────────
let pool = null;

async function getDb() {
  const connStr = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connStr) return null;
  if (!pool) {
    const { Pool } = require('pg');
    pool = new Pool({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registry (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        name_lower TEXT NOT NULL UNIQUE,
        title_en   TEXT NOT NULL,
        title_ko   TEXT NOT NULL DEFAULT '',
        reg_num    TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
  }
  return pool;
}

// Initialise on startup (non-blocking)
getDb().catch(err => console.error('DB init error:', err.message));

// ── API ROUTES ────────────────────────────────────────────────────────────────

// GET /api/search?name=xxx
app.get('/api/search', async (req, res) => {
  const name = (req.query.name || '').trim();
  if (!name) return res.json({ found: false });

  const db = await getDb();
  if (!db) return res.status(503).json({ error: 'Registry database not configured.' });

  try {
    const result = await db.query(
      'SELECT name, title_en, title_ko, reg_num FROM registry WHERE name_lower = $1 LIMIT 1',
      [name.toLowerCase()]
    );
    if (result.rows.length === 0) return res.json({ found: false });
    res.json({ found: true, entry: result.rows[0] });
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ error: 'Registry lookup failed.' });
  }
});

// POST /api/add  { password, name, titleEn, titleKo, regNum }
app.post('/api/add', async (req, res) => {
  const { password, name, titleEn, titleKo, regNum } = req.body || {};

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect access code. The committee has noted this attempt.' });
  }
  if (!name || !titleEn) {
    return res.status(400).json({ error: 'Name and title are required.' });
  }

  const db = await getDb();
  if (!db) return res.status(503).json({ error: 'Registry database not configured.' });

  const reg = (regNum || '').trim() ||
    'STR-' + String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0');

  try {
    await db.query(
      `INSERT INTO registry (name, name_lower, title_en, title_ko, reg_num)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (name_lower) DO UPDATE
         SET title_en = EXCLUDED.title_en,
             title_ko = EXCLUDED.title_ko,
             reg_num  = EXCLUDED.reg_num`,
      [name.trim(), name.trim().toLowerCase(), titleEn.trim(), (titleKo || '').trim(), reg]
    );
    res.json({ success: true, regNum: reg });
  } catch (err) {
    console.error('Add error:', err.message);
    res.status(500).json({ error: 'Failed to add entry.' });
  }
});

// GET /api/debug — temporary, remove after testing
app.get('/api/debug', async (req, res) => {
  const connStr = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connStr) return res.json({ error: 'No connection string found', env: Object.keys(process.env).filter(k => k.includes('POST') || k.includes('DATA') || k.includes('NEON')) });
  const db = await getDb();
  if (!db) return res.json({ error: 'pool is null' });
  try {
    const result = await db.query('SELECT id, name, name_lower, reg_num FROM registry ORDER BY id DESC LIMIT 20');
    res.json({ count: result.rows.length, rows: result.rows });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ── STATIC ASSETS ─────────────────────────────────────────────────────────────
app.use('/public', express.static(path.join(__dirname, 'public')));

// ── PAGE ROUTES ───────────────────────────────────────────────────────────────
function servePage(res, filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send('<div style="text-align:center;padding:80px;font-family:VT323,monospace;font-size:48px;color:#cc0000;">PAGE NOT FOUND<br><small style="font-size:20px;">The committee is looking into this.</small></div>');
  }
  res.send(fs.readFileSync(fullPath, 'utf8'));
}

app.get('/',            (req, res) => servePage(res, 'pages/home.html'));
app.get('/titles',      (req, res) => servePage(res, 'pages/titles.html'));
app.get('/find',        (req, res) => servePage(res, 'pages/quiz.html'));
app.get('/about',       (req, res) => servePage(res, 'pages/about.html'));
app.get('/registry',    (req, res) => servePage(res, 'pages/registry.html'));
app.get('/certificate', (req, res) => servePage(res, 'pages/certificate.html'));
app.get('/gift',        (req, res) => servePage(res, 'pages/gift.html'));
app.get('/title/:slug', (req, res) => servePage(res, 'pages/product.html'));

app.listen(PORT, () => {
  console.log(`\n★ DPRK Title Registry running at http://localhost:${PORT}`);
  console.log(`  Dispatched from Desert Colony, Australia. Conditions: excellent.\n`);
});
