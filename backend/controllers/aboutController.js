const About = require('../models/about');

exports.getAllAbout = async (req, res) => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ error: 'About not found' });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const newAbout = new About(req.body);
    await newAbout.save();
    res.status(201).json(newAbout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const updated = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'About not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const deleted = await About.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'About not found' });
    res.json({ message: 'About deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 