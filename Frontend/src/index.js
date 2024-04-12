import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./admin";
import Login from "./Login";
import Profile from "./Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  </BrowserRouter>
);
