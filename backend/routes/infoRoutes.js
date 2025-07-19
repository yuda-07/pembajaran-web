const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
// const auth = require('../middleware/auth'); // Sudah di app.js

router.get('/', infoController.getAllInfo);
router.get('/:id', infoController.getInfoById);
router.post('/', infoController.createInfo);
router.put('/:id', infoController.updateInfo);
router.delete('/:id', infoController.deleteInfo);

module.exports = router; 