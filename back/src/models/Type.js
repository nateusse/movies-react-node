const { Schema, model } = require('mongoose');

const TypeSchema = Schema({
    name: { 
        type: String, 
        enum: ['Serie', 'Movie'],
        default: 'Serie'
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


module.exports = model('Type', TypeSchema);