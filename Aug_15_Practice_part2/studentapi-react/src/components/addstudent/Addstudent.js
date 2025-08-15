import React, { useState } from 'react';
import axios from 'axios';

const Addstudent = () => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await await axios.post(`https://localhost:7282/api/Students`, {
  name: newStudent.name,
  email: newStudent.email,
  phone: newStudent.phone,
  course: newStudent.course
});
;
      alert("Student added successfully!");
      setNewStudent({ name: '', email: '', phone: '', course: '' });
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Student</h2>
      <form onSubmit={addStudent} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newStudent.phone}
          onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={newStudent.course}
          onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
          required
        />
        <button type="submit" style={{ marginTop: '10px' }}>Add Student</button>
      </form>
    </div>
  );
};

export default Addstudent;
