const { Schema, model } = require('mongoose');

const TypeSchema = Schema({
    name: { 
        type: String, 
        required: true 
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

module.exports.Type = model('Type', TypeSchema);