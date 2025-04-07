import { useEffect, useState } from 'react';
import axios from 'axios';
import './Type.css';

const typeOptions = [
  "Serie", "Movie", "Show", 
  "Short Film", "Musical", 
  "Opera", "Cartoon", "Docuseries"
];

function Type() {
  const [types, setTypes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [newType, setNewType] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = () => {
    axios.get('http://localhost:5000/api/types')
      .then(res => setTypes(res.data))
      .catch(err => console.error('Error fetching types:', err));
  };

  const handleEdit = (type) => {
    setEditId(type._id);
    setFormData({ name: type.name, description: type.description });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:5000/api/types/${id}`, formData)
      .then(() => {
        fetchTypes();
        setEditId(null);
      })
      .catch(err => {
        console.error('Error updating type:', err);
        alert('❌ Error al actualizar el tipo');
      });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/types', newType)
      .then(() => {
        fetchTypes();
        setNewType({ name: '', description: '' });
      })
      .catch(err => {
        console.error('Error creating type:', err);
        alert('❌ Error al crear tipo');
      });
  };

  return (
    <div className="type-container">
      <h1>🎞️ Content Types</h1>
      <hr />

      <form className="type-form" onSubmit={handleCreate}>
        <h3>➕ New Type</h3>

        <select
          name="name"
          value={newType.name}
          onChange={e => setNewType({ ...newType, name: e.target.value })}
          required
        >
          <option value="">Select a type</option>
          {typeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={newType.description}
          onChange={e => setNewType({ ...newType, description: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>

      <div className="type-grid">
        {types.map(t => (
          <div key={t._id} className="type-card">
            {editId === t._id ? (
              <>
                <select
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                >
                  {typeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <button onClick={() => handleUpdate(t._id)}>💾 Save</button>
                <button onClick={() => setEditId(null)}>❌ Cancel</button>
              </>
            ) : (
              <>
                <h2>{t.name}</h2>
                <p>{t.description || 'No description'}</p>
                <button onClick={() => handleEdit(t)}>✏️ Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Type;
