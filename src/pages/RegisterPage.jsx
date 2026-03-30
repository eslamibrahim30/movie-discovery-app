import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import { useNavigate } from "react-router"; 
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast"; 
import { AUTH_DB_KEY } from "@/lib/constants";

export default function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  });


const onSubmit = (values) => {
  // Use "movie_app_db" to match the Login page
  const existingUsers = JSON.parse(localStorage.getItem("movie_app_db") || "[]");

  if (existingUsers.find(u => u.email === values.email)) {
    form.setError("email", { message: "Email already registered" });
    return;
  }

  const updatedUsers = [...existingUsers, values];
  localStorage.setItem("movie_app_db", JSON.stringify(updatedUsers));
  
  toast.success("Account created! Please login.");
  navigate("/login");
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-card">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl><Input placeholder="johndoe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Form>
    </div>
  );
}