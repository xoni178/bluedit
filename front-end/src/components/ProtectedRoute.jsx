import { Navigate } from "react-router-dom";

import { useBlueditDataContext } from "../api/DataContext";
export default function ProtectedRoute({ children, isAuthorized }) {
  const { SetException } = useBlueditDataContext();

  if (!isAuthorized) {
    console.log(isAuthorized);
    SetException("Please login in first!");
    return <Navigate to="/login" replace />;
  }

  return children;
}
