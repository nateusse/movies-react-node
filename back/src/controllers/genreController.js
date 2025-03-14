const Genre = require('../models/Genre');

exports.createGenre = async (req, res) => {
    try {
        // Verifica si el body tiene los datos requeridos
        const { name, status, description } = req.body;

        if (!name || !status) {
            return res.status(400).json({ message: "Name and status are required" });
        }

        const newGenre = new Genre({ name, status, description });
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating genre', error });
    }
};
