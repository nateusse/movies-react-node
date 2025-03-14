const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
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
    }
});
module.exports.Director = model('Director', DirectorSchema);