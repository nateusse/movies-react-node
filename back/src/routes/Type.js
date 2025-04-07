const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const Type = require('../models/Type'); 


router.post('/', typeController.createType);

router.get('/', async (req, res) => {
    try {
        const types = await Type.find();
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching types', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({
                message: 'Debes proporcionar al menos un campo: name o description.'
            });
        }

        const updatedType = await Type.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(description && { description }),
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        );

        if (!updatedType) {
            return res.status(404).json({ message: 'Tipo no encontrado.' });
        }

        res.status(200).json(updatedType);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tipo.', error });
    }
});

module.exports = router;
