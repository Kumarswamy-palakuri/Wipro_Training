import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import styled, { ThemeProvider } from "styled-components";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

// themes
const light = { bg:"#f5f7fb", card:"#fff", text:"#222", sub:"#555", border:"#e6e9ef", primary:"#2563eb", danger:"#dc2626" };
const dark  = { bg:"#0f172a", card:"#111827", text:"#e5e7eb", sub:"#9ca3af", border:"#1f2937", primary:"#60a5fa", danger:"#f87171" };

const Page = styled.div`
  min-height:100vh; background:${p=>p.theme.bg}; color:${p=>p.theme.text};
  padding:16px; font-family: system-ui, Arial, sans-serif;
`;
const Card = styled.div`
  background:${p=>p.theme.card}; border:1px solid ${p=>p.theme.border};
  border-radius:12px; padding:12px; margin-bottom:12px;
`;
const Row = styled.div` display:flex; gap:10px; align-items:center; `;
const Input = styled.input`
  padding:8px 10px; border:1px solid ${p=>p.theme.border};
  border-radius:8px; background:${p=>p.theme.card}; color:${p=>p.theme.text}; flex:1;
`;
const TextArea = styled.textarea`
  padding:8px 10px; border:1px solid ${p=>p.theme.border};
  border-radius:8px; background:${p=>p.theme.card}; color:${p=>p.theme.text};
`;
const Select = styled.select`
  padding:8px 10px; border:1px solid ${p=>p.theme.border};
  border-radius:8px; background:${p=>p.theme.card}; color:${p=>p.theme.text};
`;
const Button = styled.button`
  padding:8px 12px; border:none; border-radius:8px; cursor:pointer; color:#fff;
  background:${p=>p.color||p.theme.primary};
`;
const Table = styled.table`
  width:100%; border-collapse:collapse;
  th, td { border:1px solid ${p=>p.theme.border}; padding:10px; vertical-align:top; }
  thead { background:${p=>p.theme.bg}; }
`;

