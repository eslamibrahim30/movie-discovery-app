import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { getLoginSchema } from "@/lib/schemas"; 
import { useAuthStore } from "@/store/useAuthStore";
import { useLangStore } from "@/store/useLangStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, KeyRound, Loader2 } from "lucide-react"; 
import logo from "@/assets/logo/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { lang } = useLangStore();

  const t = {
    en: {
      title: "Sign in to CineVibe",
      desc: "Welcome back! Enter your details to continue.",
      email: "Email Address",
      password: "Password",
      submit: "Continue",
      noAccount: "Don't have an account?",
      register: "Sign up for free",
      invalid: "Invalid email or password",
      invalidEmail: "Invalid email address",
      passwordRequired: "Password is required"
    },
    ar: {
      title: "الدخول إلى CineVibe",
      desc: "مرحباً بعودتك! أدخل بياناتك للمتابعة.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      submit: "متابعة",
      noAccount: "ليس لديك حساب؟",
      register: "سجل مجاناً",
      invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      invalidEmail: "البريد الإلكتروني غير صحيح",
      passwordRequired: "كلمة المرور مطلوبة"
    },
    fr: {
      title: "Se connecter à CineVibe",
      desc: "Bon retour ! Entrez vos coordonnées pour continuer.",
      email: "Adresse e-mail",
      password: "Mot de passe",
      submit: "Continuer",
      noAccount: "Vous n'avez pas de compte ?",
      register: "S'inscrire gratuitement",
      invalid: "Email ou mot de passe invalide",
      invalidEmail: "Adresse e-mail invalide",
      passwordRequired: "Mot de passe requis"
    },
    zh: {
      title: "登录 CineVibe",
      desc: "欢迎回来！请输入您的详细信息以继续。",
      email: "电子邮件",
      password: "密码",
      submit: "继续",
      noAccount: "没有帐户？",
      register: "免费注册",
      invalid: "电子邮件或密码无效",
      invalidEmail: "电子邮件地址无效",
      passwordRequired: "需要密码"
    }
  }[lang];

  const form = useForm({
    resolver: zodResolver(getLoginSchema(t)), 
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("movie_app_db") || "[]");
    const foundUser = users.find(
      (u) => u.email === data.email && u.password === data.password,
    );

    if (foundUser) {
      login(foundUser);
      navigate("/account");
    } else {
      form.setError("root", { message: t.invalid });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-110 space-y-10">
        
        {/* 🎬 Logo & Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          <Link to="/" className="transition-transform hover:scale-105 active:scale-95">
            <img src={logo} alt="CineVibe" className="h-16 w-auto object-contain" />
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-foreground rtl:tracking-normal">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-base">
              {t.desc}
            </p>
          </div>
        </div>

        {/* 📝 Form Section */}
        <div className="bg-background border border-border/50 p-8 rounded-3xl shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5 rtl:text-right">
                    <FormLabel className="font-semibold text-xs uppercase tracking-widest text-muted-foreground rtl:tracking-normal">
                      {t.email}
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center group">
                        <Mail size={18} className="absolute left-3.5 text-muted-foreground transition-colors group-focus-within:text-primary rtl:right-3.5 rtl:left-auto" />
                        <Input 
                          placeholder="name@example.com" 
                          {...field} 
                          className="h-12 pl-11 pr-4 bg-muted/20 border-border focus-visible:border-primary/50 focus-visible:ring-primary/10 transition-all rounded-xl rtl:pr-11 rtl:pl-4 text-base"
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
                    <FormLabel className="font-semibold text-xs uppercase tracking-widest text-muted-foreground rtl:tracking-normal">
                      {t.password}
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center group">
                        <KeyRound size={18} className="absolute left-3.5 text-muted-foreground transition-colors group-focus-within:text-primary rtl:right-3.5 rtl:left-auto" />
                        <Input 
                          type="password" 
                          placeholder="••••••" 
                          {...field} 
                          className="h-12 pl-11 pr-4 bg-muted/20 border-border focus-visible:border-primary/50 focus-visible:ring-primary/10 transition-all rounded-xl rtl:pr-11 rtl:pl-4 text-base"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-center animate-in fade-in zoom-in-95">
                  <p className="text-sm font-semibold text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-black text-base transition-all group active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin rtl:ml-2 rtl:mr-0" />
                    {t.submit}...
                  </>
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

        <div className="border-t border-border/50 pt-8 mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t.noAccount}{" "}
            <Link to="/register" className="text-primary font-bold hover:text-primary/80 transition-colors">
              {t.register} <span className="rtl:hidden">→</span> <span className="hidden rtl:inline">←</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}