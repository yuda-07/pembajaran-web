const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
// const auth = require('../middleware/auth');

router.get('/', galleryController.getAllGallery);
router.get('/:id', galleryController.getGalleryById);
router.post('/', galleryController.createGallery);
router.put('/:id', galleryController.updateGallery);
router.delete('/:id', galleryController.deleteGallery);

module.exports = router; 