export default function App(){
  // theme + “logged in” user (for notifications)
  const [theme, setTheme] = useState("light");
  const themeObj = theme==="light" ? light : dark;
  const users = useMemo(()=>["Alice","Bob","Charlie","Diana"],[]);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [role, setRole] = useState("member"); // "member" or "admin"

  // tasks
  const [tasks, setTasks] = useState([]);

  // form (controlled)
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("todo");

  // notifications
  const [toasts, setToasts] = useState([]);

  // Socket listeners
  useEffect(()=>{
    const onLoad = (list)=> setTasks(list);
    const onAdded = (task)=> setTasks(prev=> [...prev, task]);
    const onUpdated = (task)=> setTasks(prev=> prev.map(t=> t.id===task.id ? task : t));
    const onDeleted = (id)=> setTasks(prev=> prev.filter(t=> t.id!==id));
    const onNotify = (n)=> { if(n?.to === currentUser) setToasts(prev=> [{id:Date.now(), ...n}, ...prev]); };

    socket.on("loadTasks", onLoad);
    socket.on("taskAdded", onAdded);
    socket.on("taskUpdated", onUpdated);
    socket.on("taskDeleted", onDeleted);
    socket.on("userNotified", onNotify);

    return ()=>{
      socket.off("loadTasks", onLoad);
      socket.off("taskAdded", onAdded);
      socket.off("taskUpdated", onUpdated);
      socket.off("taskDeleted", onDeleted);
      socket.off("userNotified", onNotify);
    };
  },[currentUser]);

  // create or update
  const submit = (e)=>{
    e.preventDefault();
    if(!title.trim()) return;

    const payload = { id: editingId, title, description, deadline, assignee, status };

    if(editingId){
      // member can only edit own tasks; admin can edit any
      const t = tasks.find(x=>x.id===editingId);
      if(role==="member" && t && t.assignee && t.assignee !== currentUser){
        alert("You can only edit your own assigned tasks.");
        return;
      }
      socket.emit("updateTask", payload);
    }else{
      // create
      socket.emit("addTask", payload);
    }
    clearForm();
  };

  const clearForm = ()=>{
    setEditingId(null); setTitle(""); setDescription(""); setDeadline(""); setAssignee(""); setStatus("todo");
  };

  const startEdit = (t)=>{
    // member can only edit own tasks; admin can edit any
    if(role==="member" && t.assignee && t.assignee !== currentUser){
      alert("You can only edit your own assigned tasks.");
      return;
    }
    setEditingId(t.id);
    setTitle(t.title||"");
    setDescription(t.description||"");
    setDeadline(t.deadline||"");
    setAssignee(t.assignee||"");
    setStatus(t.status||"todo");
  };

  const del = (id)=>{
    const t = tasks.find(x=>x.id===id);
    if(role==="member" && t?.assignee && t.assignee !== currentUser){
      alert("You can only delete your own assigned tasks.");
      return;
    }
    if(window.confirm("Delete this task?")) socket.emit("deleteTask", id);
  };

  return (
    <ThemeProvider theme={themeObj}>
      <Page>
        {/* Header: role, user, theme */}
        <div style={{display:"flex", gap:8, alignItems:"center", marginBottom:12}}>
          <h2 style={{margin:0}}>Real-time Task Dashboard</h2>
          <div style={{marginLeft:"auto", display:"flex", gap:8}}>
            <Select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="member">Team Member</option>
              <option value="admin">Admin</option>
            </Select>
            <Select value={currentUser} onChange={(e)=>setCurrentUser(e.target.value)}>
              {users.map(u=><option key={u} value={u}>{u}</option>)}
            </Select>
            <Button color="transparent" style={{color:themeObj.text, border:`1px solid ${themeObj.border}`, background:"transparent"}}
              onClick={()=>setTheme(t=> t==="light"?"dark":"light")}>
              {theme==="light" ? "🌙 Dark" : "☀️ Light"}
            </Button>
          </div>
        </div>

        {/* Form (controlled components) */}
        <Card>
          <form onSubmit={submit} style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <Input placeholder="Title *" value={title} onChange={e=>setTitle(e.target.value)} />
            <Input placeholder="Deadline (YYYY-MM-DD)" value={deadline} onChange={e=>setDeadline(e.target.value)} />
            <TextArea rows={3} placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{gridColumn:"1 / -1"}}/>
            <Select value={assignee} onChange={e=>setAssignee(e.target.value)}>
              <option value="">-- Assign to --</option>
              {users.map(u=><option key={u} value={u}>{u}</option>)}
            </Select>
            <Select value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </Select>
            <div style={{gridColumn:"1 / -1", display:"flex", gap:8}}>
              <Button type="submit">{editingId ? "Update Task" : "Add Task"}</Button>
              {editingId && <Button type="button" color={themeObj.danger} onClick={clearForm}>Cancel</Button>}
            </div>
          </form>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <thead>
              <tr>
                <th>Title</th><th>Assignee</th><th>Deadline</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length===0 && (
                <tr><td colSpan={5} style={{textAlign:"center", color:themeObj.sub}}>No tasks yet.</td></tr>
              )}
              {tasks.map((t,i)=>(
                <tr key={t.id} style={{background: i%2? "transparent":"rgba(0,0,0,0.04)"}}>
                  <td>
                    <div style={{fontWeight:600}}>{t.title}</div>
                    {t.description && <div style={{fontSize:12, color:themeObj.sub}}>{t.description}</div>}
                  </td>
                  <td>{t.assignee || "-"}</td>
                  <td>{t.deadline || "-"}</td>
                  <td>{t.status}</td>
                  <td>
                    <Button style={{marginRight:8}} onClick={()=>startEdit(t)}>Edit</Button>
                    <Button color={themeObj.danger} onClick={()=>del(t.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        {/* Notifications */}
        <div style={{position:"fixed", right:16, bottom:16, display:"flex", flexDirection:"column", gap:8, maxWidth:360}}>
          {toasts.map(n=>(
            <div key={n.id} style={{background:"rgba(0,0,0,0.85)", color:"#fff", padding:"10px 12px", borderRadius:8}}>
              <strong>{n.title}</strong>
              <div style={{opacity:0.9}}>{n.message}</div>
            </div>
          ))}
          {toasts.length>0 && (
            <button onClick={()=>setToasts([])} style={{marginTop:6, padding:"6px 10px", borderRadius:6, border:"none", cursor:"pointer"}}>
              Clear
            </button>
          )}
        </div>
      </Page>
    </ThemeProvider>
  );
}
