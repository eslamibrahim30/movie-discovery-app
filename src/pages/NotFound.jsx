import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useLangStore } from "@/store/useLangStore";
import { Home, Tv2 } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  const { lang } = useLangStore();

  const t = {
    en: {
      title: "Lost in Space?",
      desc: "The movie or page you're looking for has exited the frame.",
      btn: "Back to Home",
    },
    ar: {
      title: "تهت في السينما؟",
      desc: "الفيلم أو الصفحة التي تبحث عنها خرجت عن الكادر.",
      btn: "العودة للرئيسية",
    },
    fr: {
      title: "Perdu dans l'espace ?",
      desc: "Le film ou la page que vous recherchez est hors cadre.",
      btn: "Retour à l'accueil",
    },
    zh: {
      title: "在空间中迷失了？",
      desc: "您寻找的电影或页面已退出框架。",
      btn: "返回首页",
    }
  }[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* 🎬 Big 404 Visual */}
      <div className="relative mb-8">
        <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-muted/20 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center translate-y-8 md:translate-y-12">
          <div className="p-4 rounded-3xl bg-primary shadow-2xl shadow-primary/40 rotate-12 animate-bounce">
            <Tv2 size={48} className="text-primary-foreground md:w-16 md:h-16" />
          </div>
        </div>
      </div>

      {/* 📝 Text Content */}
      <div className="max-w-md space-y-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
          {t.title}
        </h2>
        <p className="text-muted-foreground text-lg font-medium leading-relaxed">
          {t.desc}
        </p>
      </div>

      {/* 🏠 Action Button */}
      <Button 
        onClick={() => navigate("/")} 
        size="lg"
        className="mt-10 h-14 px-10 rounded-2xl font-black text-base shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-2"
      >
        <Home size={20} className={lang === 'ar' ? 'ml-1' : 'mr-1'} />
        {t.btn}
      </Button>

      {/* 🌌 Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 blur-[120px] -z-10 rounded-full" />
    </div>
  );
}