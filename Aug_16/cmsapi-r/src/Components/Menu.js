import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav style={{ margin: "20px", fontSize: "18px" }}>
      <Link to="/add">Add Customer</Link> |{" "}
      <Link to="/search-by-id">Search By ID</Link> |{" "}
      {/* <Link to="/search-by-un">Search By Username</Link> | */}
      <Link to="/show">Show Customers</Link> |{" "}
      <Link to="/">Log-out</Link>
    </nav>
  );
}

export default Menu;
