const { Schema, model } = require('mongoose');

const TypeSchema = Schema({
    name: { 
        type: String, 
        enum: ['Serie', 'Movie', "Show", "Short Film", "Musical", "Show", "Opera", "Cartooon", "Docuseries"],
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