import contextCursor from "../libs/context-cursor/index";

contextCursor({
  radius: 25, //will change the radius/size of the cursor
});

type Language = "en" | "zh";
type Theme = "light" | "dark";

const translations: Record<Language, Record<string, string>> = {
  en: {
    role: "FullStack Engineer",
    connect: "Let's Connect",
    about: "About",
    aboutAria: "About me",
    aboutLineOne:
      "I'm Ryan Yang, a software developer, and the proud dad of two adorable cats. I have a strong focus on artificial intelligence and micro SaaS tools. I love building beautiful UIs and creating interesting apps.",
    aboutLineTwo:
      "I'm passionate about new technology and always on the lookout for great opportunities!",
    saasTitle: "SaaS Projects",
    saasAria: "Work Projects",
    openSourceTitle: "Open Source Projects",
    openSourceAria: "Work Projects",
    rights: " All rights reserved.",
    themeLabel: "Dark",
    langLabel: "中文",
  },
  zh: {
    role: "全栈工程师",
    connect: "联系我",
    about: "关于我",
    aboutAria: "关于我",
    aboutLineOne:
      "我是 Ryan Yang，一名软件开发者，也是两只可爱猫咪的铲屎官。我专注于人工智能与微型 SaaS 工具，喜欢打造漂亮的界面和有趣的应用。",
    aboutLineTwo: "我热爱新技术，并一直在寻找令人兴奋的机会！",
    saasTitle: "SaaS 项目",
    saasAria: "作品项目",
    openSourceTitle: "开源项目",
    openSourceAria: "作品项目",
    rights: " 版权所有。",
    themeLabel: "深色",
    langLabel: "English",
  },
};

const languageButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-lang-toggle]",
);
const themeButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-theme-toggle]",
);
const i18nElements = document.querySelectorAll<HTMLElement>("[data-i18n-key]");

const getStoredValue = <T extends string>(key: string, fallback: T) => {
  if (typeof localStorage === "undefined") {
    return fallback;
  }
  const stored = localStorage.getItem(key) as T | null;
  return stored ?? fallback;
};

const applyLanguage = (lang: Language) => {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  i18nElements.forEach((element) => {
    const key = element.dataset.i18nKey as keyof (typeof translations)[Language];
    const attr = element.dataset.i18nAttr;
    const value = translations[lang][key];
    if (!value) {
      return;
    }
    if (attr) {
      element.setAttribute(attr, value);
    } else {
      element.textContent = value;
    }
  });

  languageButtons.forEach((button) => {
    button.textContent = translations[lang].langLabel;
  });
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  themeButtons.forEach((button) => {
    button.textContent = translations[getStoredValue("lang", "en")].themeLabel;
  });
};

const initializePreferences = () => {
  const preferredLang = getStoredValue<Language>("lang", "en");
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const preferredTheme = getStoredValue<Theme>(
    "theme",
    prefersDark ? "dark" : "light",
  );

  applyLanguage(preferredLang);
  applyTheme(preferredTheme);
};

initializePreferences();

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentLang = getStoredValue<Language>("lang", "en");
    const nextLang: Language = currentLang === "en" ? "zh" : "en";
    localStorage.setItem("lang", nextLang);
    applyLanguage(nextLang);
    applyTheme(getStoredValue<Theme>("theme", "light"));
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentTheme = getStoredValue<Theme>("theme", "light");
    const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
});
