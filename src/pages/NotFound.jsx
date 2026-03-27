import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <h1 className="text-9xl font-extrabold text-slate-200">404</h1> 
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Lost in the store?</h2>
        <p className="text-slate-500">The page you're looking for doesn't exist.</p>
      </div>
      <Button onClick={() => navigate("/")} size="lg">
        Return to Home
      </Button>
    </div>
  );
}