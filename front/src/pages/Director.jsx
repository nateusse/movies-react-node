import { useEffect, useState } from 'react';
import axios from 'axios';
import './Director.css';

function Director() {
  const [directors, setDirectors] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'Inactive' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/directors')
      .then(res => setDirectors(res.data))
      .catch(err => console.error('Error cargando directores', err));
  }, []);

  const handleEdit = (director) => {
    setEditId(director._id);
    setFormData({
      name: director.name,
      status: director.status
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/directors/${id}`, formData)
      .then(res => {
        alert('✅ Director actualizado');
        setDirectors(prev => prev.map(d => (d._id === id ? res.data : d)));
        setEditId(null);
      })
      .catch(err => {
        console.error('Error actualizando director', err);
        alert('❌ Error al actualizar director');
      });
  };

  return (
    <div className="director-container">
      <h1>🎬 Directores</h1>
      <hr />

      <div className="director-grid">
        {directors.map((director) => (
          <div key={director._id} className="director-card">
            {editId === director._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Activo</option>
                  <option value="Inactive">Inactivo</option>
                </select>
                <button onClick={() => handleUpdate(director._id)}>💾 Guardar</button>
                <button onClick={() => setEditId(null)} style={{ marginLeft: '1rem' }}>❌ Cancelar</button>
              </>
            ) : (
              <>
                <h3>🎬 {director.name}</h3>
                <p><strong>Estado:</strong> {director.status}</p>
                <button onClick={() => handleEdit(director)}>✏️ Editar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Director;
