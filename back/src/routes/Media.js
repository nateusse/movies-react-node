const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const Media = require('../models/Media'); 

router.post('/', mediaController.createMedia);

router.get('/', async (req, res) => {
    try {
        const medias = await Media.find();
        res.json(medias);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media', error });
    }
});

module.exports = router;
