const Agenda = require('../models/agenda');

exports.getAllAgenda = async (req, res) => {
  try {
    const agendas = await Agenda.find();
    res.json(agendas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAgendaById = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);
    if (!agenda) return res.status(404).json({ error: 'Agenda not found' });
    res.json(agenda);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAgenda = async (req, res) => {
  try {
    const newAgenda = new Agenda(req.body);
    await newAgenda.save();
    res.status(201).json(newAgenda);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAgenda = async (req, res) => {
  try {
    const updated = await Agenda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Agenda not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAgenda = async (req, res) => {
  try {
    const deleted = await Agenda.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Agenda not found' });
    res.json({ message: 'Agenda deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 