// import React, { useState } from "react";
// import axios from "axios";
// import Menu from "./Menu";

// const AddCustomer = () => {
//   const [formData, setFormData] = useState({
//     custId: 0,
//     custName: "",
//     custUserName: "",
//     custPassword: "",
//     city: "",
//     state: "",
//     email: "",
//     mobileNo: ""
//   });

//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.custName.trim()) newErrors.custName = "Name is required";
//     if (!formData.custUserName.trim()) newErrors.custUserName = "Username is required";
//     if (!formData.custPassword) newErrors.custPassword = "Password is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.state.trim()) newErrors.state = "State is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.mobileNo.trim()) {
//       newErrors.mobileNo = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobileNo)) {
//       newErrors.mobileNo = "Invalid mobile number (10 digits)";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       setMessage("Please fix the errors in the form");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "https://localhost:7012/api/Customers/add",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//           }
//         }
//       );

//       setMessage(res.data.message || "Customer added successfully!");
//       setFormData({
//         custId: 0,
//         custName: "",
//         custUserName: "",
//         custPassword: "",
//         city: "",
//         state: "",
//         email: "",
//         mobileNo: ""
//       });
//       setErrors({});
//     } catch (err) {
//       if (err.response) {
//         setMessage(`Error: ${err.response.data}`);
//       } else {
//         setMessage("Something went wrong. Please try again later.");
//       }
//     }
//   };

//   // Styling
//   const containerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//     backgroundColor: "#f5f5f5",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   };

//   const contentStyle = {
//     maxWidth: "500px",
//     width: "100%",
//     margin: "40px auto",
//     padding: "30px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   };

//   const headingStyle = {
//     textAlign: "center",
//     color: "#333",
//     marginBottom: "30px",
//     fontSize: "24px",
//     fontWeight: "600",
//   };

//   const formStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   };

//   const inputGroupStyle = {
//     display: "flex",
//     flexDirection: "column",
//   };

//   const labelStyle = {
//     marginBottom: "8px",
//     fontSize: "14px",
//     fontWeight: "500",
//     color: "#555",
//   };

//   const inputStyle = {
//     padding: "12px 15px",
//     borderRadius: "6px",
//     border: "1px solid #ddd",
//     fontSize: "16px",
//     transition: "all 0.3s",
//     outline: "none",
//   };

//   const errorInputStyle = {
//     ...inputStyle,
//     borderColor: "#e74c3c",
//   };

//   const errorTextStyle = {
//     color: "#e74c3c",
//     fontSize: "13px",
//     marginTop: "5px",
//   };

//   const rowStyle = {
//     display: "flex",
//     gap: "15px",
//   };

//   const columnStyle = {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//   };
//    const loginbox = {
//     textAlign:"center",
//     fontSize:"18px",
//     color:"#0e336dff"
//   };

//   const buttonStyle = {
//     padding: "14px 20px",
//     backgroundColor: "#3498db",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "16px",
//     fontWeight: "600",
//     transition: "background-color 0.3s",
//     marginTop: "10px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   };

//   const messageStyle = {
//     padding: "15px",
//     borderRadius: "6px",
//     marginTop: "20px",
//     textAlign: "center",
//     fontSize: "15px",
//   };

//   const successStyle = {
//     backgroundColor: "#d4f8e8",
//     color: "#27ae60",
//     border: "1px solid #2ecc71",
//   };

//   const errorStyle = {
//     backgroundColor: "#fadbd8",
//     color: "#c0392b",
//     border: "1px solid #e74c3c",
//   };

//   return (
//     <div style={containerStyle}>
//       {/* <Menu /> */}
//       <div style={contentStyle}>
//         <h2 style={headingStyle}>Add New Customer</h2>
        
