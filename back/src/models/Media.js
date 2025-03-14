const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    serial: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    url: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
    producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', MediaSchema);
