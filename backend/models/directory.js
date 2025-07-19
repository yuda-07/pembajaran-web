const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  photo: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  github: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Directory', directorySchema); 