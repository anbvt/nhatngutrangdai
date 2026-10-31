# Japanese Language School Management System
## Web UI/UX Requirements — Based on the Requirements Interview

**Purpose:** This document is the source of truth for designing the web interface of the Japanese language school management system. It translates the confirmed interview decisions into frontend UI/UX requirements.

**Project status:** Requirements interview completed and approved by the project owner on 2026-11-01.

---

## 1. Product overview

Design a responsive web application for a Japanese language school. The system has two connected experiences:

1. **Public website** — presents the school, programs, courses, news and enrollment information, and converts visitors into prospective students.
2. **Student/Admin application** — supports student self-service and school operations.

The existing public frontend is hosted at:

- https://nhatngutrangdai.vercel.app/#home

Keep the existing frontend as the starting point where practical. Do not assume its current pages, components, or styling without inspecting the repository. Design the UI to integrate with a separate Spring Boot REST API.

### Product goals

- Make it easy for prospective students to discover courses and submit enrollment inquiries/applications.
- Give students a personalized portal for their learning and administrative activities.
- Give school administrators a clear workspace for enrollment and day-to-day learning operations.
- Keep the MVP achievable for a personal learning/portfolio project while documenting later expansion.
- Prioritize clarity, usability, responsive behavior, accessibility, and a coherent design system.

### Intended use

The first release is for personal development, learning, and portfolio demonstration. It is not initially intended to operate a real school. Use realistic but clearly fictional demo data. Do not use real personal data.

---

## 2. User roles and navigation boundaries

### MVP roles

- **Student** — manages their own profile, applications, enrollment, payments, schedule, attendance history, exams/results, learning materials, and notifications.
- **Admin** — manages students, courses, classes, enrollment operations, payments, schedules, attendance, exams, learning materials, and notifications.
- **Super Admin** — has full administrative control, including Admin account management and privileged operations.

The MVP has Student and Admin-facing workflows, with Super Admin as a higher-privilege administrative role. Teachers are managed by Admin in the MVP and do not have a separate teacher login yet.

### UI authorization rules

- Show navigation and actions based on the signed-in user's role and permissions.
- Students must only see and act on their own data.
- Admin screens should expose operational tools according to permissions.
- Super Admin screens may include privileged account and approval controls.
- Do not rely on hiding buttons as the only security measure; backend authorization remains authoritative.
- Include useful empty, loading, error, forbidden, and success states.

---

## 3. MVP scope — design these workflows first

The approved MVP includes:

1. Authentication and role-aware navigation.
2. Student, course, and class management.
3. Course enrollment and application review.
4. Tuition payment UI and payment history.
5. Basic class schedules.
6. Attendance management.
7. Exam management and results.
8. Learning material management and access.
9. Notifications.
10. Student dashboard.

Design these as coherent end-to-end workflows, not disconnected screens.

### MVP exclusions / later phases

Do not make these essential to the first MVP navigation or critical flows. They may be represented in a future roadmap or clearly marked as “Coming later” only if useful:

- Advanced CRM and lead scoring.
- Full CMS and advanced content administration.
- Advanced ticket/support workflow and SLA management.
- Advanced Learning Portfolio analytics and long-term progress visualization.
- Public course review and rating system.
- Advanced customer journey and campaign analytics.
- Complex multi-branch operations.
- Teacher self-service portal and teacher login.
- Room allocation, teacher availability, holiday calendars, make-up lessons, and advanced schedule conflict management.
- Online examinations.
- Web Push, SMS, and Zalo notifications.
- Advanced custom reports and automated marketing ROI dashboards.

The interview included detailed future requirements for these features. Treat them as roadmap context, not MVP commitments.

---

## 4. Public website experience

Design the public-facing site to support discovery and enrollment.

### Recommended information architecture

- Home
- About the school
- Programs / Courses
- Course detail
- News / Announcements
- Contact / Consultation
- Enrollment / Application
- Login / Student Portal

The existing website must be inspected before replacing its information architecture. Preserve useful existing content and brand elements unless there is a clear UX reason to improve them.

### Public website requirements

- Clear school introduction and value proposition.
- Course/program cards with level, duration, format, schedule summary, and tuition information where available.
- Course detail page with description, learning outcomes, target audience, schedule, tuition, requirements, and enrollment CTA.
- News and announcements list/detail pages.
- Clear contact and consultation actions.
- Enrollment form that works for guests as well as signed-in students.
- Responsive navigation and accessible forms.
- Vietnamese and Japanese UI language support. The frontend owns UI translations; backend content may be localized.

