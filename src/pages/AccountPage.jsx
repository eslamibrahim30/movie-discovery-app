import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { useTitle } from "@/hooks/use-title";
import { useLangStore } from "@/store/useLangStore";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { User, LogOut, Mail, ShieldCheck } from "lucide-react";

export default function AccountPage() {
	useTitle("My Account");

	const { user, logout } = useAuthStore();
	const navigate = useNavigate();
	const { lang } = useLangStore();

	const t = {
		en: {
			pageTitle: "User Profile",
			pageDesc: "Manage your personal information",
			username: "Username",
			email: "Email Address",
			accountStatus: "Account Status",
			verified: "Verified Member",
			signOut: "Sign Out",
		},
		ar: {
			pageTitle: "الملف الشخصي",
			pageDesc: "إدارة معلوماتك الشخصية",
			username: "اسم المستخدم",
			email: "البريد الإلكتروني",
			accountStatus: "حالة الحساب",
			verified: "عضو موثق",
			signOut: "تسجيل الخروج",
		},
		fr: {
			pageTitle: "Profil Utilisateur",
			pageDesc: "Gérez vos informations personnelles",
			username: "Nom d'utilisateur",
			email: "Adresse e-mail",
			accountStatus: "Statut du compte",
			verified: "Membre vérifié",
			signOut: "Se déconnecter",
		},
		zh: {
			pageTitle: "用户资料",
			pageDesc: "管理您的个人信息",
			username: "用户名",
			email: "电子邮件",
			accountStatus: "账户状态",
			verified: "已认证会员",
			signOut: "退出登录",
		},
	}[lang];

	// If for some reason the protected route fails and user is null
	if (!user) return null;

	const handleLogout = () => {
		logout();
		navigate("/"); // redirect after logout (optional but recommended)
	};

	return (
		<div className="flex items-center justify-center min-h-[60vh] py-10" dir={lang === "ar" ? "rtl" : "ltr"}>
			<Card className="w-full max-w-md shadow-lg border-primary/10">
				<CardHeader className="text-center space-y-1">
					<div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
						<User size={48} className="text-primary" />
					</div>
					<CardTitle className="text-3xl font-bold tracking-tight">
						{t.pageTitle}
					</CardTitle>
					<p className="text-sm text-muted-foreground">
						{t.pageDesc}
					</p>
				</CardHeader>

				<CardContent className="space-y-4 pt-4">
					{/* Username Field */}
					<div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/30">
						<div className="bg-background p-2 rounded-lg border shadow-sm">
							<User size={20} className="text-primary" />
						</div>
						<div className="flex-1">
							<p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground rtl:tracking-normal">
								{t.username}
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
							<p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground rtl:tracking-normal">
								{t.email}
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
							<p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground rtl:tracking-normal">
								{t.accountStatus}
							</p>
							<p className="font-semibold text-green-600 dark:text-green-400">
								{t.verified}
							</p>
						</div>
					</div>
				</CardContent>

				<CardFooter className="pt-6">
					<Button
						variant="destructive"
						className="w-full text-gray rounded-xl transition-all hover:scale-[1.02]"
						onClick={handleLogout}
					>
						<LogOut size={18} className="me-2" /> {t.signOut}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}