import { useEffect, useState } from 'react';
import axios from 'axios';
import './Genre.css';

const emojiMap = {
  Action: "💥",
  Comedy: "😂",
  Drama: "🎭",
  Horror: "👻",
  Fantasy: "🧙‍♂️",
  SciFi: "🚀",
  Romance: "❤️",
  Adventure: "🗺️",
  Animation: "🎨",
  Mystery: "🕵️‍♂️",
  Thriller: "🔪",
  Default: "🎬"
};

function Genre() {
  const [genres, setGenres] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', status: 'Inactive', description: ''
  });

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/api/genres`)
      .then(res => setGenres(res.data))
      .catch(err => console.error('Error cargando géneros', err));
  }, []);

  const handleEdit = (genre) => {
    setEditId(genre._id);
    setFormData({
      name: genre.name,
      status: genre.status,
      description: genre.description || ''
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (id) => {
    axios.put(`${API_BASE}/api/genres/${id}`, formData)
      .then(res => {
        alert('✅ Género actualizado');
        setGenres(prev => prev.map(g => (g._id === id ? res.data : g)));
        setEditId(null);
      })
      .catch(err => {
        console.error('Error actualizando género', err);
        alert('❌ Error al actualizar género');
      });
  };

  const getEmoji = (name) => {
    return emojiMap[name] || emojiMap.Default;
  };

  return (
    <div className="genre-container">
      <h1>🎭 Géneros</h1>
      <hr />
      <div className="genre-grid">
        {genres.map((genre) => (
          <div key={genre._id} className="genre-card">
            {editId === genre._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Activo</option>
                  <option value="Inactive">Inactivo</option>
                </select>
                <button onClick={() => handleUpdate(genre._id)}>💾 Guardar</button>
                <button onClick={() => setEditId(null)} style={{ marginLeft: '1rem' }}>❌ Cancelar</button>
              </>
            ) : (
              <>
                <h3>{getEmoji(genre.name)} {genre.name}</h3>
                <p><strong>Descripción:</strong> {genre.description || '—'}</p>
                <p><strong>Estado:</strong> {genre.status}</p>
                <button onClick={() => handleEdit(genre)}>✏️ Editar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genre;
