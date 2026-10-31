import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  GraduationCap,
  Languages,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useLocale } from "../../i18n/LocaleProvider.jsx";
import { demoCourses, getCourseText } from "../../mocks/demoCourses.js";
import { previewApplication } from "../../services/mockApplicationService.js";

export function LanguageToggle() {
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

function SchoolBrand() {
  const { t } = useLocale();
  return (
    <Link className="brand" to="/" aria-label={t("publicLabel")}>
      <span className="brand-mark" aria-hidden="true"><span>日</span></span>
      <span className="brand-name"><strong>NHẬT NGỮ</strong><small>TRẢNG DÀI</small></span>
    </Link>
  );
}

function PublicHeader() {
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="public-header">
      <div className="public-nav">
        <SchoolBrand />
        <nav className="public-links" aria-label={t("primaryNavigation")}>
          <Link to="/about">{t("about")}</Link>
          <Link to="/courses">{t("courses")}</Link>
          <Link to="/news">{t("news")}</Link>
          <Link to="/contact">{t("contact")}</Link>
        </nav>
        <div className="public-actions">
          <LanguageToggle />
          <Link className="public-login-link" to="/login">{t("login")}</Link>
          <Link className="button button-dark public-cta" to="/enroll">{t("enroll")} <ArrowUpRight size={16} /></Link>
        </div>
        <button
          className="mobile-menu icon-button"
          type="button"
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={menuOpen}
          aria-controls="public-mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="public-mobile-nav" id="public-mobile-navigation" aria-label={t("primaryNavigation")}>
          <Link to="/about" onClick={closeMenu}>{t("about")}</Link>
          <Link to="/courses" onClick={closeMenu}>{t("courses")}</Link>
          <Link to="/news" onClick={closeMenu}>{t("news")}</Link>
          <Link to="/contact" onClick={closeMenu}>{t("contact")}</Link>
          <Link to="/login" onClick={closeMenu}>{t("login")}</Link>
          <Link to="/enroll" onClick={closeMenu}>{t("enroll")}</Link>
          <LanguageToggle />
        </nav>
      )}
    </header>
  );
}

function PublicFooter() {
  const { t } = useLocale();
  return (
    <footer className="public-footer">
      <SchoolBrand />
      <p>{t("footerTagline")}</p>
      <div><span>{t("copyright")}</span><Link to="/demo/admin">{t("adminDemo")}</Link></div>
    </footer>
  );
}

