const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    serial: { type: String, unique: true, required: true,  },
    title: { type: String, required: true, unique: true },
    synopsis: { type: String, required: true , unique: true},
    url: { type: String, unique: true, required: true , unique: true},
    image: { type: String, required: true , unique: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    releaseYear: { type: Number, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
    producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    
});

module.exports = mongoose.model('Media', MediaSchema);
