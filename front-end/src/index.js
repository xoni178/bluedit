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
  UserCommentsPage,
  UserUpvotesPage,
} from "./components/pages";

import NotFound from "./components/exceptions/NotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DataContext } from "./api/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:username" element={<UserPage />} />
        <Route
          path="/users/:username/comments"
          element={<UserCommentsPage />}
        />
        <Route path="/users/:username/upvotes" element={<UserUpvotesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/*" element={<PostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/r/:community" element={<CommunityPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </DataContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
