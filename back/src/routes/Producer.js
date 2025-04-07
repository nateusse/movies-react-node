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


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, slogan, status, descripcion } = req.body;

        // Validate incoming fields
        if (!nombre && !slogan && !status && !descripcion) {
            return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar: nombre, slogan, status o descripcion.' });
        }

        // Update logic
        const updatedProducer = await Producer.findByIdAndUpdate(
            id,
            { nombre, slogan, status, descripcion },
            { new: true, runValidators: true }
        );

        if (!updatedProducer) {
            return res.status(404).json({ message: 'Productor no encontrado.' });
        }

        res.status(200).json(updatedProducer);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el productor.', error });
    }
});



module.exports = router;