//         <form onSubmit={handleSubmit} style={formStyle}>
//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>Full Name</label>
//             <input
//               style={errors.custName ? errorInputStyle : inputStyle}
//               type="text"
//               name="custName"
//               placeholder="Enter full name"
//               value={formData.custName}
//               onChange={handleChange}
//               onFocus={e => e.target.style.borderColor = "#3498db"}
//               onBlur={e => e.target.style.borderColor = errors.custName ? "#e74c3c" : "#ddd"}
//             />
//             {errors.custName && <span style={errorTextStyle}>{errors.custName}</span>}
//           </div>

//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>Username</label>
//             <input
//               style={errors.custUserName ? errorInputStyle : inputStyle}
//               type="text"
//               name="custUserName"
//               placeholder="Enter username"
//               value={formData.custUserName}
//               onChange={handleChange}
//               onFocus={e => e.target.style.borderColor = "#3498db"}
//               onBlur={e => e.target.style.borderColor = errors.custUserName ? "#e74c3c" : "#ddd"}
//             />
//             {errors.custUserName && <span style={errorTextStyle}>{errors.custUserName}</span>}
//           </div>

//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>Password</label>
//             <input
//               style={errors.custPassword ? errorInputStyle : inputStyle}
//               type="password"
//               name="custPassword"
//               placeholder="Enter password"
//               value={formData.custPassword}
//               onChange={handleChange}
//               onFocus={e => e.target.style.borderColor = "#3498db"}
//               onBlur={e => e.target.style.borderColor = errors.custPassword ? "#e74c3c" : "#ddd"}
//             />
//             {errors.custPassword && <span style={errorTextStyle}>{errors.custPassword}</span>}
//           </div>

//           <div style={rowStyle}>
//             <div style={columnStyle}>
//               <label style={labelStyle}>City</label>
//               <input
//                 style={errors.city ? errorInputStyle : inputStyle}
//                 type="text"
//                 name="city"
//                 placeholder="Enter city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 onFocus={e => e.target.style.borderColor = "#3498db"}
//                 onBlur={e => e.target.style.borderColor = errors.city ? "#e74c3c" : "#ddd"}
//               />
//               {errors.city && <span style={errorTextStyle}>{errors.city}</span>}
//             </div>
            
//             <div style={columnStyle}>
//               <label style={labelStyle}>State</label>
//               <input
//                 style={errors.state ? errorInputStyle : inputStyle}
//                 type="text"
//                 name="state"
//                 placeholder="Enter state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 onFocus={e => e.target.style.borderColor = "#3498db"}
//                 onBlur={e => e.target.style.borderColor = errors.state ? "#e74c3c" : "#ddd"}
//               />
//               {errors.state && <span style={errorTextStyle}>{errors.state}</span>}
//             </div>
//           </div>

//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>Email Address</label>
//             <input
//               style={errors.email ? errorInputStyle : inputStyle}
//               type="email"
//               name="email"
//               placeholder="Enter email address"
//               value={formData.email}
//               onChange={handleChange}
//               onFocus={e => e.target.style.borderColor = "#3498db"}
//               onBlur={e => e.target.style.borderColor = errors.email ? "#e74c3c" : "#ddd"}
//             />
//             {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
//           </div>

//           <div style={inputGroupStyle}>
//             <label style={labelStyle}>Mobile Number</label>
//             <input
//               style={errors.mobileNo ? errorInputStyle : inputStyle}
//               type="tel"
//               name="mobileNo"
//               placeholder="Enter mobile number"
//               value={formData.mobileNo}
//               onChange={handleChange}
//               onFocus={e => e.target.style.borderColor = "#3498db"}
//               onBlur={e => e.target.style.borderColor = errors.mobileNo ? "#e74c3c" : "#ddd"}
//             />
//             {errors.mobileNo && <span style={errorTextStyle}>{errors.mobileNo}</span>}
//           </div>

