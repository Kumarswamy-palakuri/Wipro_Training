import logo from './logo.svg';
import './App.css';
import Counter from './components/CuseState'
import DataFetcher from './components/CuseEffect';
import ProductList from './components/CuseMemo';
import ThemedButton from './components/CuseContext';

function App() {
  return (
    <div className="App">
      <Counter/>
      <hr/>
      {/* <ProductList/> */}
      <hr/>
{/* <ThemedButton/> */}
<TodoList/>
    </div>
  );
}

export default App;
