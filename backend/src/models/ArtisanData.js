const mongoose = require('mongoose');

const artisanDataSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  beneficiaries: {
    type: Number,
    required: true,
    default: 0,
  },
  male_beneficiaries: {
    type: Number,
    default: 0,
  },
  female_beneficiaries: {
    type: Number,
    default: 0,
  },
  budget_allocated: {
    type: Number,
    default: 0,
    comment: 'In Lakhs INR',
  },
  scheme: {
    type: String,
    default: 'PM Vishwakarma',
  },
  category: {
    type: String,
    default: 'General',
  },
  source: {
    type: String,
    default: 'data.gov.in',
  },
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
});

artisanDataSchema.index({ state: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('ArtisanData', artisanDataSchema);
