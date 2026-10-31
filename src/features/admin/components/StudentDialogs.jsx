import React from "react";
import { Check, Plus } from "lucide-react";
import Modal from "../../../components/ui/Modal.jsx";

export function AddStudentModal({ onClose, onAdd }) {
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

export function EditStudentModal({ student, onClose, onSave }) {
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
