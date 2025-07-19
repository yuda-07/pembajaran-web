const Gallery = require('../models/gallery');

exports.getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: 'Gallery not found' });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createGallery = async (req, res) => {
  try {
    const newGallery = new Gallery(req.body);
    await newGallery.save();
    res.status(201).json(newGallery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Gallery not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Gallery not found' });
    res.json({ message: 'Gallery deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 