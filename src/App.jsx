import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRound,
  UserRoundPlus,
  UsersRound,
  X,
} from "lucide-react";
import { LocaleProvider, useLocale } from "./i18n/LocaleProvider.jsx";
import { initialStudents } from "./mocks/demoStudents.js";
import { demoCourses as courses, getCourseText } from "./mocks/demoCourses.js";
import {
  AboutPage,
  AuthPage,
  ContactPage,
  CourseDetailPage,
  CoursesPage,
  EnrollmentPage,
  LanguageToggle,
  NewsPage,
  NotFoundPage,
} from "./features/public/PublicPages.jsx";

function Brand({ inverse = false }) {
  return (
    <Link className={`brand ${inverse ? "brand-inverse" : ""}`} to="/" aria-label="Nhật Ngữ Trảng Dài">
      <span className="brand-mark" aria-hidden="true">
        <span>日</span>
      </span>
      <span className="brand-name">
        <strong>NHẬT NGỮ</strong>
        <small>TRẢNG DÀI</small>
      </span>
    </Link>
  );
}

function Avatar({ student, small = false }) {
  return (
    <span className={`avatar avatar-${student.color} ${small ? "avatar-small" : ""}`} aria-hidden="true">
      {student.avatar}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "Đang học": "status-active",
    "Chờ xác nhận": "status-pending",
    "Đã hoàn thành": "status-complete",
  };
  return <span className={`status-badge ${styles[status] || ""}`}>{status}</span>;
}