### Guest enrollment

Visitors must be able to submit an enrollment application without first creating an account. Signed-in students should be able to use their profile data and track their applications.

Do not invent fields that have not been specified. Use sensible form design, group fields clearly, and label any proposed fields for later confirmation.

---

## 5. Student Portal

The student portal is a personalized workspace, not merely a profile page.

### Student dashboard

The dashboard should summarize:

- Current program, course, and class.
- Upcoming class schedule.
- Attendance summary / attendance rate, when data exists.
- Tuition balance and payment status.
- Recent exam results.
- Important notifications.
- Pending actions or documents that need attention.
- Quick links to common tasks.

Use a clear hierarchy. Prioritize urgent actions and upcoming events. Avoid overwhelming students with too many charts or cards.

### Student features in MVP

#### Profile
- View and update permitted personal information.
- Change password.
- Clearly distinguish editable fields from fields that require Admin support.
- Do not allow students to alter verified proficiency or enrollment documents without the appropriate review process.

#### Enrollment
- View applications and their statuses.
- Submit an application as a guest or signed-in student.
- Track review progress.
- Show understandable status labels and next steps.

The enrollment workflow is state-based. Possible statuses discussed include PENDING, APPROVED, CONFIRMED, COMPLETED, REJECTED, WAITLISTED, and CANCELLED. Display human-friendly localized labels; do not expose raw enum names as the primary UI.

#### Payments
- View tuition, outstanding balance, installment plan, payment history, and payment status.
- Provide a clear payment action where supported by the API.
- Show payment success/failure and transaction history.
- Separate invoices/receipts from individual payment transactions.
- Do not imply that a payment succeeded until the backend confirms it.

#### Schedule
- View upcoming classes in list and calendar-style formats if appropriate.
- MVP schedule data is basic date/time and class information.
- Include clear empty states when no schedule is assigned.

#### Attendance
- View attendance records and summary.
- Attendance statuses include present, absent, late, and excused.
- Students do not edit their own attendance records.

#### Exams and results
- View exam schedule, candidate information where applicable, scores, and results.
- MVP focuses on exam administration and score viewing, not online exam-taking.

#### Learning materials
- Browse materials organized by program, course, class, and session.
- Show file type, title, description, and access/download action.
- Respect document permissions.

#### Notifications
- In-site notification center and unread indicators.
- Email is also an MVP channel, but email composition/delivery is handled by backend services.
- Notification events include enrollment, payment, schedule, attendance, exam, certificate, and document requirements.
- Students can see notification history and navigate to relevant records.

### Future student experience

The long-term vision includes a Learning Portfolio with accumulated course history, JLPT certificates (N5–N1), placement results, teacher comments, attendance, and progress over time. Keep the UI architecture extensible, but do not overbuild this for MVP.

---

## 6. Admin workspace

The Admin experience should be task-oriented and efficient. Use a distinct admin layout with sidebar navigation, page title/breadcrumbs, contextual actions, filters, tables, and detail drawers/pages.

### Admin dashboard

The MVP dashboard should prioritize operational information:

- Student count and relevant enrollment summary.
- Applications awaiting review.
- Course/class overview.
- Upcoming class sessions.
- Attendance tasks or recent attendance summaries.
- Payment status summary.
- Upcoming exams and recent results.
- Recent notifications or important activity.

Only show metrics supported by available API data. Use realistic demo data for mockups, clearly marked as demo.

### MVP Admin modules

#### Student management
- Student list with search, filters, pagination, and status.
- Student detail with profile and relevant enrollment/learning records.
- Clear actions for viewing and editing permitted information.

#### Course and class management
- Organize learning offerings as Program → Course → Class.
- Course list/detail and class list/detail.
- Display capacity, schedule, enrollment count, and status where available.
- MVP has one branch, but avoid UI assumptions that prevent future multi-branch support.

#### Enrollment management
- Application queue with filters and status.
- Application detail with student information and submitted documents.
- Approve, reject, request additional documents, or waitlist where allowed.
- Display valid next actions according to the current state.
- Full-class waitlist is supported; Admin may review or adjust extra student approvals.
- Some classes may auto-confirm and others require manual review; the interface should reflect the actual class/course policy returned by the API.

