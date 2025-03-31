import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Media from './pages/Media';

function App() {
  return (
    <BrowserRouter>

      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/">🏠 Home</Link> |{' '}
        <Link to="/media">🎬 Media</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

