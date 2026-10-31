import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { LocaleProvider } from "../i18n/LocaleProvider.jsx";
import { initialStudents } from "../mocks/demoStudents.js";
import StudentManagementPage from "../features/admin/pages/StudentManagementPage.jsx";
import { AddStudentModal, EditStudentModal } from "../features/admin/components/StudentDialogs.jsx";
import HomePage from "../features/public/pages/HomePage.jsx";
import {
  AboutPage,
  AuthPage,
  ContactPage,
  CourseDetailPage,
  CoursesPage,
  EnrollmentPage,
  NewsPage,
  NotFoundPage,
} from "../features/public/pages/PublicPages.jsx";
import StudentProfilePage from "../features/student/pages/StudentProfilePage.jsx";

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

  function enroll(course) {
    navigate(`/enroll?course=${course.id}`);
  }

  const adminProps = {
    students,
    onAdd: () => setShowAdd(true),
    onEdit: setEditingStudent,
    onNavigate: navigateDemo,
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onNavigate={navigateDemo} onRegister={enroll} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage onEnroll={enroll} />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/enroll" element={<EnrollmentPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/demo" element={<StudentManagementPage {...adminProps} />} />
        <Route path="/demo/admin" element={<StudentManagementPage {...adminProps} />} />
        <Route path="/demo/student" element={<StudentProfilePage student={profileStudent} onSave={saveStudent} onNavigate={navigateDemo} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showAdd && <AddStudentModal onClose={() => setShowAdd(false)} onAdd={createStudent} />}
      {editingStudent && <EditStudentModal student={editingStudent} onClose={() => setEditingStudent(null)} onSave={saveStudent} />}
    </>
  );
}