#### Payment management
- View invoices, payment plans, transactions, failures, and refunds where applicable.
- Support default installment plans and per-student customization in the broader product vision.
- Distinguish invoice status from transaction status.
- Use confirmation dialogs for consequential financial actions.
- High-risk or over-limit financial operations may require Super Admin approval; show approval state when the API exposes it.
- Finance permissions are separated into viewing and editing.

#### Schedule management
- MVP: create and manage basic class date/time schedules.
- Later: rooms, teacher availability, holidays, make-up lessons, and conflict detection.
- Avoid presenting future capabilities as already available.

#### Attendance management
- Admin records attendance.
- Support present, absent, late, and excused.
- Make bulk entry efficient where appropriate.
- Provide confirmation and clear feedback for saved changes.

#### Exam management
- Create/manage exams, schedules, candidates, and scores.
- Provide result entry and result review screens.
- Online exams are out of MVP scope.

#### Learning materials
- Upload/manage documents and organize by program, course, class, and session.
- Show file metadata and access permissions.
- Students may upload required documents during enrollment/study; Admin reviews them.
- Document review states include pending, approved, needs additional documents, and rejected.
- UI must make permission scope clear.

#### Notifications
- Admin can send manual in-site/email notifications to all students, a class, or an individual.
- Provide recipient selection, message composition, preview, and confirmation.
- Triggered notifications are also generated by enrollment, payment, schedule, attendance, exams, and document workflows.
- Do not expose provider configuration to ordinary Admin users unless explicitly required.

#### Admin account management
- Super Admin manages Admin accounts.
- Initial Admin account is provisioned manually during setup.
- Super Admin has mandatory 2FA in the product requirements; Admin 2FA is optional.
- These security settings should be reflected in account/security screens where relevant.

---

## 7. Shared design system and interaction requirements

### Visual direction

Use a professional, modern education-management SaaS visual language:

- Calm, trustworthy, clean, and easy to scan.
- Consistent typography, spacing, colors, borders, radii, and icon style.
- Avoid excessive gradients, decorative animation, and dense dashboards.
- Use color semantically for status, not as decoration.
- Prioritize legibility and clear information hierarchy.
- Use Japanese-language context thoughtfully, without relying on stereotypes or excessive decorative motifs.

Do not invent an official school logo, brand colors, or brand guidelines. Inspect the existing frontend for brand assets and reuse them where appropriate. If no design system exists, propose a neutral design system and document assumptions.

### Responsive behavior

Support:
- Desktop admin workstations.
- Tablet layouts.
- Mobile student usage.

Admin tables should have responsive alternatives (horizontal scrolling only where unavoidable; prefer compact cards or prioritized columns on small screens). Student tasks should be mobile-friendly.

### Accessibility

- Semantic page structure and form labels.
- Keyboard-accessible navigation and dialogs.
- Visible focus states.
- Sufficient color contrast.
- Status must not be communicated by color alone.
- Accessible validation and error messages.
- Reasonable touch target sizes.

### Common UI states

Design all relevant screens with:
- Loading / skeleton.
- Empty state with a useful next action.
- Error state with retry guidance.
- Success feedback.
- Validation errors.
- Permission denied.
- Expired session / re-authentication.
- Disabled or unavailable actions with an explanation.
- Confirmation for destructive or financial actions.

### Data presentation

- Tables need search, filters, sorting, pagination, and row actions where appropriate.
- Forms need grouped fields, inline validation, helper text, and clear submit/cancel behavior.
- Detail pages should prioritize the most important information and show related records in tabs or sections.
- Use localized, human-friendly status labels.
- Dates and currency should respect the selected language/locale.
- Avoid hardcoding API response assumptions in UI components.

---

## 8. Localization

The application must support Vietnamese and Japanese.

- UI labels, navigation, buttons, validation, and status labels should use a frontend localization approach.
- Default language: Vietnamese, unless the existing frontend establishes a different convention.
- Backend content may be localized.
- Student email language is based on the student's preferred language, defaulting to Vietnamese; this is a backend behavior, but the profile UI should expose the preference if the API supports it.
- Use language-appropriate date, number, and currency formatting.
- Do not mix Vietnamese and Japanese labels within the same UI state unless the user explicitly switches language.

---

## 9. Frontend/API integration assumptions

The backend is planned separately using:

