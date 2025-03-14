require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/connect-mongo');

const genreRoutes = require('./routes/Genre'); // Importación correcta

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// **Montar las rutas correctamente**
app.use('/api/genres', genreRoutes);

// Conectar a MongoDB antes de iniciar el servidor
getConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Error al iniciar la aplicación:', err);
});
