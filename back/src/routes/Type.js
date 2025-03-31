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

module.exports = router;
