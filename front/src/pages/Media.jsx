// src/pages/Media.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Media() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/media')
      .then(response => {
        setMedias(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching media:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading media...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎬 Media List</h1>
      {medias.length === 0 ? (
        <p>No media found</p>
      ) : (
        <ul>
          {medias.map(media => (
            <li key={media._id} style={{ marginBottom: '1rem' }}>
              <strong>{media.title}</strong> ({media.releaseYear})<br />
              <em>{media.synopsis}</em><br />
              <small>Serial: {media.serial}</small><br />
              <img src={media.image} alt={media.title} width="150" />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Media;
