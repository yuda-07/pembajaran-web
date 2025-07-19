const Info = require('../models/info');

exports.getAllInfo = async (req, res) => {
  try {
    const infos = await Info.find();
    res.json(infos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInfoById = async (req, res) => {
  try {
    const info = await Info.findById(req.params.id);
    if (!info) return res.status(404).json({ error: 'Info not found' });
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInfo = async (req, res) => {
  try {
    const newInfo = new Info(req.body);
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const updated = await Info.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Info not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteInfo = async (req, res) => {
  try {
    const deleted = await Info.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Info not found' });
    res.json({ message: 'Info deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 