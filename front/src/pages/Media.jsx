import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Media.css';

function Media() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    axios.get('http://localhost:5000/api/media')
      .then(response => {
        setMedias(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching media:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`¿Eliminar "${title}"?`)) {
      axios.delete(`http://localhost:5000/api/media/${id}`)
        .then(() => {
          setMedias(prev => prev.filter(m => m._id !== id));
          alert('✅ Media eliminada');
        })
        .catch(err => {
          console.error('Error al eliminar media:', err);
          alert('❌ Error al eliminar');
        });
    }
  };

  if (loading) return <p>Loading media...</p>;

  return (
    <div className="media-container">
      <div className="media-header">
        <h1 className="media-title">🍿 Media</h1>
        <Link to="/media/new">
          <button className="media-create-btn">➕ Crear Media</button>
        </Link>
      </div>
      <hr />

      {medias.length === 0 ? (
        <p>No media found</p>
      ) : (
        <div className="media-grid">
          {medias.map(media => (
            <div key={media._id} className="media-card">
              <img src={media.image} alt={media.title} className="media-img" />
              <div className="media-info">
                <h3>{media.title} <span className="media-year">({media.releaseYear})</span></h3>
                <p><strong>🎟️ Serial:</strong> {media.serial}</p>
                <p className="media-synopsis">{media.synopsis}</p>

                <div className="media-card-actions">
                  <Link to={`/media/edit/${media._id}`}>
                    <button className="edit-btn">🖊️ Editar</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(media._id, media.title)}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Media;
