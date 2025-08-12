import React from 'react';
import { useEffect, useState } from "react";

const Postshow10 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(json => setData(json.slice(0, 10))); // take only first 10
  }, []);

  return (
    <table border="1" align="center" width="70%">
      <thead>
        <tr><th>ID</th><th>Title</th><th>Body</th></tr>
      </thead>
      <tbody>
        {data.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.title}</td>
            <td>{u.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Postshow10;
