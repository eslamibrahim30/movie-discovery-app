import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { loginSchema } from "@/lib/schemas";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { useTitle } from "@/hooks/use-title";
import { AUTH_DB_KEY } from "@/lib/constants";

export default function LoginPage() {
	useTitle("Login");

	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = (data) => {
		const users = JSON.parse(localStorage.getItem(AUTH_DB_KEY) || "[]");

		const foundUser = users.find(
			(u) => u.email === data.email && u.password === data.password,
		);

		if (foundUser) {
			login(foundUser);
			navigate("/account");
		} else {
			form.setError("root", { message: "Invalid email or password" });
		}
	};

	return (
		<div className="flex items-center justify-center min-h-[80vh]">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							aria-label="Login form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="name@example.com" {...field} />
										</FormControl>
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
										<FormControl>
											<Input type="password" placeholder="••••••" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.formState.errors.root && (
								<p className="text-sm font-medium text-destructive">
									{form.formState.errors.root.message}
								</p>
							)}

							<Button
								type="submit"
								className="w-full"
								aria-label="Sign in to your account"
								title="Sign in"
							>
								Sign In
							</Button>
						</form>
					</Form>
				</CardContent>

				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link
							to="/register"
							aria-label="Go to register page"
							className="text-primary hover:underline"
						>
							Register here
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}