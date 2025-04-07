const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Producer = require('../models/Producer');
const Type = require('../models/Type');
const Media = require('../models/Media'); 

router.post('/', mediaController.createMedia);

router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
      .populate({
        path: 'genre',
        match: { status: 'Active' }
      })
      .populate({
        path: 'director',
        match: { status: 'Active' }
      })
      .populate({
        path: 'producer',
        match: { status: 'Active' }
      })
      .populate('type');

    
    const validMedias = medias.filter(media =>
      media.genre && media.director && media.producer
    );

    res.json(validMedias);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media', error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
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

    const updates = {
      updatedAt: new Date()
    };

    if (serial) updates.serial = serial;
    if (title) updates.title = title;
    if (synopsis) updates.synopsis = synopsis;
    if (url) updates.url = url;
    if (image) updates.image = image;
    if (releaseYear) updates.releaseYear = releaseYear;

    if (genreName) {
      const genre = await Genre.findOne({ name: genreName, status: 'Active' });
      if (!genre) return res.status(400).json({ message: `Genre '${genreName}' not found or inactive` });
      updates.genre = genre._id;
    }

    if (directorName) {
      const director = await Director.findOne({ name: directorName, status: 'Active' });
      if (!director) return res.status(400).json({ message: `Director '${directorName}' not found or inactive` });
      updates.director = director._id;
    }

    if (producerName) {
      const producer = await Producer.findOne({ name: producerName, status: 'Active' });
      if (!producer) return res.status(400).json({ message: `Producer '${producerName}' not found or inactive` });
      updates.producer = producer._id;
    }

    if (typeName) {
      const type = await Type.findOne({ name: typeName });
      if (!type) return res.status(400).json({ message: `Type '${typeName}' not found` });
      updates.type = type._id;
    }

    const updatedMedia = await Media.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedMedia) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json(updatedMedia);

  } catch (error) {
    console.error('Error updating media:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate field value', field: error.keyValue });
    }
    res.status(500).json({ message: 'Error updating media', error });
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedMedia = await Media.findByIdAndDelete(id);
  
      if (!deletedMedia) {
        return res.status(404).json({ message: 'Media not found' });
      }
  
      res.status(200).json({ message: 'Media deleted successfully', deletedMedia });
    } catch (error) {
      console.error('Error deleting media:', error);
      res.status(500).json({ message: 'Error deleting media', error });
    }
  });
  

module.exports = router;
