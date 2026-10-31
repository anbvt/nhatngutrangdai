import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Languages,
  Mail,
  MessageCircle,
  Settings,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import Brand from "../../../components/Brand.jsx";
import { Avatar, StatusBadge } from "../../../components/students/StudentIdentity.jsx";

export default function StudentProfilePage({ student, onSave, onNavigate }) {
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
