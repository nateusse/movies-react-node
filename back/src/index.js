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

app.use(express.json());
app.use(cors());


app.use('/api/genres', genreRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/producers', producerRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/media', mediaRoutes);

getConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Running port ${PORT}`);
    });
}).catch(err => {
    console.error( err);
});
