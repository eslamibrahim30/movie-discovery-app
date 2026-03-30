import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { useTitle } from "@/hooks/use-title";
export default function AccountPage() {
      useTitle("My Account");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1>Welcome, {user?.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}