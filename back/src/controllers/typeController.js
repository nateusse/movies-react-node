const Type = require('../models/Type');

exports.createType = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        const newType = new Type({ name, description });
        await newType.save();
        res.status(201).json(newType);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating type', error });
    }
};
