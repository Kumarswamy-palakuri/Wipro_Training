export default function TaskItem({ task, onDelete }) {
  return (
    <li style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 10
    }}>
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)} className="btn-small">Delete</button>
      <style>{`
        .btn-small { padding: 6px 10px; border-radius: 8px; border: 1px solid #111; background:#fff; }
        .btn-small:hover { background:#111; color:#fff; }
      `}</style>
    </li>
  );
}
// import React from 'react';

// export default function TaskItem({ task, onDelete }) {
//   return (
//     <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
//       <span>{task.text}</span>
//       <button onClick={() => onDelete(task.id)} aria-label={`Delete ${task.text}`}>Delete</button>
//     </li>
//   );
// }