function Modal({ title, eyebrow, onClose, children, wide = false }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const focusable = dialog?.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]');
    focusable?.[0]?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className={`modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex="-1">
        <div className="modal-top">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="modal-title">{title}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Đóng cửa sổ" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function HomePage({ onNavigate, onRegister }) {
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
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Điều hướng trên thiết bị di động">
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
            {courses.map((course) => (
              <article className={`course-card ${course.tone}`} key={course.title}>
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

function AdminPage({ students, onAdd, onEdit, onNavigate }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tất cả trạng thái");
  const filtered = useMemo(() => students.filter((student) => {
    const matchesQuery = `${student.name} ${student.id} ${student.course} ${student.email}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "Tất cả trạng thái" || student.status === status;
    return matchesQuery && matchesStatus;
  }), [students, query, status]);
  const activeCount = students.filter((student) => student.status === "Đang học").length;
  const pendingCount = students.filter((student) => student.status === "Chờ xác nhận").length;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Brand />
        <div className="sidebar-label">KHÔNG GIAN LÀM VIỆC</div>
        <nav className="sidebar-nav" aria-label="Quản lý">
          <button className="sidebar-link" type="button" onClick={() => onNavigate("home")}><LayoutDashboard size={18} /> Tổng quan <span className="sidebar-count">01</span></button>
          <button className="sidebar-link sidebar-link-active" type="button"><UsersRound size={18} /> Học viên <span className="sidebar-count">{students.length}</span></button>
          <button className="sidebar-link" type="button" onClick={() => onNavigate("profile")}><UserRound size={18} /> Hồ sơ của tôi</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help"><span><CircleHelp size={18} /></span><strong>Cần trợ giúp?</strong><small>Trao đổi với đội ngũ hỗ trợ</small><button type="button">Liên hệ hỗ trợ <ArrowRight size={14} /></button></div>
          <button className="sidebar-link" type="button"><Settings size={18} /> Cài đặt</button>
          <div className="sidebar-user"><span className="admin-avatar">TT</span><span><strong>Trung tâm</strong><small>Quản trị viên</small></span><MoreHorizontal size={19} /></div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="breadcrumb"><button type="button" onClick={() => onNavigate("home")}>Trang chủ</button><span>/</span><strong>Học viên</strong></div>
          <div className="topbar-actions"><span className="demo-pill"><span /> Chế độ dùng thử</span><button className="icon-button notification-button" aria-label="Thông báo"><Bell size={18} /><i /></button><button className="topbar-profile" type="button" onClick={() => onNavigate("profile")}><span className="admin-avatar">TT</span><ChevronDown size={15} /></button></div>
        </header>

        <div className="admin-content">
          <div className="admin-title-row">
            <div><span className="eyebrow">QUẢN LÝ ĐÀO TẠO</span><h1>Học viên <span>({students.length})</span></h1><p>Theo dõi danh sách và hành trình học tập của học viên.</p></div>
            <button className="button button-dark" type="button" onClick={onAdd}><UserRoundPlus size={17} /> Thêm học viên</button>
          </div>

          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon stat-violet"><UsersRound size={18} /></div><span>Tổng học viên</span><strong>{students.length.toString().padStart(2, "0")}</strong><small>Hồ sơ trong hệ thống</small></div>
            <div className="stat-card"><div className="stat-icon stat-green"><GraduationCap size={18} /></div><span>Đang học</span><strong>{activeCount.toString().padStart(2, "0")}</strong><small>Đang theo học khóa</small></div>
            <div className="stat-card"><div className="stat-icon stat-amber"><Clock3 size={18} /></div><span>Chờ xác nhận</span><strong>{pendingCount.toString().padStart(2, "0")}</strong><small>Cần được tư vấn</small></div>
            <div className="stat-card stat-note-card"><div className="stat-note-top"><Sparkles size={16} /><span>GỢI Ý HÔM NAY</span></div><strong>Một lời hỏi thăm<br />có thể tạo khác biệt.</strong><small>Hãy kết nối với học viên của bạn.</small></div>
          </div>

          <section className="students-panel">
            <div className="panel-heading">
              <div><h2>Danh sách học viên</h2><p>Thông tin mẫu được tạo sẵn để bạn trải nghiệm.</p></div>
              <button className="button button-outline" type="button" onClick={onAdd}><Plus size={16} /> Thêm hồ sơ</button>
            </div>
            <div className="table-controls">
              <label className="search-field"><Search size={17} /><input type="search" placeholder="Tìm theo tên, mã học viên..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
              <label className="filter-field"><SlidersHorizontal size={16} /><select aria-label="Lọc theo trạng thái" value={status} onChange={(event) => setStatus(event.target.value)}><option>Tất cả trạng thái</option><option>Đang học</option><option>Chờ xác nhận</option><option>Đã hoàn thành</option></select><ChevronDown size={15} /></label>
              <button className="icon-button filter-button" aria-label="Bộ lọc" type="button"><SlidersHorizontal size={17} /></button>
            </div>
            <div className="table-scroll">
              <table className="student-table">
                <thead><tr><th><button type="button">HỌC VIÊN <ArrowDown size={12} /></button></th><th>MÃ HỌC VIÊN</th><th>KHÓA HỌC</th><th>TRẠNG THÁI</th><th>TIẾN ĐỘ</th><th>NGÀY GHI DANH</th><th><span className="sr-only">Thao tác</span></th></tr></thead>
                <tbody>
                  {filtered.map((student) => (
                    <tr key={student.id} onClick={() => onEdit(student)}>
                      <td><div className="student-person"><Avatar student={student} /><span><strong>{student.name}</strong><small>{student.email}</small></span></div></td>
                      <td><span className="student-id">{student.id}</span></td>
                      <td><span className="course-cell">{student.course}<small>{student.level}</small></span></td>
                      <td><StatusBadge status={student.status} /></td>
                      <td><div className="progress-cell"><div className="progress-track"><span style={{ width: `${student.progress}%` }} /></div><small>{student.progress}%</small></div></td>
                      <td className="date-cell">{student.joined}</td>
                      <td><button className="row-more" aria-label={`Chỉnh sửa ${student.name}`} type="button" onClick={(event) => { event.stopPropagation(); onEdit(student); }}><MoreHorizontal size={18} /></button></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && <tr><td className="empty-table" colSpan="7"><Search size={20} /><strong>Không tìm thấy học viên</strong><span>Thử từ khóa hoặc trạng thái khác nhé.</span></td></tr>}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Đang hiển thị <strong>{filtered.length}</strong> trên <strong>{students.length}</strong> học viên mẫu</span><div><button type="button" disabled><ArrowLeft size={15} /></button><button className="page-active" type="button">1</button><button type="button" disabled><ArrowRight size={15} /></button></div></div>
          </section>
          <p className="admin-disclaimer"><ShieldCheck size={15} /> Đây là giao diện mẫu. Dữ liệu chỉ tồn tại trong phiên hiện tại và không được lưu lên máy chủ.</p>
        </div>
      </main>
    </div>
  );
}

