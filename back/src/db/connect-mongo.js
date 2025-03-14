require('dotenv').config({ path: './.env' }); 
const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI;

        if (!url) {
            throw new Error("⚠️ MONGO_URI no está definido en el archivo .env");
        }
        
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ Conexión a MongoDB exitosa');

    } catch (error) {
        console.error('❌ Error al conectar con MongoDB:', error);
        process.exit(1); // Sale de la aplicación si la conexión falla
    }
};

// Exportar la función correctamente
module.exports = { getConnection };
