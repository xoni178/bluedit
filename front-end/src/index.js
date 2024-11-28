import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
  UserPage,
  HomePage,
  LoginPage,
  PostPage,
  RegisterPage,
  CreatePostPage,
  CommunityPage,
} from "./components/pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DataContext } from "./api/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/*" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/*" element={<PostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/r/*" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  </DataContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
