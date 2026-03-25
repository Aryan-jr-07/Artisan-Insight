const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const ArtisanData = require('../models/ArtisanData');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `upload_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.csv', '.xlsx', '.xls'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV and Excel files are allowed'));
    }
  },
});

// Robust number parsing
function parseNumber(val) {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return val;
  const cleanStr = String(val).replace(/[^\d.-]/g, '');
  const num = parseFloat(cleanStr);
  return isNaN(num) ? 0 : num;
}

// Extract year from a string like "2022-23" or "Year 2021"
function extractYear(str) {
  const match = str.match(/\d{4}/);
  if (match) return parseInt(match[0]);
  const shortMatch = str.match(/'?(\d{2})-(\d{2})/); // handle 22-23
  if (shortMatch) return 2000 + parseInt(shortMatch[1]);
  return null;
}

// Processes a row and returns an array of normalized records (handles both Long and Wide formats)
function processRow(row) {
  const normalizedRow = {};
  Object.keys(row).forEach(k => {
    normalizedRow[k.trim().toLowerCase()] = row[k];
  });

  const get = (...keys) => {
    for (const k of keys) {
      const val = normalizedRow[k.toLowerCase()];
      if (val !== undefined && val !== null && val !== '') return val;
    }
    return null;
  };

  const state = String(get('state', 'states/uts', 'name of state', 'province') || '').trim();
  if (!state || state.toLowerCase() === 'total' || state.toLowerCase().includes('grand total')) return [];

  // Check for explicit "Year" column (Long Format)
  const explicitYearVal = get('year', 'financial year', 'period');
  if (explicitYearVal) {
    const year = extractYear(String(explicitYearVal));
    const count = parseNumber(get('beneficiaries', 'beneficiary count', 'total count', 'beneficiaries reached'));
    if (year && !isNaN(count)) {
      return [{
        state,
        year,
        beneficiaries: Math.round(count),
        male_beneficiaries: Math.round(parseNumber(get('male_beneficiaries', 'male'))),
        female_beneficiaries: Math.round(parseNumber(get('female_beneficiaries', 'female'))),
        budget_allocated: parseNumber(get('budget_allocated', 'budget')),
        scheme: String(get('scheme', 'scheme name') || 'PM Vishwakarma'),
      }];
    }
  }

  // Wide Format detection: Check all headers for years
  const records = [];
  Object.keys(normalizedRow).forEach(key => {
    // Look for headers containing years like "2021-22" or "Beneficiaries 2022"
    const year = extractYear(key);
    if (year && (key.includes('beneficiar') || key.includes('count') || key.includes('total'))) {
      const count = parseNumber(normalizedRow[key]);
      if (count > 0 || normalizedRow[key] === 0 || normalizedRow[key] === '0') {
        records.push({
          state,
          year,
          beneficiaries: Math.round(count),
          scheme: 'PM Vishwakarma',
        });
      }
    }
  });

  return records;
}

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  const allRecords = [];

  try {
    let rawRows = [];
    if (ext === '.csv') {
      await new Promise((resolve, reject) => {
        const rows = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', row => rows.push(row))
          .on('end', () => { rawRows = rows; resolve(); })
          .on('error', reject);
      });
    } else {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      rawRows = XLSX.utils.sheet_to_json(sheet);
    }

    for (const row of rawRows) {
      const processed = processRow(row);
      if (processed && processed.length > 0) {
        allRecords.push(...processed);
      }
    }

    if (allRecords.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: 'No valid records found. Ensure your data contains State/UT names and specific years (e.g. 2022).',
      });
    }

    // Upsert records
    let inserted = 0, updated = 0;
    for (const rec of allRecords) {
      await ArtisanData.findOneAndUpdate(
        { state: rec.state, year: rec.year },
        rec,
        { upsert: true, new: true }
      );
      // Simplified stats counting: for now we just count as success
      inserted++; 
    }

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: `Processed ${allRecords.length} records`,
      stats: { total: allRecords.length, inserted, updated },
      preview: allRecords.slice(0, 5),
    });
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
