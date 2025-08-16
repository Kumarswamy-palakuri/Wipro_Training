// import React, { useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// const CustomerAuth = () => {
//   const [loginData, setLoginData] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         "https://localhost:7012/api/Customers/authenticate",
//         JSON.stringify({
//           CustUserName: loginData.username,
//           CustPassword: loginData.password
//         }), // send JSON explicitly
//         {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }
// ``````Navigate("/show"); 
//       );
//       // Navigate("/show"); 
//     } catch (err) {
//       setMessage("Invalid username or password");
//     }
//   };

//   return (
//     <div>
//       <h2>Customer Login</h2>
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={loginData.username}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={loginData.password}
//         onChange={handleChange}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default CustomerAuth;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const CustomerAuth = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://localhost:7012/api/Customers/authenticate",
        {
          custUserName: loginData.username,
          custPassword: loginData.password
        }
      );
      console.log("Login Success:", res.data);

      // Redirect on success
      //  navigate("/search-by-un", { state: { custUserName: loginData.username } });
      navigate(`/searchbyun/${loginData.username}`);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage("Invalid username or password");
    }
  };

  return (
    <div>
       {/* <Menu /> */}
      <h2>Customer Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={loginData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default CustomerAuth;
