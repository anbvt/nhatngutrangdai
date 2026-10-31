import React from "react";

export function Avatar({ student, small = false }) {
  return (
    <span className={`avatar avatar-${student.color} ${small ? "avatar-small" : ""}`} aria-hidden="true">
      {student.avatar}
    </span>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    "Đang học": "status-active",
    "Chờ xác nhận": "status-pending",
    "Đã hoàn thành": "status-complete",
  };
  return <span className={`status-badge ${styles[status] || ""}`}>{status}</span>;
}