function StudentProfile({ student, onSave, onNavigate }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: student.name, email: student.email, phone: student.phone });

  function handleSave(event) {
    event.preventDefault();
    onSave({ ...student, ...form });
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  }

  return (
    <div className="profile-page">
      <header className="profile-topbar"><Brand /><button className="back-link" type="button" onClick={() => onNavigate("home")}><ArrowLeft size={16} /> Về trang chủ</button></header>
      <main className="profile-main">
        <div className="profile-breadcrumb"><span>Học viên</span><span>/</span><strong>Hồ sơ của tôi</strong></div>
        <div className="profile-heading"><div><span className="eyebrow">KHÔNG GIAN CỦA BẠN</span><h1>Hồ sơ học viên</h1><p>Thông tin và hành trình học tập của bạn, ở cùng một nơi.</p></div><span className="demo-pill"><span /> Hồ sơ mẫu</span></div>
        {saved && <div className="inline-success" role="status"><Check size={17} /> Hồ sơ đã được cập nhật trong phiên này.</div>}
        <div className="profile-layout">
          <section className="profile-card profile-identity">
            <div className="profile-card-head"><h2>Thông tin cá nhân</h2><button className="edit-button" type="button" onClick={() => setEditing((value) => !value)}>{editing ? <X size={15} /> : <Settings size={15} />}{editing ? "Hủy" : "Chỉnh sửa"}</button></div>
            <div className="profile-person"><Avatar student={student} /><div><h3>{student.name}</h3><span>{student.id}</span></div></div>
            {editing ? (
              <form className="profile-edit-form" onSubmit={handleSave}>
                <label>Họ và tên<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
                <label>Email<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
                <label>Số điện thoại<input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
                <button className="button button-dark button-full" type="submit">Lưu thay đổi <Check size={16} /></button>
              </form>
            ) : (
              <div className="profile-details">
                <div><Mail size={16} /><span><small>Email</small><strong>{student.email}</strong></span></div>
                <div><MessageCircle size={16} /><span><small>Số điện thoại</small><strong>{student.phone}</strong></span></div>
                <div><CalendarDays size={16} /><span><small>Ngày tham gia</small><strong>{student.joined}</strong></span></div>
              </div>
            )}
          </section>
          <section className="profile-card learning-card">
            <div className="profile-card-head"><div><span className="eyebrow">HÀNH TRÌNH HỌC TẬP</span><h2>Khóa học của bạn</h2></div><span className="course-level-chip">{student.level}</span></div>
            <div className="learning-course-icon"><Languages size={22} /></div>
            <h3>{student.course}</h3>
            <p>Tiếp tục duy trì nhịp học đều đặn để tiến gần hơn tới mục tiêu của bạn.</p>
            <div className="learning-progress-label"><span>Tiến độ hoàn thành</span><strong>{student.progress}%</strong></div>
            <div className="learning-track"><span style={{ width: `${student.progress}%` }} /></div>
            <div className="learning-footer"><StatusBadge status={student.status} /><span><Clock3 size={14} /> Cập nhật gần đây</span></div>
            <button className="learning-link" type="button" onClick={() => onNavigate("admin")}>Xem không gian quản lý <ArrowUpRight size={15} /></button>
          </section>
          <section className="profile-card next-card">
            <span className="next-card-icon"><Star size={18} /></span>
            <div><span className="eyebrow">MỘT GỢI Ý NHỎ</span><h2>Học một chút,<br />mỗi ngày.</h2><p>Ôn lại từ vựng trong 10 phút hôm nay cũng là một bước tiến rồi!</p></div>
            <div className="next-japanese">今日も一歩ずつ。</div>
          </section>
        </div>
        <p className="admin-disclaimer"><ShieldCheck size={15} /> Hồ sơ mẫu cho mục đích trải nghiệm. Thay đổi không được lưu lên máy chủ.</p>
      </main>
    </div>
  );
}

