const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');
const Producer = require('../models/Producer'); 

// Rutas
router.post('/', producerController.createProducer);

router.get('/', async (req, res) => {
    try {
        const producers = await Producer.find();
        res.json(producers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching genres', error });
    }
});

module.exports = router;
