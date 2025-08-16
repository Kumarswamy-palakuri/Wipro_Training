import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCustomer from './Components/AddCustomer';
import CustomerAuth from './Components/CustomerAuth';
import Searchcusbyid from './Components/Searchcusbyid';
import Searchcusbyun from './Components/Searchcusbyun';
import ShowCustomers from './Components/ShowCustomers';
import Menu from './Components/Menu';  // ✅ Import Menu

function App() {
  return (
    <BrowserRouter>
      <div className="App">    
        {/* <Menu /> */}
        <Routes>
          <Route path="/add" element={<AddCustomer />} />
          <Route path="/" element={<CustomerAuth />} />
          <Route path="/search-by-id" element={<Searchcusbyid />} />
          {/* <Route path="/search-by-un" element={<Searchcusbyun />} /> */}
          <Route path="/searchbyun/:username" element={<Searchcusbyun />} />
          <Route path="/show" element={<ShowCustomers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
