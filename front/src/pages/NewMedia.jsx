import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Media.css';
import './NewMedia.css'; 

function NewMedia() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serial: '',
    title: '',
    synopsis: '',
    url: '',
    image: '',
    releaseYear: '',
    genreName: '',
    directorName: '',
    producerName: '',
    typeName: ''
  });

  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/genres').then(res => setGenres(res.data)).catch(err => console.error(err));
    axios.get('http://localhost:5000/api/directors').then(res => setDirectors(res.data)).catch(err => console.error(err));
    axios.get('http://localhost:5000/api/producers').then(res => setProducers(res.data)).catch(err => console.error(err));
    axios.get('http://localhost:5000/api/types').then(res => setTypes(res.data)).catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/media', formData)
      .then(() => {
        alert('✅ Media creada exitosamente');
        navigate('/media');
      })
      .catch(err => {
        console.error(err);
        alert('❌ Error al crear media');
      });
  };

  return (
    <div className="media-container">
      <h1 className="media-title">➕ Nueva Media</h1>
      <hr />
      <form onSubmit={handleSubmit} className="media-form">
        <input name="serial" placeholder="Serial" required onChange={handleChange} />
        <input name="title" placeholder="Título" required onChange={handleChange} />
        <textarea name="synopsis" placeholder="Sinopsis" required onChange={handleChange} />
        <input name="url" placeholder="URL del video" required onChange={handleChange} />
        <input name="image" placeholder="URL de la imagen" required onChange={handleChange} />
        <input name="releaseYear" type="number" placeholder="Año de estreno" required onChange={handleChange} />

        <select name="genreName" required onChange={handleChange}>
          <option value="">Selecciona un género</option>
          {genres.map(g => (
            <option key={g._id} value={g.name}>{g.name}</option>
          ))}
        </select>

        <select name="directorName" required onChange={handleChange}>
          <option value="">Selecciona un director</option>
          {directors.map(d => (
            <option key={d._id} value={d.name}>{d.name}</option>
          ))}
        </select>

        <select name="producerName" required onChange={handleChange}>
          <option value="">Selecciona un productor</option>
          {producers.map(p => (
            <option key={p._id} value={p.name}>{p.name}</option>
          ))}
        </select>

        <select name="typeName" required onChange={handleChange}>
          <option value="">Selecciona un tipo</option>
          {types.map(t => (
            <option key={t._id} value={t.name}>{t.name}</option>
          ))}
        </select>

        <div className="modal-actions">
          <button type="submit">Crear</button>
          <button type="button" onClick={() => navigate('/media')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default NewMedia;
