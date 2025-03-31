require('dotenv').config();
const mongoose = require('mongoose');

const Genre = require('./models/Genre');
const Director = require('./models/Director');
const Producer = require('./models/Producer');
const Type = require('./models/Type');
const Media = require('./models/Media');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(' Connected to MongoDB for seeding...');

    // Clear collections
    await Genre.deleteMany();
    await Director.deleteMany();
    await Producer.deleteMany();
    await Type.deleteMany();
    await Media.deleteMany();

    
    const genres = await Genre.insertMany([
      { name: 'Action', status: 'Active', description: 'Explosions and fights' },
      { name: 'Drama', status: 'Active', description: 'Emotional stories' },
      { name: 'Horror', status: 'Inactive', description: 'Scary stuff' }
    ]);

    
    const directors = await Director.insertMany([
      { name: 'Christopher Nolan', status: 'Active' },
      { name: 'Sofia Coppola', status: 'Inactive' },
      { name: 'Mike White', status: 'Active' }
    ]);

    
    const producers = await Producer.insertMany([
      { name: 'Warner Bros.', slogan: 'The stuff that dreams are made of', description: 'Major American studio', status: 'Active' },
      { name: 'HBO', slogan: 'It’s not TV. It’s HBO', description: 'Premium cable service', status: 'Active' },
      { name: 'A24', slogan: 'A24', description: 'Indie production house', status: 'Inactive' }
    ]);

    
    const types = await Type.insertMany([
      { name: 'Movie', description: 'Full-length film' },
      { name: 'Serie', description: 'Episodic content' },
    ]);

 
    const insertMedia = async (media) => {
      const genre = await Genre.findById(media.genre);
      const director = await Director.findById(media.director);
      const producer = await Producer.findById(media.producer);

      if (
        genre?.status !== 'Active' ||
        director?.status !== 'Active' ||
        producer?.status !== 'Active'
      ) {
        console.log(` Skipped "${media.title}" — one or more references are inactive`);
        return;
      }

      await Media.create(media);
      console.log(` Inserted: ${media.title}`);
    };

  
    await insertMedia({
      serial: 'MOV123456',
      title: 'The White Lotus',
      synopsis: 'An anthology series set in a luxury resort.',
      url: 'https://youtube.com/thewhitelotus',
      image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/The_White_Lotus_Season_1.png',
      releaseYear: 2021,
      genre: genres[1]._id,        
      director: directors[2]._id,  
      producer: producers[1]._id,  
      type: types[1]._id          
    });

    await insertMedia({
      serial: 'FAIL001',
      title: 'Gender Fails',
      synopsis: 'This should fail because the gender is inactive',
      url: 'https://youtube.com/thewhitelotus',
      image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/The_White_Lotus_Season_1.png',
      releaseYear: 2021,
      genre: genres[2]._id,        
      director: directors[2]._id,  
      producer: producers[1]._id,  
      type: types[1]._id             
    });

    await insertMedia({
        serial: 'FAIL002',
        title: 'Director Fails',
        synopsis: 'This should fail because the director is inactive',
        url: 'https://youtube.com/thewhitelotus',
        image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/The_White_Lotus_Season_1.png',
        releaseYear: 2021,
        genre: genres[1]._id,          
        director: directors[1]._id,  
        producer: producers[1]._id,  
        type: types[1]._id           
    });

    await insertMedia({
        serial: 'FAIL003',
        title: 'Producer Fails',
        synopsis: 'This should fail because the director is inactive',
        url: 'https://youtube.com/thewhitelotus',
        image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/The_White_Lotus_Season_1.png',
        releaseYear: 2021,
        genre: genres[1]._id,          
        director: directors[1]._id,  
        producer: producers[1]._id,  
        type: types[1]._id           
    });

    await insertMedia({
        serial: 'FAIL004',
        title: 'Type Fails',
        synopsis: 'This should fail because the type is not serie or movie',
        url: 'https://youtube.com/thewhitelotus',
        image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/The_White_Lotus_Season_1.png',
        releaseYear: 2021,
        genre: genres[1]._id,          
        director: directors[1]._id,  
        producer: producers[1]._id,  
        type: "hola"          
    });

    console.log('Finished seeding');
    process.exit();
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
