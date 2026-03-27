const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (CSS, JS, fonts, images)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route each page
const pages = {
  '/':            'pages/home.html',
  '/titles':      'pages/titles.html',
  '/title/:slug': 'pages/product.html',
  '/find':        'pages/quiz.html',
  '/certificate': 'pages/certificate.html',
  '/registry':    'pages/registry.html',
  '/about':       'pages/about.html',
  '/gift':        'pages/gift.html',
};

// Simple HTML file server with shared component injection
function servePage(res, filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send(renderPage('404', '<div style="text-align:center;padding:80px;font-family:VT323,monospace;font-size:48px;color:#cc0000;">PAGE NOT FOUND<br><small style="font-size:20px;">The committee is looking into this.</small></div>'));
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  res.send(content);
}

// Pages
app.get('/', (req, res) => servePage(res, 'pages/home.html'));
app.get('/titles', (req, res) => servePage(res, 'pages/titles.html'));
app.get('/find', (req, res) => servePage(res, 'pages/quiz.html'));
app.get('/about', (req, res) => servePage(res, 'pages/about.html'));
app.get('/registry', (req, res) => servePage(res, 'pages/registry.html'));
app.get('/certificate', (req, res) => servePage(res, 'pages/certificate.html'));
app.get('/gift', (req, res) => servePage(res, 'pages/gift.html'));

// Product pages: /title/iron-willed-commander etc
app.get('/title/:slug', (req, res) => servePage(res, 'pages/product.html'));

app.listen(PORT, () => {
  console.log(`\n★ DPRK Title Registry running at http://localhost:${PORT}`);
  console.log(`  Dispatched from Desert Colony, Australia. Conditions: excellent.\n`);
});
