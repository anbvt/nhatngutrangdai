# API Assumptions and Integration Gaps

This file prevents the frontend from accidentally treating guesses as confirmed backend contracts.

## Confirmed backend direction

- Separate Java Spring Boot backend.
- PostgreSQL.
- Layered Architecture.
- REST API prefix: `/api/v1/`.
- JWT access token and refresh token.
- RBAC with Student, Admin, Super Admin roles, plus permission and data-ownership checks.
- Standardized success/error/validation/pagination response shapes.
- Swagger/OpenAPI planned.
- Frontend API Service Layer.
- TypeScript types should align with backend DTOs.
- TanStack Query is preferred if compatible with the current frontend.

## Not yet confirmed

The requirements interview did not finalize:
- Exact endpoint paths and HTTP methods.
- Exact request/response DTO properties.
- Exact pagination format and filter parameter names.
- Exact token refresh transport and cookie/storage details.
- Exact payment provider, redirect/3DS behavior, webhook lifecycle, and refund endpoints.
- Exact enrollment form fields and required documents by course.
- Exact course/class scheduling DTOs.
- Exact upload limits, supported file types, and file delivery URLs.
- Exact notification preference and read-state endpoints.
- Exact error codes and validation error structure.
- Exact public content API and localized content format.

## Rules for mock data

1. Put mock data in dedicated files/modules.
2. Label mock data and demo-only behavior clearly in code comments and UI where appropriate.
3. Define provisional TypeScript interfaces as `Mock...` or document them as provisional.
4. Do not hardcode mock data inside reusable UI components.
5. Keep components ready to switch to real API services.
6. Do not display a successful payment unless the mocked or real service explicitly returns success.
7. Do not invent a live payment gateway.

## Suggested provisional domain concepts

These are domain concepts, not finalized DTOs:
- User / Student
- Program
- Course
- Class
- EnrollmentApplication
- Invoice
- PaymentPlan
- PaymentTransaction
- ClassSchedule
- AttendanceRecord
- Exam
- ExamCandidate / ExamResult
- LearningMaterial
- StudentDocument
- Notification

Confirm actual properties and relationships against the backend API specification when it becomes available.

## Current frontend demo behavior

- The existing student-management view uses five fictional, in-memory student records. Their fields reflect the current UI only and are not proposed backend DTOs.
- The public course cards use three illustrative courses (N5 beginner, conversation, JLPT N4), with sample duration, weekly schedule, and tuition values. These values are not confirmed school offerings or prices.
- Guest inquiry and enrollment screens currently validate input locally and display an explicit preview-only notice. They do not send, retain, or confirm an application.
- Login and registration screens are intentionally disabled previews; no authentication operation occurs.
- News displays an empty state because no approved announcement content or content API contract was supplied.
- Mock fixtures live under `src/mocks/`; the preview-only application behavior lives in `src/services/mockApplicationService.js`.

## Current form fields needing confirmation

The public preview reuses the existing prototype's name, phone, email, and course-interest fields. A free-text learning-goal field is optional and provisional. Confirm required fields, consent/privacy text, document requirements, and validation rules before connecting a real enrollment API.

## Integration boundary

React Router routes are frontend navigation only. No endpoint paths, request/response DTOs, authentication transport, persistence, or payment behavior have been implemented. Replace the preview service only after the backend contract and API owner have been confirmed.
