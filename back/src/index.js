require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/connect-mongo');

const genreRoutes = require('./routes/Genre'); 
const directorRoutes = require('./routes/Director'); 
const producerRoutes = require('./routes/Producer'); 
const typeRoutes = require('./routes/Type'); 
const mediaRoutes = require('./routes/Media'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Mostrar frontend permitido
console.log('🌍 FRONTEND_URL permitida:', process.env.FRONTEND_URL);

const allowedOrigins = [
  process.env.FRONTEND_URL?.trim().replace(/\/$/, ''), // sin slash final
  'http://localhost:5173'
];

// Mostrar el origen de cada request
app.use((req, res, next) => {
  console.log('🌐 Request origin:', req.headers.origin);
  next();
});

// Middleware de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin.trim().replace(/\/$/, ''))) {
      callback(null, true);
    } else {
      console.log('❌ Bloqueado por CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.use('/api/genres', genreRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/producers', producerRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/media', mediaRoutes);

getConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`);
  });
}).catch(err => {
  console.error('❌ MongoDB Error:', err);
});