//           <button 
//             type="submit" 
//             style={buttonStyle}
//             onMouseOver={e => e.target.style.backgroundColor = "#2980b9"}
//             onMouseOut={e => e.target.style.backgroundColor = "#3498db"}
//           >
//             Add Customer
//           </button>
//         </form>
//         <a href="/" style={loginbox}>back to login?</a>
//         {message && (
//           <div style={{
//             ...messageStyle,
//             ...(message.includes("Error") || message.includes("required") ? errorStyle : successStyle)
//           }}>
//             {message}


//           </div>
          
//         )}
//       </div>
     
//     </div>
//   );
// };

// export default AddCustomer;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Navigate to login after successful submission
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.custName.trim()) newErrors.custName = "Name is required";
    if (!formData.custUserName.trim()) newErrors.custUserName = "Username is required";
    if (!formData.custPassword) newErrors.custPassword = "Password is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Invalid mobile number (10 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage("Please fix the errors in the form");
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

      setMessage("Customer added successfully!");
      setIsSuccess(true);
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
      setErrors({});
    } catch (err) {
      setIsSuccess(false);
      if (err.response) {
        setMessage(`Error: ${err.response.data}`);
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    }
  };

  // Simplified styling
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const contentStyle = {
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: "#e74c3c",
  };

  const errorTextStyle = {
    color: "#e74c3c",
    fontSize: "0.9em",
    marginTop: "5px",
  };

  const rowStyle = {
    display: "flex",
    gap: "10px",
  };

  const columnStyle = {
    flex: 1,
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em",
    marginTop: "10px",
  };

  const messageStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    textAlign: "center",
  };

  const successStyle = {
    backgroundColor: "#d4edda",
    color: "#155724",
  };

  const errorStyle = {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  };

  const loginLinkStyle = {
    display: "block",
    textAlign: "center",
    marginTop: "15px",
    color: "#007bff",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>Add New Customer</h2>
        
        {message && (
          <div style={{
            ...messageStyle,
            ...(isSuccess ? successStyle : errorStyle)
          }}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              style={errors.custName ? errorInputStyle : inputStyle}
              type="text"
              name="custName"
              placeholder="Enter full name"
              value={formData.custName}
              onChange={handleChange}
            />
            {errors.custName && <span style={errorTextStyle}>{errors.custName}</span>}
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Username</label>
            <input
              style={errors.custUserName ? errorInputStyle : inputStyle}
              type="text"
              name="custUserName"
              placeholder="Enter username"
              value={formData.custUserName}
              onChange={handleChange}
            />
            {errors.custUserName && <span style={errorTextStyle}>{errors.custUserName}</span>}
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              style={errors.custPassword ? errorInputStyle : inputStyle}
              type="password"
              name="custPassword"
              placeholder="Enter password"
              value={formData.custPassword}
              onChange={handleChange}
            />
            {errors.custPassword && <span style={errorTextStyle}>{errors.custPassword}</span>}
          </div>

          <div style={rowStyle}>
            <div style={columnStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>City</label>
                <input
                  style={errors.city ? errorInputStyle : inputStyle}
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span style={errorTextStyle}>{errors.city}</span>}
              </div>
            </div>
            
            <div style={columnStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>State</label>
                <input
                  style={errors.state ? errorInputStyle : inputStyle}
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <span style={errorTextStyle}>{errors.state}</span>}
              </div>
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              style={errors.email ? errorInputStyle : inputStyle}
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Mobile Number</label>
            <input
              style={errors.mobileNo ? errorInputStyle : inputStyle}
              type="tel"
              name="mobileNo"
              placeholder="Enter mobile number"
              value={formData.mobileNo}
              onChange={handleChange}
            />
            {errors.mobileNo && <span style={errorTextStyle}>{errors.mobileNo}</span>}
          </div>

          <button type="submit" style={buttonStyle}>
            Add Customer
          </button>
        </form>
        <a href="/" style={loginLinkStyle}>Back to login</a>
      </div>
    </div>
  );
};

export default AddCustomer;