import { Outlet, Navigate } from "react-router";

export const ProtectedRoutes = () => {
  const user = localStorage.getItem('user');
  return user ? <Outlet /> : <Navigate to="/login" />;
};
