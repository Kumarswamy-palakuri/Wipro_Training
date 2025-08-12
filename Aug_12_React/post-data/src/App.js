import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Postshow from './components/postshow/Postshow';
import SearchPost from './components/searchPost/SearchPost';
import Postshow10 from './components/postshow/Postshow10';

function App() {
  return (
    <div className="App">
    <Router>
      <nav style={{ margin: "10px" }}>
        <Link to="/posts" style={{ marginRight: "10px" }}>First 10 Posts</Link>
        <Link to="/posts/all" style={{ marginRight: "10px" }}>All Posts</Link>
        <Link to="/posts/search/">Search ID</Link>
      </nav>

      <Routes>
        <Route path="/posts" element={<Postshow10 />} />
        <Route path="/posts/all" element={<Postshow />} />
        <Route path="/posts/search/" element={<SearchPost />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
