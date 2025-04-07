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

    await Genre.deleteMany();
    await Director.deleteMany();
    await Producer.deleteMany();
    await Type.deleteMany();
    await Media.deleteMany();

    const genres = await Genre.insertMany([
      { name: 'Action', status: 'Active', description: 'Explosions and fights' },
      { name: 'Drama', status: 'Active', description: 'Emotional stories' },
      { name: 'Horror', status: 'Inactive', description: 'Scary stuff' },
      { name: 'Romance', status: 'Active', description: 'Love stories' },
      { name: 'Comedy', status: 'Active', description: 'Humorous content' },
      { name: 'Sci-Fi', status: 'Active', description: 'Science fiction' },
      { name: 'Fantasy', status: 'Active', description: 'Fantasy worlds' },
      { name: 'Thriller', status: 'Active', description: 'Suspenseful narratives' },
      { name: 'Mystery', status: 'Active', description: 'Whodunit stories' },
      { name: 'Adventure', status: 'Active', description: 'Exciting journeys' },
    ]);

    const directors = await Director.insertMany([
      { name: 'Christopher Nolan', status: 'Active' },
      { name: 'Sofia Coppola', status: 'Inactive' },
      { name: 'Luc Besson', status: 'Active' },
      { name: 'Mike White', status: 'Active' },
      { name: 'Quentin Tarantino', status: 'Active' },
      { name: 'Ridley Scott', status: 'Active' },
      { name: 'Lana Wachowski', status: 'Active' },
      { name: 'Steven Spielberg', status: 'Active' },
      { name: 'Martin Scorsese', status: 'Active' },
      { name: 'Greta Gerwig', status: 'Active' },
      { name: 'Denis Villeneuve', status: 'Active' },
      { name: 'Matt Duffer', status: 'Active' },
      { name: 'Ross Duffer', status: 'Active' },
      { name: 'Jon Favreau', status: 'Active' },
      { name: 'David Benioff', status: 'Active' },
      { name: 'Vince Gilligan', status: 'Active' },
      { name: 'Tim Burton', status: 'Active' },
      { name: 'Vince Gilligan', status: 'Active' },
      { name: 'Alex Garcia Lopez', status: 'Active' },
      { name: 'Patty Jenkins', status: 'Active' },
    ]);

    const producers = await Producer.insertMany([
      { name: 'Warner Bros.', slogan: 'The stuff that dreams are made of', description: 'Major American studio', status: 'Active' },
      { name: 'HBO', slogan: 'It’s not TV. It’s HBO', description: 'Premium cable service', status: 'Active' },
      { name: 'Atlas Entertainment', slogan: 'Oppenheimer', description: 'Indie production house', status: 'Active' },
      { name: 'Disney', slogan: 'The happiest place on Earth', description: 'Entertainment giant', status: 'Active' },
      { name: 'Sony Pictures', slogan: 'Make.believe', description: 'Japanese film studio', status: 'Active' },
      { name: 'Universal Pictures', slogan: 'Universal Pictures', description: 'Major Hollywood studio', status: 'Active' },
      { name: 'DreamWorks', slogan: 'DreamWorks SKG', description: 'Studio known for animated and live-action films', status: 'Active' },
      { name: 'Paramount Pictures', slogan: 'If it’s a Paramount Picture, it’s the best show in town', description: 'American film studio', status: 'Active' },
      { name: 'Netflix', slogan: 'See what’s next', description: 'Streaming giant', status: 'Active' },
      { name: 'Amazon Studios', slogan: 'Your entertainment, your way', description: 'Film and series production arm of Amazon', status: 'Active' },
    ]);

    const types = await Type.insertMany([
      { name: 'Movie', description: 'Full-length film' },
      { name: 'Serie', description: 'Episodic content' },
    ]);

    const mediaToInsert = [
      {
        serial: 'SER0001',
        title: 'The White Lotus',
        synopsis: 'An anthology series set in a luxury resort.',
        url: 'https://www.youtube.com/watch?v=XwQRkOK5KC4',
        image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/The_White_Lotus_Season_1.png',
        releaseYear: 2021,
        genre: genres[1]._id,
        director: directors[2]._id,
        producer: producers[1]._id,
        type: types[1]._id
      },
      {
        serial: 'SER0002',
        title: 'Stranger Things',
        synopsis: 'A mystery involving supernatural forces and a strange girl.',
        url: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
        image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Stranger_Things_season_4.jpg',
        releaseYear: 2016,
        genre: genres.find(g => g.name === 'Sci-Fi')._id,
        director: directors.find(d => d.name === 'Matt Duffer')._id,
        producer: producers.find(p => p.name === 'Netflix')._id,
        type: types.find(t => t.name === 'Serie')._id,
      }, 
      {
        serial: 'SER0003',
        title: '100 years of solitude',
        synopsis: 'The story follows cousins José and Úrsula, who get married against their parents wishes and leave their village to embark on a long journey in search of a new home.',
        url: 'https://www.youtube.com/watch?v=4oQeQR1DEjw',
        image: 'https://pics.filmaffinity.com/cien_anos_de_soledad-606630216-large.jpg',
        releaseYear: 2024,
        genre: genres.find(g => g.name === 'Drama')._id,
        director: directors.find(d => d.name === 'Alex Garcia Lopez')._id,
        producer: producers.find(p => p.name === 'Netflix')._id,
        type: types.find(t => t.name === 'Serie')._id,
      },
      {
        serial: 'MOV0001',
        title: 'Openheimer',
        synopsis: 'A dramatization of the life story of J. Robert Oppenheimer, the physicist who had a large hand in the development of the atomic bombs that brought an end to World War II.',
        url: 'https://www.youtube.com/watch?v=4oQeQR1DEw',
        image: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
        releaseYear: 2023,
        genre: genres.find(g => g.name === 'Drama')._id,
        director: directors.find(d => d.name === 'Christopher Nolan')._id,
        producer: producers.find(p => p.name === 'Atlas Entertainment')._id,
        type: types.find(t => t.name === 'Movie')._id,
      },
      {
        serial: 'SER0004',
        title: 'Breaking Bad',
        synopsis: 'A chemistry teacher diagnosed with cancer turns to manufacturing and selling methamphetamine with a former student.',
        url: 'https://www.youtube.com/watch?v=HhesaQXLuR',
        image: 'https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_.jpg',
        releaseYear: 2008,
        genre: genres.find(g => g.name === 'Drama')._id,
        director: directors.find(d => d.name === 'Vince Gilligan')._id,
        producer: producers.find(p => p.name === 'Sony Pictures')._id,
        type: types.find(t => t.name === 'Serie')._id,
      },
      {
        serial: 'MOV0002',
        title: 'Interstellar',
        synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        url: 'https://www.youtube.com/watch?v=zSWdZVtXE',
        image: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
        releaseYear: 2014,
        genre: genres.find(g => g.name === 'Sci-Fi')._id,
        director: directors.find(d => d.name === 'Christopher Nolan')._id,
        producer: producers.find(p => p.name === 'Warner Bros.')._id,
        type: types.find(t => t.name === 'Movie')._id,
      },
      {
        serial: 'MOV0003',
        title: 'Gladiator',
        synopsis: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
        url: 'https://www.youtube.com/watch?v=owK1xDselE',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Gladiator_%282000_film_poster%29.png/250px-Gladiator_%282000_film_poster%29.png',
        releaseYear: 2000,
        genre: genres.find(g => g.name === 'Drama')._id,
        director: directors.find(d => d.name === 'Ridley Scott')._id,
        producer: producers.find(p => p.name === 'Universal Pictures')._id,
        type: types.find(t => t.name === 'Movie')._id,
      },
      {
        serial: 'MOV0004',
        title: 'Pulp Fiction',
        synopsis: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        url: 'https://www.youtube.com/watch?v=s7EdQ4FqhY',
        image: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
        releaseYear: 1994,
        genre: genres.find(g => g.name === 'Thriller')._id,
        director: directors.find(d => d.name === 'Quentin Tarantino')._id,
        producer: producers.find(p => p.name === 'Paramount Pictures')._id,
        type: types.find(t => t.name === 'Movie')._id,
      }
    ];

    for (const media of mediaToInsert) {
      await Media.create(media);
      console.log(`Inserted: ${media.title}`);
    }

    console.log('Seeding complete ✅');
    process.exit();

  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
