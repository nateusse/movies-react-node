const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController'); 
const Director = require('../models/Director');


router.post('/', directorController.createDirector);

router.get('/', async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching directors', error });
    }
});

module.exports = router;
