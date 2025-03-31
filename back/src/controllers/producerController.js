const Producer = require('../models/Producer'); 

exports.createProducer = async (req, res) => {
    try {
        const { name, status, slogan, description } = req.body;

        if (!name || !status || !slogan || !description) {
            return res.status(400).json({ message: "Name, status, slogan y descripcion  are required" });
        }

        const newProducer = new Producer({ name, status, slogan, description });
        await newProducer.save();
        res.status(201).json(newProducer);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating director', error });
    }
};
