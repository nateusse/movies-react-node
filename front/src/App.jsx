import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Media from './pages/Media';
import './App.css';
import Director from './pages/Director';
import Producer from './pages/Producer';
import Genre from './pages/Genre';
import Type from './pages/Type';
import NewMedia from './pages/NewMedia';
import EditMedia from './pages/EditMedia';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
    
        <div className="navbar-logo">CUEVANA</div>
        <div className="navbar-links">
        <Link to="/">🏠 Home</Link>{' '}
        <Link to="/media"> 🍿Media</Link>
        <Link to="/Director">🎬 Director</Link>
        <Link to="/Producer">📽️ Producers</Link>
        <Link to="/Genre">🎭 Genre</Link>
        <Link to="/Type">🎞️ Type</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<Media />} />
        <Route path="/director" element={<Director />} />
        <Route path="/producer" element={<Producer />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/directors/new" element={<Director />} />
        <Route path="/type" element={<Type />} />
        <Route path="/media/new" element={<NewMedia />} />
        <Route path="/media/edit/:id" element={<EditMedia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

