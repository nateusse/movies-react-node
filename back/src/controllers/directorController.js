const Director = require('../models/Director'); 

exports.createDirector = async (req, res) => {
    try {
        const { name, status } = req.body;

        if (!name || !status) {
            return res.status(400).json({ message: "Name and status are required" });
        }

        const newDirector = new Director({ name, status });
        await newDirector.save();
        res.status(201).json(newDirector);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating director', error });
    }
};
