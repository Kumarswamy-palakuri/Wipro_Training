import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowStudent = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`https://localhost:7282/api/Students`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data.map((d) => (
        <div key={d.id}>
          <h4>{d.id}</h4>
          <p>{d.name}</p>
          <p>{d.email}</p>
          <p>{d.phone}</p>
          <h4>{d.course}</h4>
        </div>
      ))}
    </div>
  );
};

export default ShowStudent;
