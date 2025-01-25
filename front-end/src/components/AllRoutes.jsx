import { useEffect, useState } from "react";
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
} from "./pages";

import NotFound from "./exceptions/NotFound";
import ProtectedRoute from "./ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useBlueditDataContext } from "../api/DataContext";

const AllRoutes = () => {
  const { authUser, SetAuthUser } = useBlueditDataContext();
  const [isAuthorized, SetIsAuthorized] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      SetAuthUser(JSON.parse(localStorage.getItem("authUser")));
      SetIsAuthorized(true);
    } else {
      SetIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) {
    return null;
  }

  return (
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
        <Route
          path="/create"
          element={
            <ProtectedRoute isAuthorized={isAuthorized}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route path="/r/:community" element={<CommunityPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
