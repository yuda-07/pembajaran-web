const Directory = require('../models/directory');

exports.getAllDirectory = async (req, res) => {
  try {
    const directories = await Directory.find();
    res.json(directories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDirectoryById = async (req, res) => {
  try {
    const directory = await Directory.findById(req.params.id);
    if (!directory) return res.status(404).json({ error: 'Directory not found' });
    res.json(directory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDirectory = async (req, res) => {
  try {
    const newDirectory = new Directory(req.body);
    await newDirectory.save();
    res.status(201).json(newDirectory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDirectory = async (req, res) => {
  try {
    const updated = await Directory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Directory not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDirectory = async (req, res) => {
  try {
    const deleted = await Directory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Directory not found' });
    res.json({ message: 'Directory deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 