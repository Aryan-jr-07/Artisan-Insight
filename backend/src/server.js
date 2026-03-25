require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ──────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// ── Routes ──────────────────────────────────────────────
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/asi', require('./routes/asi'));
app.use('/api/insights', require('./routes/insights'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/data', require('./routes/data'));

// ── Health Check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.path} not found` });
});

// ── Error Handler ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

// ── Start ───────────────────────────────────────────────
async function start() {
  await connectDB();

  // Auto-seed if DB is empty
  const ArtisanData = require('./models/ArtisanData');
  const count = await ArtisanData.countDocuments();
  if (count === 0) {
    console.log('📦 No data found. Auto-seeding sample dataset...');
    const sampleData = require('./data/sampleData');
    await ArtisanData.insertMany(sampleData);
    console.log(`✅ Auto-seeded ${sampleData.length} records`);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Artisan Insight API running at http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
  });
}

start();
