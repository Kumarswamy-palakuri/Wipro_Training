import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShowStudent from './components/showstudent/ShowStudent';
import Addstudent from './components/addstudent/Addstudent';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Show Students</Link>
          <Link to="/add">Add Student</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<ShowStudent />} />
          <Route path="/add" element={<Addstudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
