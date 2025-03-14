const { Schema, model } = require('mongoose');

const ProducerSchema = Schema({

    name: {
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Active', 'Inactive'],
        default: 'Inactive' },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    slogan: { 
        type: String 
    },
    description: { 
        type: String 
    }
});
module.exports.Producer = model('Producer', ProducerSchema);