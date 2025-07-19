const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
// const auth = require('../middleware/auth');

router.get('/', aboutController.getAllAbout);
router.get('/:id', aboutController.getAboutById);
router.post('/', aboutController.createAbout);
router.put('/:id', aboutController.updateAbout);
router.delete('/:id', aboutController.deleteAbout);

module.exports = router; 