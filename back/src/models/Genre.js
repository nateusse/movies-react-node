const { Schema, model } = require('mongoose');

const GenreSchema = Schema({
    name: { 
        type: String, 
        required: true 
    },
    status: {
        type: String, 
        enum: ['Active', 'Inactive'], 
        default: 'Inactive' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now
    },
    description: { 
        type: String 
    }
});

module.exports = model('Genre', GenreSchema);
