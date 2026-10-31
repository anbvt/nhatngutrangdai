import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages } from "./messages.js";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("vi");

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = messages[locale].documentTitle;
    document.querySelector('meta[name="description"]')
      ?.setAttribute("content", messages[locale].documentDescription);
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (key) => messages[locale][key] ?? messages.vi[key] ?? key,
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
