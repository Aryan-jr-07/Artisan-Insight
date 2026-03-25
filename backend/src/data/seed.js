require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const ArtisanData = require('../models/ArtisanData');
const sampleData = require('./sampleData');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existing = await ArtisanData.countDocuments();
    if (existing > 0) {
      console.log(`ℹ️  Database already has ${existing} records. Skipping seed.`);
      console.log('   Run with --force to override: node src/data/seed.js --force');
      if (!process.argv.includes('--force')) {
        await mongoose.disconnect();
        return;
      }
      await ArtisanData.deleteMany({});
      console.log('🗑️  Cleared existing data');
    }

    await ArtisanData.insertMany(sampleData);
    console.log(`✅ Successfully seeded ${sampleData.length} records`);
    console.log(`   States: ${[...new Set(sampleData.map(d => d.state))].length}`);
    console.log(`   Years: ${[...new Set(sampleData.map(d => d.year))].sort().join(', ')}`);
    await mongoose.disconnect();
    console.log('✅ Done.');
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
