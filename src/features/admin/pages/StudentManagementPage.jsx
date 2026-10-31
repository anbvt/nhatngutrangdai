import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import Brand from "../../../components/Brand.jsx";
import { Avatar, StatusBadge } from "../../../components/students/StudentIdentity.jsx";

export default function StudentManagementPage({ students, onAdd, onEdit, onNavigate }) {
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
