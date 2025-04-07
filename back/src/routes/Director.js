const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');
const Director = require('../models/Director');

// Create Director
router.post('/', directorController.createDirector);

// Get all Directors
router.get('/', async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching directors', error });
    }
});

// Update Director
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        // Validate incoming fields
        if (!name && !status) {
            return res.status(400).json({
                message: 'Please provide at least one field to update: name or status.'
            });
        }

        const updatedDirector = await Director.findByIdAndUpdate(
            id,
            { name, status },
            { new: true, runValidators: true }
        );

        if (!updatedDirector) {
            return res.status(404).json({ message: 'Director not found.' });
        }

        res.status(200).json(updatedDirector);
    } catch (error) {
        res.status(500).json({ message: 'Error updating director.', error });
    }
});

// Update Director by name
router.put('/name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { newName, status } = req.body;

        // Validar que haya al menos un campo a actualizar
        if (!newName && !status) {
            return res.status(400).json({
                message: 'Please provide at least one field to update: newName or status.'
            });
        }

        const updatedDirector = await Director.findOneAndUpdate(
            { name },
            { 
                ...(newName && { name: newName }),
                ...(status && { status }) 
            },
            { new: true, runValidators: true }
        );

        if (!updatedDirector) {
            return res.status(404).json({ message: 'Director not found.' });
        }

        res.status(200).json(updatedDirector);
    } catch (error) {
        res.status(500).json({ message: 'Error updating director.', error });
    }
});

module.exports = router;

