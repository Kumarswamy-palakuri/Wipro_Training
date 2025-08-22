import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }){
  const username = useSelector(s => s.user.username);
  const location = useLocation();
  if(!username){
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}