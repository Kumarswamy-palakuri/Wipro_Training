import TaskItem from "./TaskItem";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTaskAsync } from "../redux/taskSlice";

export default function TaskList(){
  const tasks = useSelector(s => s.tasks);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    const t = title.trim();
    if(!t) return;
    await dispatch(addTaskAsync(t));
    setTitle("");
  };

  return (
    <div className="card">
      <h3>Tasks</h3>
      <div className="row" style={{marginTop:10}}>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task title" />
        <button className="button" onClick={handleAdd}>Add</button>
      </div>
      <div style={{display:'grid',gap:8,marginTop:12}}>
        {tasks.length === 0 ? (
          <div className="small">No tasks yet — add one!</div>
        ) : (
          tasks.map(t => <TaskItem key={t.id} task={t} />)
        )}
      </div>
    </div>
  );
}