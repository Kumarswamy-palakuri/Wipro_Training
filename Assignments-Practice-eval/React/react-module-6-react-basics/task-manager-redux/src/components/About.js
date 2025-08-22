// src/components/About.js
import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h1>About Task Manager</h1>
      <p>This is the About Page</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default About;