function PublicShell({ children }) {
  const { t } = useLocale();
  return (
    <div className="public-page public-route-page">
      <a className="skip-link" href="#page-content">{t("skipToContent")}</a>
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}

function PageIntro({ eyebrow, title, description, children }) {
  return (
    <header className="public-page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </header>
  );
}

function CourseCard({ course }) {
  const { locale, t } = useLocale();
  return (
    <article className={`public-course-card ${course.tone}`}>
      <div className="public-course-card-top">
        <span className="course-level">{getCourseText(course, locale, "level")}</span>
        <span className="course-glyph" aria-hidden="true">{course.glyph}</span>
      </div>
      <h2>{getCourseText(course, locale, "title")}</h2>
      <p>{getCourseText(course, locale, "description")}</p>
      <div className="public-course-meta"><Clock3 size={16} aria-hidden="true" />{getCourseText(course, locale, "schedule")}</div>
      <div className="public-course-bottom">
        <span><small>{t("sampleTuition")}</small><strong>{new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "vi-VN").format(course.priceValue)} ₫</strong></span>
        <Link className="button button-outline" to={`/courses/${course.id}`}>{t("courseDetails")} <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}

export function CoursesPage() {
  const { t } = useLocale();
  return (
    <PublicShell>
      <main id="page-content" className="public-content">
        <PageIntro eyebrow={t("courseEyebrow")} title={t("pageCoursesTitle")} description={t("pageCoursesBody")} />
        <div className="public-course-grid">{demoCourses.map((course) => <CourseCard key={course.id} course={course} />)}</div>
        <p className="public-demo-note"><span>{t("demoMode")}</span>{t("sampleDataNote")}</p>
      </main>
    </PublicShell>
  );
}

export function CourseDetailPage({ onEnroll }) {
  const { courseId } = useParams();
  const { locale, t } = useLocale();
  const course = demoCourses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <PublicShell>
        <main id="page-content" className="public-content public-state-page">
          <h1>{t("courseNotFound")}</h1>
          <Link className="button button-dark" to="/courses">{t("backToCourses")} <ArrowRight size={16} /></Link>
        </main>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <main id="page-content" className="public-content">
        <Link className="back-link" to="/courses"><ArrowLeft size={16} /> {t("backToCourses")}</Link>
        <PageIntro
          eyebrow={getCourseText(course, locale, "level")}
          title={getCourseText(course, locale, "title")}
          description={getCourseText(course, locale, "description")}
        >
          <button className="button button-orange" type="button" onClick={() => onEnroll(course)}>
            {t("enroll")} <ArrowRight size={17} />
          </button>
        </PageIntro>
        <div className="course-detail-grid">
          <section className="content-card">
            <span className="content-card-icon"><BookOpen size={20} /></span>
            <h2>{t("courseOverview")}</h2>
            <p>{getCourseText(course, locale, "description")}</p>
            <h3>{t("courseAudience")}</h3>
            <p>{t("courseAudienceBody")}</p>
          </section>
          <aside className="content-card course-facts">
            <h2>{t("courseDetails")}</h2>
            <dl>
              <div><dt>{t("courseLevel")}</dt><dd>{getCourseText(course, locale, "level")}</dd></div>
              <div><dt>{t("courseDuration")}</dt><dd>{getCourseText(course, locale, "schedule").split("·")[0].trim()}</dd></div>
              <div><dt>{t("courseSchedule")}</dt><dd>{getCourseText(course, locale, "schedule")}</dd></div>
              <div><dt>{t("sampleTuition")}</dt><dd>{new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "vi-VN").format(course.priceValue)} ₫</dd></div>
            </dl>
            <p className="public-demo-note">{t("courseFactsNote")}</p>
          </aside>
        </div>
      </main>
    </PublicShell>
  );
}

export function AboutPage() {
  const { t } = useLocale();
  return (
    <PublicShell>
      <main id="page-content" className="public-content">
        <PageIntro eyebrow={t("about")} title={t("pageAboutTitle")} description={t("pageAboutBody")} />
        <section className="content-card about-content">
          <span className="content-card-icon"><GraduationCap size={21} /></span>
          <h2>{t("aboutSectionTitle")}</h2>
          <p>{t("aboutSectionBody")}</p>
          <p className="public-demo-note"><span>{t("demoMode")}</span>{t("aboutNote")}</p>
          <Link className="button button-dark" to="/courses">{t("exploreCourses")} <ArrowRight size={16} /></Link>
        </section>
      </main>
    </PublicShell>
  );
}

export function NewsPage() {
  const { t } = useLocale();
  return (
    <PublicShell>
      <main id="page-content" className="public-content">
        <PageIntro eyebrow={t("news")} title={t("pageNewsTitle")} description={t("pageNewsBody")} />
        <section className="empty-content-state" role="status">
          <span className="content-card-icon"><MessageCircle size={21} /></span>
          <h2>{t("newsEmptyTitle")}</h2>
          <p>{t("newsEmptyBody")}</p>
          <Link className="button button-outline" to="/contact">{t("contactUs")} <ArrowRight size={16} /></Link>
        </section>
      </main>
    </PublicShell>
  );
}

