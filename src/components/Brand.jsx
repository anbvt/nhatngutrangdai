import React from "react";
import { Link } from "react-router-dom";

export default function Brand({ inverse = false }) {
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
