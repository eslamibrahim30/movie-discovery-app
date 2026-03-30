import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User, LogOut, Mail, ShieldCheck, Calendar } from "lucide-react";

export default function AccountPage() {
  const { user, logout } = useAuthStore();

  // If for some reason the protected route fails and user is null
  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-[60vh] py-10">
      <Card className="w-full max-w-md shadow-lg border-primary/10">
        <CardHeader className="text-center space-y-1">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
            <User size={48} className="text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            User Profile
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your personal information
          </p>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {/* Username Field */}
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/30">
            <div className="bg-background p-2 rounded-lg border shadow-sm">
              <User size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Username
              </p>
              <p className="font-semibold text-foreground">{user?.username}</p>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/30">
            <div className="bg-background p-2 rounded-lg border shadow-sm">
              <Mail size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Email Address
              </p>
              <p className="font-semibold text-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Account Status */}
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/30">
            <div className="bg-background p-2 rounded-lg border shadow-sm">
              <ShieldCheck size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Account Status
              </p>
              <p className="font-semibold text-green-600 dark:text-green-400">Verified Member</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-6">
          <Button
            variant="destructive"
            className="w-full rounded-xl transition-all hover:scale-[1.02]"
            onClick={logout}
          >
            <LogOut size={18} className="me-2" /> Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}