- Java Spring Boot.
- PostgreSQL.
- Layered Architecture.
- REST API under `/api/v1/`.
- JWT access token + refresh token.
- Role-based permissions and data ownership.
- Standardized success, error, validation, and pagination responses.
- Swagger/OpenAPI documentation.
- Frontend API Service Layer.
- TypeScript types aligned with backend DTOs.
- TanStack Query is preferred for server-state management, subject to the existing repository stack.

### Important integration rules

- Inspect the actual frontend repository before choosing or changing frameworks.
- Do not fabricate API endpoints, DTO fields, or response shapes.
- If backend API contracts are not available, create clearly marked mock interfaces and an `API_ASSUMPTIONS.md` file.
- Keep API calls out of presentational components.
- Centralize API client configuration and error handling.
- Handle authentication expiry and refresh behavior consistently.
- Never store secrets in frontend code.
- Never treat frontend role checks as backend security.
- Include loading, empty, error, and unauthorized states.

---

## 10. UX principles for complex workflows

### Enrollment state workflow

The UI must show the current status and only offer valid next actions. Do not allow arbitrary status changes from generic dropdowns. Use action-specific buttons and confirmation where needed.

### Payment workflow

Clearly distinguish:
- Tuition / amount due.
- Invoice.
- Payment plan / installment.
- Payment transaction.
- Refund.

Show a clear timeline or history. Do not conflate “invoice paid” with a single transaction if multiple installments exist.

### Document review workflow

Show document name/type, upload date, review status, reviewer feedback, and the next required action. Provide a clear way to upload a replacement or additional file when requested.

### Notifications

Show read/unread state, timestamp, category, and a link to the related item where available. Avoid duplicate or confusing alerts.

---

## 11. Suggested screen inventory

This is a starting inventory, not permission to build every future feature in MVP.

### Public
- Home
- About
- Program/course listing
- Course detail
- News listing
- News detail
- Contact / consultation
- Guest enrollment form
- Login
- Registration / email verification
- Password recovery

### Student
- Student dashboard
- Profile / account settings
- My applications
- Application detail
- My courses / class detail
- Payment overview
- Invoice / receipt detail
- Payment history
- Schedule
- Attendance history
- Exams / results
- Learning materials
- Notifications

### Admin / Super Admin
- Admin dashboard
- Student list / detail
- Program list / detail
- Course list / detail
- Class list / detail
- Enrollment application queue / detail
- Invoice list / detail
- Payment transaction list / detail
- Schedule management
- Attendance management
- Exam list / detail / score entry
- Learning material management
- Document review queue / detail
- Notification center / compose
- Admin account management (Super Admin)
- Account/security settings

---

## 12. Definition of done for UI design

A design is ready for implementation when:

1. MVP pages and navigation are mapped for Student, Admin, and Super Admin.
2. Primary user journeys are documented and can be completed end to end.
3. Each important page has loading, empty, error, success, and permission states as applicable.
4. Desktop and mobile behavior is specified.
5. Reusable components and design tokens are documented.
6. UI text is localizable in Vietnamese and Japanese.
7. All assumptions about missing API contracts are documented.
8. Future-phase features are separated from MVP.
9. No fake backend capability is presented as implemented.
10. The existing frontend's reusable assets and conventions have been inspected before major rewrites.

---

## 13. Priority user journeys

Design and validate these journeys first:

### Journey A — Guest discovers and applies
Home → course listing → course detail → guest application form → submission confirmation.

### Journey B — Student manages learning
Login → student dashboard → upcoming schedule → class detail → learning materials → attendance/result history.

### Journey C — Student pays tuition
Login → payment overview → invoice/installment detail → payment action → confirmed result → payment history.

### Journey D — Admin processes enrollment
Admin login → enrollment queue → application detail → review documents → approve / request documents / reject → confirmation and notification.

### Journey E — Admin operates a class
Admin dashboard → class detail → schedule → attendance entry → save → student-facing attendance update.

### Journey F — Admin manages an exam
Admin dashboard → exam list → exam detail → candidates → enter scores → publish/view results.

---

## 14. Assumptions that must remain explicit

- Existing frontend technology and design system must be confirmed by repository inspection.
- Exact backend endpoint paths and DTOs are not yet supplied by this interview.
- Exact school branding, logo, color palette, and official content must come from the existing website or project owner.
- Exact enrollment form fields, payment provider, and gateway-specific UI are not finalized.
- The current release is a demo/portfolio project, not a production school operation.
- One branch is in MVP; multi-branch support is a future architectural consideration.
