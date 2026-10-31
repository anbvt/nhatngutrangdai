# Copilot Task: Design the Web UI for a Japanese Language School Management System

You are acting as a senior product designer and frontend engineer.

Read `UI_REQUIREMENTS.md` completely before changing code. Treat it as the approved product requirements source. Read `UI_SCOPE_ROADMAP.md` and `API_ASSUMPTIONS.md` as supporting documents.

## Your mission

Design and implement a polished, responsive web interface for the Japanese Language School Management System, using the existing frontend repository as the starting point.

The backend is a separate Spring Boot REST API planned under `/api/v1/`. Do not implement backend code in this task.

## Mandatory first steps

1. Inspect the repository structure, package manager, framework, routing, styling system, existing components, assets, and current website pages.
2. Inspect the existing website experience and preserve useful content, brand assets, and working functionality.
3. Summarize the current frontend stack and propose an implementation plan before making broad structural changes.
4. Identify missing API contracts. Do not invent endpoints or DTO fields.
5. Create/update `API_ASSUMPTIONS.md` with all mock data, assumed fields, and integration gaps.

## Product scope

Implement the MVP first:
- Public website and guest enrollment.
- Authentication and role-aware navigation.
- Student dashboard and student self-service.
- Admin dashboard and core operations.
- Students, programs, courses, classes.
- Enrollment review.
- Tuition/invoice/payment history UI.
- Basic schedules.
- Attendance.
- Exams and results.
- Learning materials.
- Notifications.

Do not build advanced CRM, lead scoring, CMS, ticket/SLA management, advanced analytics, public reviews, teacher portal, online exams, or multi-branch administration as MVP features. Keep the architecture extensible and list these as later phases.

## UX and visual quality

Create a professional education SaaS interface:
- Clear information hierarchy and calm visual style.
- Consistent design tokens and reusable components.
- Responsive desktop, tablet, and mobile layouts.
- Strong accessibility: semantic HTML, keyboard support, visible focus, labels, contrast.
- Thoughtful loading, empty, error, success, validation, and permission states.
- Search, filters, sorting, and pagination for data-heavy lists.
- Confirmation for destructive or financial actions.
- Vietnamese and Japanese localization.
- Avoid placeholder-looking pages, excessive gradients, arbitrary icons, and decorative clutter.

Do not invent official branding. Reuse existing brand assets after inspecting the repository. If branding is missing, document a neutral proposed visual system and its assumptions.

## Implementation rules

- Follow the repository's actual framework and conventions. Do not migrate frameworks without a strong reason and explicit explanation.
- Keep API calls in a centralized API/service layer, not inside presentational components.
- Use TypeScript types where the repository supports TypeScript.
- Prefer TanStack Query for server state if compatible with the current stack; do not add it blindly.
- Use mock data only when API contracts are unavailable. Clearly isolate mocks so they can be replaced.
- Do not fabricate real API endpoints, payment integrations, or authentication behavior.
- Do not put secrets in frontend code.
- Frontend role checks are for UX only; backend authorization is authoritative.
- Use human-readable localized labels for statuses, not raw enum constants.
- Ensure the interface does not claim a payment or application action succeeded until a confirmed result is available.

## Expected deliverables

1. A concise repository and stack assessment.
2. A page/navigation map for Public, Student, Admin, and Super Admin.
3. A reusable design system (tokens, typography, spacing, colors, components).
4. Implemented MVP pages and primary user journeys.
5. Responsive and accessible UI states.
6. Vietnamese and Japanese localization structure.
7. `API_ASSUMPTIONS.md` documenting mock contracts and unresolved backend integration.
8. `UI_IMPLEMENTATION_PLAN.md` describing completed work, remaining work, and how to run the project.

## Work sequence

### Phase 1 — Audit and plan
Inspect first. Report the stack, current pages, reusable assets, risks, and proposed plan. Do not delete or replace existing pages before understanding them.

### Phase 2 — Information architecture and design system
Define route groups and navigation:
- Public
- Student
- Admin
- Super Admin

Create reusable layout primitives, form controls, tables, status badges, dialogs, page headers, cards, and feedback states.

### Phase 3 — MVP public experience
Implement public navigation, home, course listing/detail, news/contact pages if supported by existing content, and guest enrollment.

### Phase 4 — Student Portal
Implement student dashboard, profile, applications, courses/classes, payments, schedule, attendance, exams/results, materials, and notifications.

### Phase 5 — Admin workspace
Implement dashboard, student/course/class management, enrollment review, payment views, schedule, attendance, exams, materials/documents, and notifications.

### Phase 6 — Quality pass
Test responsive layouts, localization, keyboard navigation, validation, loading/empty/error states, and route permissions. Run the repository's available lint, type-check, and build commands.

## Final response format

When finished, report:
- What was implemented.
- Main routes/pages.
- Reusable components and design system.
- Mock data/API assumptions.
- Tests/build checks performed and results.
- Known gaps and recommended next steps.

Do not claim a feature is integrated with the backend if it is only mocked.
