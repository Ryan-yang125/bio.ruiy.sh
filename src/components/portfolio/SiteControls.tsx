"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
type Locale = "en" | "zh";

const THEME_KEY = "ryan-site-theme";
const LOCALE_KEY = "ryan-site-locale";
const DEFAULT_PREFERENCE_KEY = "light:en";
const preferenceListeners = new Set<() => void>();

function preferredTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function applyLocale(locale: Locale) {
  document.documentElement.dataset.locale = locale;
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
}

function readPreferenceKey() {
  if (typeof window === "undefined") return DEFAULT_PREFERENCE_KEY;

  const storedTheme = window.localStorage.getItem(THEME_KEY);
  const theme: Theme = storedTheme === "dark" || storedTheme === "light"
    ? storedTheme
    : preferredTheme();
  const storedLocale = window.localStorage.getItem(LOCALE_KEY);
  const locale: Locale = storedLocale === "zh" || storedLocale === "en"
    ? storedLocale
    : "en";

  return `${theme}:${locale}`;
}

function subscribeToPreferences(listener: () => void) {
  preferenceListeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY || event.key === LOCALE_KEY) listener();
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    preferenceListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function writePreference(theme: Theme, locale: Locale) {
  window.localStorage.setItem(THEME_KEY, theme);
  window.localStorage.setItem(LOCALE_KEY, locale);
  applyTheme(theme);
  applyLocale(locale);
  preferenceListeners.forEach((listener) => listener());
}

export function SiteControls() {
  const preferenceKey = useSyncExternalStore(
    subscribeToPreferences,
    readPreferenceKey,
    () => DEFAULT_PREFERENCE_KEY,
  );
  const [theme, locale] = preferenceKey.split(":") as [Theme, Locale];

  const chooseLocale = (nextLocale: Locale) => {
    writePreference(theme, nextLocale);
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    writePreference(nextTheme, locale);
  };

  const nextThemeLabel = theme === "dark"
    ? { en: "Light", zh: "浅色" }
    : { en: "Dark", zh: "深色" };
  const themeButtonLabel = theme === "dark"
    ? { en: "Switch to light appearance", zh: "切换到浅色外观" }
    : { en: "Switch to dark appearance", zh: "切换到深色外观" };

  return (
    <div
      className="site-controls"
      aria-label={locale === "zh" ? "外观与语言" : "Appearance and language"}
    >
      <div className="locale-switch" aria-label={locale === "zh" ? "语言" : "Language"}>
        <button
          type="button"
          className="control-button"
          data-active={locale === "en" ? "true" : undefined}
          aria-pressed={locale === "en"}
          onClick={() => chooseLocale("en")}
        >
          EN
        </button>
        <button
          type="button"
          className="control-button"
          data-active={locale === "zh" ? "true" : undefined}
          aria-pressed={locale === "zh"}
          onClick={() => chooseLocale("zh")}
        >
          中
        </button>
      </div>
      <span className="control-divider" aria-hidden="true" />
      <button
        type="button"
        className="control-button control-theme"
        onClick={toggleTheme}
        aria-label={locale === "zh" ? themeButtonLabel.zh : themeButtonLabel.en}
      >
        <span className="locale-en">{nextThemeLabel.en}</span>
        <span className="locale-zh">{nextThemeLabel.zh}</span>
      </button>
    </div>
  );
}
