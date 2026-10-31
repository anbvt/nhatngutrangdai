import React, { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  MessageCircle,
  Menu,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "../../../components/Brand.jsx";
import { useLocale } from "../../../i18n/LocaleProvider.jsx";
import { demoCourses, getCourseText } from "../../../mocks/demoCourses.js";
import LanguageToggle from "../../../components/LanguageToggle.jsx";

export default function HomePage({ onNavigate, onRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, t } = useLocale();

  return (
    <div className="public-page" id="home">
      <header className="public-header">
        <div className="public-nav">
          <Brand />
          <nav className="nav-links" aria-label={t("primaryNavigation")}>
            <Link to="/courses">{t("courses")}</Link>
            <Link to="/about">{t("about")}</Link>
            <Link to="/news">{t("news")}</Link>
            <Link to="/contact">{t("contact")}</Link>
          </nav>
          <div className="nav-actions">
            <LanguageToggle />
            <button className="nav-login" type="button" onClick={() => onNavigate("profile")}>
              <UserRound size={16} /> {t("studentPortal")}
            </button>
            <Link className="button button-dark nav-cta" to="/enroll">{t("enroll")} <ArrowUpRight size={16} /></Link>
          </div>
          <button className="mobile-menu icon-button" aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" type="button" onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label={t("primaryNavigation")}>
            <Link to="/courses" onClick={() => setMobileMenuOpen(false)}>{t("courses")}</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>{t("about")}</Link>
            <Link to="/news" onClick={() => setMobileMenuOpen(false)}>{t("news")}</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t("contact")}</Link>
            <button type="button" onClick={() => { setMobileMenuOpen(false); onNavigate("profile"); }}>{t("studentPortal")}</button>
            <button type="button" onClick={() => { setMobileMenuOpen(false); onNavigate("admin"); }}>{t("adminDemo")}</button>
            <LanguageToggle />
          </nav>
        )}
      </header>

      <main id="page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="mini-label"><span className="live-dot" /> {t("heroEyebrow")}</span>
            <h1>{t("heroTitle")}<br /><em>{t("heroTitleAccent")}</em></h1>
            <p className="hero-description">{t("heroDescription")}</p>
            <div className="hero-actions">
              <Link className="button button-orange" to="/courses">{t("exploreCourses")} <ArrowRight size={17} /></Link>
              <a className="text-link" href="#approach">{t("learnApproach")} <ArrowDown size={15} /></a>
            </div>
            <div className="hero-social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span className="proof-avatar proof-1">明</span>
                <span className="proof-avatar proof-2">美</span>
                <span className="proof-avatar proof-3">学</span>
              </div>
              <div><strong>{t("heroProofTitle")}</strong><small>{t("heroProofDescription")}</small></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Minh họa hành trình học tiếng Nhật">
            <div className="art-sun" />
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-kanji">学</div>
            <div className="art-side-note">STUDY AT YOUR OWN PACE</div>
            <div className="art-stamp">一歩<br />ずつ</div>
            <div className="art-card">
              <span className="art-card-icon"><BookOpen size={17} /></span>
              <div><strong>Một hành trình mới</strong><small>Bắt đầu từ bảng chữ cái</small></div>
              <ArrowUpRight size={16} />
            </div>
            <span className="art-leaf leaf-one">✳</span>
            <span className="art-leaf leaf-two">✳</span>
          </div>
        </section>

        <section className="trust-strip" id="approach">
          <div><span className="strip-icon"><GraduationCap size={19} /></span><span><strong>{t("trustLevelTitle")}</strong><small>{t("trustLevelBody")}</small></span></div>
          <div><span className="strip-icon"><MessageCircle size={18} /></span><span><strong>{t("trustPracticeTitle")}</strong><small>{t("trustPracticeBody")}</small></span></div>
          <div><span className="strip-icon"><CalendarDays size={18} /></span><span><strong>{t("trustScheduleTitle")}</strong><small>{t("trustScheduleBody")}</small></span></div>
        </section>

        <section className="courses-section section-wrap" id="courses">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t("courseEyebrow")}</span>
              <h2>{t("courseHeading")} <em>{t("courseHeadingAccent")}</em></h2>
            </div>
            <p>{t("courseIntro")}</p>
          </div>
          <div className="course-grid">
            {demoCourses.map((course) => (
              <article className={`course-card ${course.tone}`} key={course.id}>
                <div className="course-card-top">
                  <span className="course-level">{getCourseText(course, locale, "level")}</span>
                  <span className="course-glyph" aria-hidden="true">{course.glyph}</span>
                </div>
                <h3>{getCourseText(course, locale, "title")}</h3>
                <p>{getCourseText(course, locale, "description")}</p>
                <div className="course-meta"><span><Clock3 size={15} />{getCourseText(course, locale, "schedule")}</span></div>
                <div className="course-card-bottom">
                  <span><small>{t("sampleTuition")}</small><strong>{new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "vi-VN").format(course.priceValue)}<i>đ</i></strong></span>
                  <button className="round-arrow" type="button" aria-label={`${t("enroll")}: ${getCourseText(course, locale, "title")}`} onClick={() => onRegister(course)}>
                    <ArrowUpRight size={19} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="sample-note">{t("sampleDataNote")}</p>
        </section>

        <section className="approach-section section-wrap" id="about">
          <div className="approach-illustration">
            <div className="approach-paper">
              <span className="paper-label">YOUR NEXT CHAPTER</span>
              <span className="paper-kanji">夢</span>
              <span className="paper-caption">夢をあきらめないで</span>
            </div>
            <div className="approach-note"><Sparkles size={16} /> Tiến bộ theo cách của bạn</div>
          </div>
          <div className="approach-copy">
            <span className="eyebrow">{t("approachEyebrow")}</span>
            <h2>{t("approachTitle")}<br /><em>{t("approachTitleAccent")}</em></h2>
            <p>{t("approachBody")}</p>
            <div className="approach-list">
              <div><span>01</span><p><strong>{t("goalStepTitle")}</strong><small>{t("goalStepBody")}</small></p><Check size={17} /></div>
              <div><span>02</span><p><strong>{t("pathStepTitle")}</strong><small>{t("pathStepBody")}</small></p><Check size={17} /></div>
              <div><span>03</span><p><strong>{t("progressStepTitle")}</strong><small>{t("progressStepBody")}</small></p><Check size={17} /></div>
            </div>
            <Link className="text-link text-link-dark" to="/enroll">{t("startJourney")} <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="closing-cta">
          <div className="closing-mark">日</div>
          <span className="eyebrow">{t("closingEyebrow")}</span>
          <h2>{t("closingTitle")} <em>{t("closingTitleAccent")}</em></h2>
          <p>{t("closingBody")}</p>
          <Link className="button button-orange" to="/enroll">{t("consultFree")} <ArrowRight size={17} /></Link>
        </section>
      </main>

      <footer className="public-footer">
        <Brand inverse />
        <p>{t("footerTagline")}</p>
        <div><span>{t("copyright")}</span><button type="button" onClick={() => onNavigate("admin")}>{t("adminDemo")}</button></div>
      </footer>
    </div>
  );
}
