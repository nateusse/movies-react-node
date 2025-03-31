const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const Genre = require('../models/Genre'); // Aseguramos que Genre esté definido aquí

// Rutas
router.post('/', genreController.createGenre);

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching genres', error });
    }
});

router.delete('/:id', genreController.deleteGenre);

module.exports = router;
