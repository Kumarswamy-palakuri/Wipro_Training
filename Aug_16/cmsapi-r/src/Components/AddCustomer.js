import React, { useState } from "react";
import axios from "axios";
import Menu from "./Menu";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    custId: 0,
    custName: "",
    custUserName: "",
    custPassword: "",
    city: "",
    state: "",
    email: "",
    mobileNo: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.custName ||
      !formData.custUserName ||
      !formData.custPassword ||
      !formData.city ||
      !formData.state ||
      !formData.email ||
      !formData.mobileNo
    ) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        "https://localhost:7012/api/Customers/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      setMessage(res.data.message);
      setFormData({
        custId: 0,
        custName: "",
        custUserName: "",
        custPassword: "",
        city: "",
        state: "",
        email: "",
        mobileNo: ""
      });
    } catch (err) {
      if (err.response) {
        setMessage(`Error: ${err.response.data}`);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div>
       <Menu />
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="custName"
          placeholder="Name"
          value={formData.custName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="custUserName"
          placeholder="Username"
          value={formData.custUserName}
          onChange={handleChange}
        />
        <input
          type="password"
          name="custPassword"
          placeholder="Password"
          value={formData.custPassword}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobileNo"
          placeholder="Mobile Number"
          value={formData.mobileNo}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddCustomer;