function ContactForm({ selectedCourse = "" }) {
  const { locale, t } = useLocale();
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = {};
    for (const field of ["name", "email", "phone"]) {
      if (!String(formData.get(field) ?? "").trim()) {
        nextErrors[field] = "requiredField";
      }
    }
    if (!nextErrors.email && form.elements.namedItem("email").validity.typeMismatch) {
      nextErrors.email = "invalidEmail";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = previewApplication(formData);
    setPreview(result.mode === "preview-only");
  }

  return (
    <section className="content-card form-card">
      <h2>{t("applicationForm")}</h2>
      {preview ? (
        <div className="preview-result" role="status" aria-live="polite">
          <span className="content-card-icon"><Check size={20} /></span>
          <h3>{t("previewOnlyTitle")}</h3>
          <p>{t("previewOnlyBody")}</p>
          <button className="button button-outline" type="button" onClick={() => setPreview(false)}>{t("previewAgain")}</button>
        </div>
      ) : (
        <form className="public-form" noValidate onSubmit={handleSubmit}>
          <label>
            {t("fullName")}
            <input id="application-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "application-name-error" : undefined} onChange={() => setErrors((current) => ({ ...current, name: "" }))} />
            {errors.name && <span className="field-error" id="application-name-error" role="alert">{t(errors.name)}</span>}
          </label>
          <div className="form-grid-two">
            <label>
              {t("phone")}
              <input id="application-phone" name="phone" type="tel" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "application-phone-error" : undefined} onChange={() => setErrors((current) => ({ ...current, phone: "" }))} />
              {errors.phone && <span className="field-error" id="application-phone-error" role="alert">{t(errors.phone)}</span>}
            </label>
            <label>
              {t("email")}
              <input id="application-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "application-email-error" : undefined} onChange={() => setErrors((current) => ({ ...current, email: "" }))} />
              {errors.email && <span className="field-error" id="application-email-error" role="alert">{t(errors.email)}</span>}
            </label>
          </div>
          <label>
            {t("interestedCourse")}
            <select name="course" defaultValue={selectedCourse}>
              <option value="">{t("chooseCourse")}</option>
              {demoCourses.map((course) => (
                <option key={course.id} value={course.id}>{getCourseText(course, locale, "title")}</option>
              ))}
            </select>
          </label>
          <label>{t("message")}<textarea name="message" rows="4" placeholder={t("messagePlaceholder")} /></label>
          <button className="button button-dark" type="submit">{t("sendRequest")} <ArrowRight size={16} /></button>
          <p className="form-footnote">{t("formPrivacyNote")}</p>
        </form>
      )}
    </section>
  );
}

export function EnrollmentPage() {
  const [searchParams] = useSearchParams();
  const { t } = useLocale();
  return (
    <PublicShell>
      <main id="page-content" className="public-content public-form-layout">
        <PageIntro eyebrow={t("enroll")} title={t("pageEnrollTitle")} description={t("pageEnrollBody")} />
        <ContactForm selectedCourse={searchParams.get("course") ?? ""} />
      </main>
    </PublicShell>
  );
}

export function ContactPage() {
  const { t } = useLocale();
  return (
    <PublicShell>
      <main id="page-content" className="public-content public-form-layout">
        <PageIntro eyebrow={t("contact")} title={t("pageContactTitle")} description={t("pageContactBody")} />
        <ContactForm />
      </main>
    </PublicShell>
  );
}

export function AuthPage({ mode }) {
  const { t } = useLocale();
  const isRegister = mode === "register";
  return (
    <PublicShell>
      <main id="page-content" className="public-content public-form-layout">
        <PageIntro eyebrow={t("demoMode")} title={t(isRegister ? "register" : "login")} description={t("authDemoBody")} />
        <section className="content-card form-card">
          <div className="demo-notice" role="note">{t("authDemoTitle")}. {t("authNoPersistence")}</div>
          <form className="public-form" onSubmit={(event) => event.preventDefault()}>
            <label>{t("authEmail")}<input name="email" type="email" autoComplete="email" /></label>
            <label>{t("authPassword")}<input name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} /></label>
            {isRegister && <label>{t("authPasswordConfirm")}<input name="password-confirm" type="password" autoComplete="new-password" /></label>}
            <button className="button button-dark" type="submit" disabled>{t("authSubmit")}</button>
          </form>
          <Link className="auth-switch-link" to={isRegister ? "/login" : "/register"}>
            {t(isRegister ? "authSwitchLogin" : "authSwitchRegister")}
          </Link>
        </section>
      </main>
    </PublicShell>
  );
}

export function NotFoundPage() {
  const { t } = useLocale();
  return (
    <PublicShell>
      <main id="page-content" className="public-content public-state-page">
        <h1>{t("pageNotFound")}</h1>
        <p>{t("pageNotFoundBody")}</p>
        <Link className="button button-dark" to="/">{t("goHome")} <ArrowRight size={16} /></Link>
      </main>
    </PublicShell>
  );
}
