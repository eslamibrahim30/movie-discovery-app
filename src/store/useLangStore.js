import { create } from "zustand";

export const useLangStore = create((set) => ({
    lang: "en",
    setLang: (newLang) => {
        set({ lang: newLang });
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = newLang;
    },
}));