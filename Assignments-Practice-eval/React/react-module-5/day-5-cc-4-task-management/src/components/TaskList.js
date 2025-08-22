import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../redux/actions";
import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.tasks);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(addTask(title));
    if (!res.error) setTitle("");
  };

  const remove = (id) => dispatch(deleteTask(id));

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #d1d5db" }}
        />
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Working..." : "Add"}
        </button>
      </form>

      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

      <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
        {items.length === 0 && <li style={{ color: "#6b7280" }}>No tasks yet.</li>}
        {items.map((t) => <TaskItem key={t.id} task={t} onDelete={remove} />)}
      </ul>

      <style>{`
        .btn { padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background:#111; color:#fff; }
        .btn:disabled { opacity: .6; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
// import React from 'react';
// import TaskItem from './TaskItem';

// export default function TaskList({ tasks, onDelete }) {
//   if (!tasks.length) {
//     return <p>No tasks yet. Add one above.</p>;
//   }
//   return (
//     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//       {tasks.map((t) => (
//         <TaskItem key={t.id} task={t} onDelete={onDelete} />
//       ))}
//     </ul>
//   );
// }
