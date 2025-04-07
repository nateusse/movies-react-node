require('dotenv').config({ path: './.env' }); 
const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI;

        if (!url) {
            throw new Error("Mongo not recognizing .env");
        }
        
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected MongoDB');

    } catch (error) {
        console.error('Error mongoDB', error);
        process.exit(1); // Sale de la aplicación si la conexión falla
    }
};

// Exportar la función correctamente
module.exports = { getConnection };
