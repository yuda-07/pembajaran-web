const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');
// const auth = require('../middleware/auth');

router.get('/', directoryController.getAllDirectory);
router.get('/:id', directoryController.getDirectoryById);
router.post('/', directoryController.createDirectory);
router.put('/:id', directoryController.updateDirectory);
router.delete('/:id', directoryController.deleteDirectory);

module.exports = router; 