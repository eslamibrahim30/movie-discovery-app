import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRegisterSchema } from "@/lib/schemas";
import { useNavigate, Link } from "react-router";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useLangStore } from "@/store/useLangStore";
import { User, Mail, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import logo from "@/assets/logo/logo.png";
import toast from "react-hot-toast";
import { useTitle } from "@/hooks/use-title";
import { AUTH_DB_KEY } from "@/lib/constants";

export default function RegisterPage() {
	useTitle("Register");

	const navigate = useNavigate();
	const { lang } = useLangStore();

	const t = {
		en: {
			title: "Create an account",
			desc: "Join CineVibe today and start your cinematic journey.",
			username: "Username",
			email: "Email Address",
			password: "Password",
			submit: "Create Account",
			haveAccount: "Already have an account?",
			login: "Sign in",
			exists: "This email is already registered",
			success: "Account created! Please login.",
			usernameMin: "Username must be at least 4 characters",
			invalidEmail: "Invalid email address",
			passwordMin: "Password must be at least 8 characters",
		},
		ar: {
			title: "إنشاء حساب جديد",
			desc: "انضم إلى CineVibe اليوم وابدأ رحلتك السينمائية.",
			username: "اسم المستخدم",
			email: "البريد الإلكتروني",
			password: "كلمة المرور",
			submit: "إنشاء الحساب",
			haveAccount: "لديك حساب بالفعل؟",
			login: "تسجيل الدخول",
			exists: "هذا البريد الإلكتروني مسجل بالفعل",
			success: "تم إنشاء الحساب بنجاح! يمكنك الدخول الآن.",
			usernameMin: "اسم المستخدم يجب أن يكون 4 أحرف على الأقل",
			invalidEmail: "البريد الإلكتروني غير صحيح",
			passwordMin: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
		},
		fr: {
			title: "Créer un compte",
			desc: "Rejoignez CineVibe dès aujourd'hui.",
			username: "Nom d'utilisateur",
			email: "Adresse e-mail",
			password: "Mot de passe",
			submit: "S'inscrire",
			haveAccount: "Vous avez déjà un compte ?",
			login: "Se connecter",
			exists: "Cet e-mail est déjà enregistré",
			success: "Compte créé ! Veuillez vous connecter.",
			usernameMin: "Le nom d'utilisateur doit comporter au moins 4 caractères",
			invalidEmail: "Adresse e-mail invalide",
			passwordMin: "Le mot de passe doit comporter au moins 8 caractères",
		},
		zh: {
			title: "创建帐户",
			desc: "立即加入 CineVibe，开启您的电影之旅。",
			username: "用户名",
			email: "电子邮件",
			password: "密码",
			submit: "注册帐户",
			haveAccount: "已有帐户？",
			login: "登录",
			exists: "此电子邮件已注册",
			success: "帐户已创建！请登录。",
			usernameMin: "用户名至少为 4 个字符",
			invalidEmail: "电子邮件地址无效",
			passwordMin: "密码至少为 8 个字符",
		},
	}[lang];

	const form = useForm({
		resolver: zodResolver(getRegisterSchema(t)),
		defaultValues: { username: "", email: "", password: "" },
	});

	const onSubmit = (values) => {
		const existingUsers = JSON.parse(localStorage.getItem(AUTH_DB_KEY) || "[]");

		if (existingUsers.find((u) => u.email === values.email)) {
			form.setError("email", { message: t.exists });
			return;
		}

		const updatedUsers = [...existingUsers, values];
		localStorage.setItem(AUTH_DB_KEY, JSON.stringify(updatedUsers));

		toast.success(t.success);
		navigate("/login");
	};

	const isSubmitting = form.formState.isSubmitting;

	return (
		<div className="flex min-h-[90vh] items-center justify-center bg-background px-4 py-12">
			<div className="w-full max-w-110 space-y-10">
				{/* Header */}
				<div className="flex flex-col items-center text-center space-y-6">
					<Link to="/" className="transition-transform hover:scale-105 active:scale-95">
						<img src={logo} alt="CineVibe" className="h-14 w-auto object-contain" />
					</Link>
					<div className="space-y-2">
						<h1 className="text-4xl font-black tracking-tighter text-foreground rtl:tracking-normal">
							{t.title}
						</h1>
						<p className="text-muted-foreground text-base max-w-75 mx-auto">{t.desc}</p>
					</div>
				</div>

				{/* Form */}
				<div className="bg-background border border-border/50 p-8 rounded-[2.5rem] shadow-sm">
					<Form {...form}>
						<form
							aria-label="Register form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem className="space-y-1.5 rtl:text-right">
										<FormLabel className="font-semibold text-[10px] uppercase tracking-[0.2em] text-muted-foreground rtl:tracking-normal">
											{t.username}
										</FormLabel>
										<FormControl>
											<div className="relative flex items-center group">
												<User size={18} className="absolute left-3.5 text-muted-foreground transition-colors group-focus-within:text-primary rtl:right-3.5 rtl:left-auto" />
												<Input
													placeholder="johndoe"
													{...field}
													className="h-12 pl-11 pr-4 bg-muted/20 border-border focus-visible:border-primary/50 focus-visible:ring-primary/10 transition-all rounded-2xl rtl:pr-11 rtl:pl-4 text-base"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1.5 rtl:text-right">
										<FormLabel className="font-semibold text-[10px] uppercase tracking-[0.2em] text-muted-foreground rtl:tracking-normal">
											{t.email}
										</FormLabel>
										<FormControl>
											<div className="relative flex items-center group">
												<Mail size={18} className="absolute left-3.5 text-muted-foreground transition-colors group-focus-within:text-primary rtl:right-3.5 rtl:left-auto" />
												<Input
													type="email"
													placeholder="john@example.com"
													{...field}
													className="h-12 pl-11 pr-4 bg-muted/20 border-border focus-visible:border-primary/50 focus-visible:ring-primary/10 transition-all rounded-2xl rtl:pr-11 rtl:pl-4 text-base"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="space-y-1.5 rtl:text-right">
										<FormLabel className="font-semibold text-[10px] uppercase tracking-[0.2em] text-muted-foreground rtl:tracking-normal">
											{t.password}
										</FormLabel>
										<FormControl>
											<div className="relative flex items-center group">
												<KeyRound size={18} className="absolute left-3.5 text-muted-foreground transition-colors group-focus-within:text-primary rtl:right-3.5 rtl:left-auto" />
												<Input
													type="password"
													placeholder="••••••••"
													{...field}
													className="h-12 pl-11 pr-4 bg-muted/20 border-border focus-visible:border-primary/50 focus-visible:ring-primary/10 transition-all rounded-2xl rtl:pr-11 rtl:pl-4 text-base"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								aria-label="Register a new account"
								title="Register"
								disabled={isSubmitting}
								className="w-full h-12 rounded-2xl font-black text-base transition-all group active:scale-[0.98] mt-2 shadow-lg shadow-primary/10"
							>
								{isSubmitting ? (
									<Loader2 className="h-5 w-5 animate-spin" />
								) : (
									<>
										{t.submit}
										<ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1 rtl:ml-0 rtl:mr-2" />
									</>
								)}
							</Button>
						</form>
					</Form>
				</div>

				{/* Footer */}
				<div className="border-t border-border/50 pt-8 text-center">
					<p className="text-sm text-muted-foreground font-medium">
						{t.haveAccount}{" "}
						<Link to="/login" className="text-primary font-bold hover:text-primary/80 transition-colors">
							{t.login}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}