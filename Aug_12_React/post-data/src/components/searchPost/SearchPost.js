import React, {Component} from 'react';
import { useEffect, useState } from "react";

const SearchPost = () => {
const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      setData([]);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${search}`)
      .then(res => res.json())
      .then(json => setData(json.id ? [json] : [])) 
      .catch(() => setData([]));
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      

      {data.length > 0 && (
        <table border="1" align='center' width="70%">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th></tr>
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
      )}
    </div>
  );
};

export default SearchPost;
