import logo from './logo.svg';
import './App.css';
import First from './components/first/first';
import Second from './components/second/second';
import Third from './components/third/third';
import ButtonEx from './components/buttonex/buttonex';
import Four from './components/four/four';
import Five from './components/five/five';
import Six from './components/six/six';
import Seven from './components/seven/seven';
import Eight from './components/eight/eight';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/menu/menu';
import Login from './components/login/login';

function App() {
  return (
    <div className="App">
      <p>Welcome to React Programming...From Wipro</p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path='/first' element={<First />} />
          <Route path='/second' element={<Second />} />
          <Route path='/third' element={<Third firstName="Prasanna" lastName="Pappu" company="Wipro" />} />
          <Route path='/four' element={<Four />} />
          <Route path='/five' element={<Five />} />
          <Route path='/six' element={<Six />} />
          <Route path='/seven' element={<Seven />} />
          <Route path='/eight' element={<Eight />} />
          <Route path='/buttonex' element={<ButtonEx />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
