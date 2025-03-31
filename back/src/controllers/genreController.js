const Genre = require('../models/Genre');

exports.createGenre = async (req, res) => {
    try {
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



exports.deleteGenre = async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if (!deletedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting genre', error });
    }
};