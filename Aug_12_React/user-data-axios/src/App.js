import logo from './logo.svg';
import './App.css';
import UserShow from './components/usershow/usershow';
import EmployShow from './components/employshow/employshow';
import UserSearch from './components/usersearch/usersearch';
import EmploySearch from './components/employsearch/employsearch';

function App() {
  return (
    <div className="App">
      <UserShow /> <br/>
      <EmployShow /> <br/>
      <UserSearch /> <br/>
      <EmploySearch />
    </div>
  );
}

export default App;
