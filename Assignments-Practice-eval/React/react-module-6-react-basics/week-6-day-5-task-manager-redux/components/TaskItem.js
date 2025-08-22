import React from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/taskSlice";

export default function TaskItem({ task }){
  const dispatch = useDispatch();
  const remove = () => dispatch(removeTask(task.id));
  return (
    <div className="task-item">
      <div>
        <div style={{fontWeight:600}}>{task.title}</div>
        <div className="small">{new Date(task.createdAt).toLocaleString()}</div>
      </div>
      <button onClick={remove} className="button" style={{background:'#ef4444'}}>Delete</button>
    </div>
  );
}