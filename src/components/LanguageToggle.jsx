import React from "react";
import { Languages } from "lucide-react";
import { useLocale } from "../i18n/LocaleProvider.jsx";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  const nextLocale = locale === "vi" ? "ja" : "vi";
  return (
    <button
      className="language-toggle"
      type="button"
      aria-label={t("switchLanguage")}
      title={t("switchLanguage")}
      onClick={() => setLocale(nextLocale)}
    >
      <Languages size={16} aria-hidden="true" />
      <span>{nextLocale === "ja" ? "日本語" : "Tiếng Việt"}</span>
    </button>
  );
}
