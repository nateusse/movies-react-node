const Media = require('../models/Media');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Producer = require('../models/Producer');
const Type = require('../models/Type');

exports.createMedia = async (req, res) => {
  try {
    console.log("🟢 Incoming media request:", req.body); 
    const {
      serial,
      title,
      synopsis,
      url,
      image,
      releaseYear,
      genreName,
      directorName,
      producerName,
      typeName
    } = req.body;

    

    const genre = await Genre.findOne({ name: genreName, status: 'Active' });
    const director = await Director.findOne({ name: directorName, status: 'Active' });
    const producer = await Producer.findOne({ name: producerName, status: 'Active' });
    const type = await Type.findOne({ name: typeName });

    if (!genre) return res.status(400).json({ message: `Genre '${genreName}' not found or inactive` });
    if (!director) return res.status(400).json({ message: `Director '${directorName}' not found or inactive` });
    if (!producer) return res.status(400).json({ message: `Producer '${producerName}' not found or inactive` });
    if (!type) return res.status(400).json({ message: `Type '${typeName}' not found` });

    if (!genre || !director || !producer || !type) {
      return res.status(400).json({
        message: 'Invalid or inactive reference: genre, director, producer, or type not found or inactive'
      });
    }

    const newMedia = new Media({
      serial,
      title,
      synopsis,
      url,
      image,
      releaseYear,
      genre: genre._id,
      director: director._id,
      producer: producer._id,
      type: type._id
    });

    const savedMedia = await newMedia.save();
    res.status(201).json(savedMedia);

  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
        return res.status(400).json({ message: 'Duplicate field value', field: error.keyValue });
    }
    res.status(500).json({ message: 'Error creating media', error });
  }
};
