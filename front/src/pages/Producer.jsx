import { useEffect, useState } from 'react';
import axios from 'axios';
import './Producer.css';

function Producer() {
  const [producers, setProducers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', slogan: '', descripcion: '', status: 'Inactive' });

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/api/producers`)
      .then(res => setProducers(res.data))
      .catch(err => console.error('Error loading producers:', err));
  }, []);

  const handleEdit = (producer) => {
    setEditId(producer._id);
    setEditForm({
      nombre: producer.name,
      slogan: producer.slogan || '',
      descripcion: producer.description || '',
      status: producer.status
    });
  };

  const handleChange = (e) => {
    setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (id) => {
    axios.put(`${API_BASE}/api/producers/${id}`, editForm)
      .then(res => {
        alert('✅ Productor actualizado');
        setProducers(prev => prev.map(p => (p._id === id ? res.data : p)));
        setEditId(null);
      })
      .catch(err => {
        console.error('Error al actualizar productor', err);
        alert('❌ Error al actualizar productor');
      });
  };

  return (
    <div className="producer-container">
      <h1>🎥 Productores</h1>
      <hr />

      <div className="producer-grid">
        {producers.map(producer => (
          <div key={producer._id} className="producer-card">
            {editId === producer._id ? (
              <>
                <input
                  type="text"
                  name="nombre"
                  value={editForm.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="slogan"
                  value={editForm.slogan}
                  onChange={handleChange}
                  placeholder="Slogan"
                />
                <textarea
                  name="descripcion"
                  value={editForm.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción"
                  rows={3}
                />
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleChange}
                >
                  <option value="Active">Activo</option>
                  <option value="Inactive">Inactivo</option>
                </select>
                <button onClick={() => handleUpdate(producer._id)}>💾 Guardar</button>
                <button onClick={() => setEditId(null)} style={{ marginLeft: '1rem' }}>❌ Cancelar</button>
              </>
            ) : (
              <>
                <h3>{producer.name}</h3>
                <p><strong>Slogan:</strong> {producer.slogan || '—'}</p>
                <p><strong>Descripción:</strong> {producer.description || '—'}</p>
                <button onClick={() => handleEdit(producer)}>✏️ Actualizar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Producer;
