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
      { name: 'Hideo Kojima', status: 'Active' },
      { name: 'Tim Burton', status: 'Active' },
      { name: 'Vince Gilligan', status: 'Active' },
      { name: 'David Fincher', status: 'Active' },
      { name: 'Patty Jenkins', status: 'Active' },
    ]);

    // Insert producers
    const producers = await Producer.insertMany([
      { name: 'Warner Bros.', slogan: 'The stuff that dreams are made of', description: 'Major American studio', status: 'Active' },
      { name: 'HBO', slogan: 'It’s not TV. It’s HBO', description: 'Premium cable service', status: 'Active' },
      { name: 'A24', slogan: 'A24', description: 'Indie production house', status: 'Active' },
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
      url: 'https://www.youtube.com/watch?v=XwQRkOK5KC4',
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

    await insertMedia({
      serial: 'FAIL004',
      title: 'Type Fails',
      synopsis: 'This should fail because the type is not serie or movie',
      url: 'https://youtube.com/thewhitelotus',
      image: 'https://m.media-amazon.com/images/I/81zOZC8l+3L._AC_SY679_.jpg',
      releaseYear: 2021,
      genre: genres[1]._id,          
      director: directors[1]._id,  
      producer: producers[1]._id,  
      type: "hola"          
  });


  
  await insertMedia({
    serial: 'SER0002',
    title: 'Stranger Things',
    synopsis: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, supernatural forces, and a strange girl.',
    url: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Stranger_Things_season_4.jpg',
    releaseYear: 2016,
    genre: genres.find(g => g.name === 'Sci-Fi')._id,
    director: directors.find(d => d.name === 'Matt Duffer')._id,
    producer: producers.find(p => p.name === 'Netflix')._id,
    type: types.find(t => t.name === 'Serie')._id,
  });
  

  
  await insertMedia({
    serial: 'SER0004',
    title: 'The Mandalorian',
    synopsis: 'A lone gunfighter makes his way through the outer reaches of the galaxy, far from the authority of the New Republic.',
    url: 'https://www.youtube.com/watch?v=aOC8E8z_ifw',
    image: 'https://m.media-amazon.com/images/M/MV5BNjgxZGM0OWUtZGY1MS00MWRmLTk2N2ItYjQyZTI1OThlZDliXkEyXkFqcGc@._V1_.jpg',
    releaseYear: 2019,
    genre: genres.find(g => g.name === 'Action')._id,
    director: directors.find(d => d.name === 'Jon Favreau')._id,
    producer: producers.find(p => p.name === 'Disney')._id,
    type: types.find(t => t.name === 'Serie')._id,
  });

  await insertMedia({
  serial: 'SER0001',
  title: 'Breaking Bad',
  synopsis: 'A high school chemistry teacher turned methamphetamine producer partners with a former student to secure his family\'s future.',
  url: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
  image: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/breaking_bad_4.png',
  releaseYear: 2008,
  genre: genres.find(g => g.name === 'Drama')._id,
  director: directors.find(d => d.name === 'Vince Gilligan')._id,
  producer: producers.find(p => p.name === 'Sony Pictures')._id,
  type: types.find(t => t.name === 'Serie')._id,
});



await insertMedia({
  serial: 'SER0003',
  title: 'Game of Thrones',
  synopsis: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
  url: 'https://www.youtube.com/watch?v=KPLWWIOCOOQ',
  image: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/gotposterbig.png',
  releaseYear: 2011,
  genre: genres.find(g => g.name === 'Fantasy')._id,
  director: directors.find(d => d.name === 'David Benioff')._id,
  producer: producers.find(p => p.name === 'HBO')._id,
  type: types.find(t => t.name === 'Serie')._id,
});

await insertMedia({
  serial: 'MOV0002',
  title: 'Interstellar',
  synopsis: 'A group of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
  url: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
  image: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
  releaseYear: 2014,
  genre: genres.find(g => g.name === 'Sci-Fi')._id,
  director: directors.find(d => d.name === 'Christopher Nolan')._id,
  producer: producers.find(p => p.name === 'Warner Bros.')._id,
  type: types.find(t => t.name === 'Movie')._id,
});

await insertMedia({
  serial: 'MOV0003',
  title: 'The Matrix',
  synopsis: 'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
  url: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
  image: 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg',
  releaseYear: 1999,
  genre: genres.find(g => g.name === 'Sci-Fi')._id,
  director: directors.find(d => d.name === 'Lana Wachowski')._id,
  producer: producers.find(p => p.name === 'Warner Bros.')._id,
  type: types.find(t => t.name === 'Movie')._id,
});



await insertMedia({
  serial: 'MOV0005',
  title: 'Gladiator',
  synopsis: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
  url: 'https://www.youtube.com/watch?v=owK1qxDselE',
  image: 'https://www.moxiecinema.com/uploads/films/_cover/Gladiator-poster.jpg',
  releaseYear: 2000,
  genre: genres.find(g => g.name === 'Drama')._id,
  director: directors.find(d => d.name === 'Ridley Scott')._id,
  producer: producers.find(p => p.name === 'Universal Pictures')._id,
  type: types.find(t => t.name === 'Movie')._id,
});

await insertMedia({
  serial: 'MOV0006',
  title: 'The Social Network',
  synopsis: 'The story of the founders of the social-networking website Facebook and the legal battles that followed its success.',
  url: 'https://www.youtube.com/watch?v=lB95KLmpLR4',
  image: 'https://m.media-amazon.com/images/S/pv-target-images/ea4f1c75ddd9fd937a77875d48f9ce8225ed954afcefabe7a2195311b1a97ddd.jpg',
  releaseYear: 2010,
  genre: genres.find(g => g.name === 'Drama')._id,
  director: directors.find(d => d.name === 'David Fincher')._id,
  producer: producers.find(p => p.name === 'Sony Pictures')._id,
  type: types.find(t => t.name === 'Movie')._id,
});






    console.log('Finished seeding');
    process.exit();
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
