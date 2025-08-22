import TaskList from "../components/TaskList";

export default function Dashboard() {
  return (
    <section style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <p style={{ color: "#6b7280", marginBottom: 12 }}>
        Manage your tasks below.
      </p>
      <TaskList />
    </section>
  );
}
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTask, deleteTask } from '../redux/actions';
// import TaskList from '../components/TaskList';

// export default function Dashboard() {
//   const [text, setText] = useState('');
//   const tasks = useSelector((s) => s.tasks.items);
//   const dispatch = useDispatch();

//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     dispatch(addTask(text.trim()));
//     setText('');
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteTask(id));
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Dashboard</h1>
//       <form onSubmit={handleAdd} style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Enter a task"
//           aria-label="New Task"
//         />
//         <button type="submit">Add Task</button>
//       </form>
//       <TaskList tasks={tasks} onDelete={handleDelete} />
//     </div>
//   );
// }
