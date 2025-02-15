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
  CreateCommunityPage,
} from "./pages";

import App from "../App";

import NotFound from "./exceptions/NotFound";
import ProtectedRoute from "./ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useBlueditDataContext } from "../api/DataContext";

const AllRoutes = () => {
  const { SetAuthUser } = useBlueditDataContext();
  const [isAuthorized, SetIsAuthorized] = useState(null);

  useEffect(() => {
    if (localStorage.hasOwnProperty("authUser")) {
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
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route
            path="/users/:username/comments"
            element={<UserCommentsPage />}
          />
          <Route
            path="/users/:username/upvotes"
            element={<UserUpvotesPage />}
          />
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
          <Route path="/community/create" element={<CreateCommunityPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
