import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the child routes if authenticated
  return <Outlet />;
}