function AddStudentModal({ onClose, onAdd }) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAdd({
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      phone: data.get("phone").trim(),
      course: data.get("course"),
    });
  }
  return (
    <Modal title="Thêm hồ sơ học viên" eyebrow="QUẢN LÝ HỌC VIÊN" onClose={onClose}>
      <form className="form-stack" onSubmit={handleSubmit}>
        <label>Họ và tên<input name="name" placeholder="Nguyễn Văn A" required /></label>
        <label>Email<input name="email" type="email" placeholder="ban@email.com" required /></label>
        <label>Số điện thoại<input name="phone" type="tel" placeholder="09xx xxx xxx" required /></label>
        <label>Khóa học<select name="course"><option>Tiếng Nhật sơ cấp N5</option><option>Giao tiếp tiếng Nhật</option><option>Luyện thi JLPT N4</option></select></label>
        <button className="button button-dark button-full" type="submit"><Plus size={17} /> Tạo hồ sơ mẫu</button>
      </form>
    </Modal>
  );
}

function EditStudentModal({ student, onClose, onSave }) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSave({
      ...student,
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      phone: data.get("phone").trim(),
      course: data.get("course"),
      status: data.get("status"),
    });
  }
  return (
    <Modal title="Thông tin học viên" eyebrow={student.id} onClose={onClose}>
      <form className="form-stack" onSubmit={handleSubmit}>
        <label>Họ và tên<input name="name" defaultValue={student.name} required /></label>
        <label>Email<input name="email" type="email" defaultValue={student.email} required /></label>
        <label>Số điện thoại<input name="phone" type="tel" defaultValue={student.phone} required /></label>
        <label>Khóa học<select name="course" defaultValue={student.course}><option>Tiếng Nhật sơ cấp N5</option><option>Giao tiếp tiếng Nhật</option><option>Luyện thi JLPT N4</option></select></label>
        <label>Trạng thái<select name="status" defaultValue={student.status}><option>Đang học</option><option>Chờ xác nhận</option><option>Đã hoàn thành</option></select></label>
        <button className="button button-dark button-full" type="submit"><Check size={16} /> Lưu thay đổi</button>
      </form>
    </Modal>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <AppRoutes />
      </LocaleProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const [students, setStudents] = useState(initialStudents);
  const [showAdd, setShowAdd] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const profileStudent = students.find((student) => student.id === "HV-24031") || students[0];
  const navigate = useNavigate();

  function createStudent(details) {
    const initials = details.name.split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase();
    const newStudent = {
      ...details,
      id: `HV-${Date.now().toString().slice(-5)}`,
      level: details.course.includes("N4") ? "N4" : details.course.includes("N5") ? "N5" : "Giao tiếp",
      status: "Chờ xác nhận",
      progress: 0,
      joined: new Intl.DateTimeFormat("vi-VN").format(new Date()),
      avatar: initials || "HV",
      color: ["lavender", "peach", "mint", "blue", "rose"][students.length % 5],
    };
    setStudents((current) => [newStudent, ...current]);
    setShowAdd(false);
    navigate("/demo/admin");
  }

  function saveStudent(updated) {
    setStudents((current) => current.map((student) => student.id === updated.id ? updated : student));
    setEditingStudent(null);
  }

  function navigateDemo(nextView) {
    const destination = nextView === "home"
      ? "/"
      : nextView === "admin"
        ? "/demo/admin"
        : "/demo/student";
    navigate(destination);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onNavigate={navigateDemo} onRegister={(course) => navigate(`/enroll?course=${course.id}`)} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage onEnroll={(course) => navigate(`/enroll?course=${course.id}`)} />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/enroll" element={<EnrollmentPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/demo" element={<AdminPage students={students} onAdd={() => setShowAdd(true)} onEdit={setEditingStudent} onNavigate={navigateDemo} />} />
        <Route path="/demo/admin" element={<AdminPage students={students} onAdd={() => setShowAdd(true)} onEdit={setEditingStudent} onNavigate={navigateDemo} />} />
        <Route path="/demo/student" element={<StudentProfile student={profileStudent} onSave={saveStudent} onNavigate={navigateDemo} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showAdd && <AddStudentModal onClose={() => setShowAdd(false)} onAdd={createStudent} />}
      {editingStudent && <EditStudentModal student={editingStudent} onClose={() => setEditingStudent(null)} onSave={saveStudent} />}
    </>
  );
}
