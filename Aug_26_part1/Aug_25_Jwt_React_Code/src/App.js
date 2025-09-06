import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import Protected from './components/Protected';

function App() {
  return (
    <div className="App">
      <Login /> <br/><hr/>
      <Protected />
    </div>
  );
}

export default App;
