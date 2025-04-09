import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditMedia.css';

function EditMedia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});

  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/api/media/${id}`)
      .then(res => {
        setFormData(res.data);
        setOriginalData(res.data);
      })
      .catch(err => console.error('Error fetching media:', err));

    axios.get(`${API_BASE}/api/genres`).then(res => setGenres(res.data));
    axios.get(`${API_BASE}/api/directors`).then(res => setDirectors(res.data));
    axios.get(`${API_BASE}/api/producers`).then(res => setProducers(res.data));
    axios.get(`${API_BASE}/api/types`).then(res => setTypes(res.data));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const updates = {};
    for (const key in formData) {
      if (formData[key] !== originalData[key]) {
        updates[key] = formData[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      alert('No hiciste ningún cambio');
      return;
    }

    axios.put(`${API_BASE}/api/media/${id}`, updates)
      .then(() => {
        alert('✅ Media actualizada');
        navigate('/media');
      })
      .catch(err => {
        console.error(err);
        alert('❌ Error al actualizar media');
      });
  };

  return (
    <div className="edit-media-container">
      <h1 className="edit-title">🖊️ Editar Media</h1>
      <hr />
      <form onSubmit={handleSubmit} className="edit-form">
        <input name="serial" value={formData.serial || ''} placeholder="Serial" onChange={handleChange} />
        <input name="title" value={formData.title || ''} placeholder="Título" onChange={handleChange} />
        <textarea name="synopsis" value={formData.synopsis || ''} placeholder="Sinopsis" onChange={handleChange} />
        <input name="url" value={formData.url || ''} placeholder="URL del video" onChange={handleChange} />
        <input name="image" value={formData.image || ''} placeholder="URL de la imagen" onChange={handleChange} />
        <input name="releaseYear" type="number" value={formData.releaseYear || ''} placeholder="Año de estreno" onChange={handleChange} />

        <select name="genreName" value={formData.genreName || ''} onChange={handleChange}>
          <option value="">Selecciona un género</option>
          {genres.map(g => <option key={g._id} value={g.name}>{g.name}</option>)}
        </select>

        <select name="directorName" value={formData.directorName || ''} onChange={handleChange}>
          <option value="">Selecciona un director</option>
          {directors.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
        </select>

        <select name="producerName" value={formData.producerName || ''} onChange={handleChange}>
          <option value="">Selecciona un productor</option>
          {producers.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
        </select>

        <select name="typeName" value={formData.typeName || ''} onChange={handleChange}>
          <option value="">Selecciona un tipo</option>
          {types.map(t => <option key={t._id} value={t.name}>{t.name}</option>)}
        </select>

        <div className="edit-actions">
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => navigate('/media')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditMedia;
