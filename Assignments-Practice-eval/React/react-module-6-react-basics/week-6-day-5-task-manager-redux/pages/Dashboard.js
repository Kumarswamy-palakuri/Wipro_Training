import React from "react";
import TaskList from "../components/TaskList";

export default function Dashboard(){
  return (
    <div>
      <h2 style={{marginBottom:12}}>Dashboard</h2>
      <TaskList />
    </div>
  );
}