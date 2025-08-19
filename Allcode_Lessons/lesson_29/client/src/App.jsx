import {Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Note from "./pages/Note";

function App() {
   
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createNote" element={<Note />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
