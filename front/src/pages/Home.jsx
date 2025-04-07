import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Hola profe, bienvenido a Cuevana Legal</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
        Este es un sitio web de películas y series, desarrollado como trabajo final de la materia <strong>Desarrollo Web II</strong> 
        en la <strong>Institución Universitaria Digital de Antioquia</strong>.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <p>Explora las secciones disponibles:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/media" style={linkStyle}>🍿 Media</Link>
          <Link to="/director" style={linkStyle}>🎬 Director</Link>
          <Link to="/producer" style={linkStyle}>📽️ Producers</Link>
          <Link to="/genre" style={linkStyle}>🎭 Genres</Link>
          <Link to="/type" style={linkStyle}>🎞️ Types</Link>
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  backgroundColor: '#222',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

export default Home;
