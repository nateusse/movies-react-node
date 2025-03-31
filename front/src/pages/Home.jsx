import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏠 Bienvenida a tu app de películas</h1>
      
      <p>¿Quieres ver la lista de medios registrados?</p>

      <Link to="/media">
        <button>🎬 Ver Medios</button>
      </Link>
    </div>
  );
}

export default Home;
