import { useState } from "react";
import ProtectedService from "../Services/ProtectedService";
const Protected = () => {
  const [cars, setCars] = useState([]);
  const protectedService = ProtectedService();

  const show = async () => {
    try {
      const response = await protectedService.adminDashBoard(); 
      setCars(response.data); // ✅ use response.data if Axios
    } catch (error) {
      console.error("Error fetching cars", error);
    }
  };

  return (
    <div>
      <table border="3" align="center">
        <thead>
          <tr>
            <th>Vehicle Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Daily Rate</th>
            <th>Status</th>
            <th>Passenger Capacity</th>
            <th>Engine Capacity</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((item) => (
            <tr key={item.vehicleId}>
              <td>{item.vehicleId}</td>
               <td>{item.make}</td>
                  <td>{item.model}</td>
                   <td>{item.year}</td>
                      <td>{item.dailyRate}</td>
               <td>{item.status}</td>
              <td>{item.passengerCapacity}</td>
              <td>{item.engineCapacity}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
      <input type="button" value="Show Protected" onClick={show} /> <br /><br />
    </div>
  );
};

export default Protected;