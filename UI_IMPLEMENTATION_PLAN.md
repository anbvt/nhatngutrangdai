# UI Implementation Plan

## Repository and stack

- React 18, Vite 6, JavaScript/JSX, and custom CSS.
- React Router handles browser routes; the existing framework and Vite entry point remain.
- Vietnamese is the default UI language; Vietnamese and Japanese public-page messages are in `src/i18n/messages.js`.
- The existing public brand mark, colors, typography, and demo screens are retained.
- No backend API contract or authentication/payment integration is available.

## Implemented in this increment

### Design foundation

- Added shared semantic color, spacing, border-radius, and focus tokens to `src/styles.css`.
- Added shared public page navigation/footer patterns, form controls, cards, empty states, and responsive layouts.
- Added a Vietnamese/Japanese language toggle and set the document language to match.
- Added reduced-motion handling and keyboard focus management for the existing demo dialogs.
- Isolated demo course and student records under `src/mocks/`; kept the public application preview behind `src/services/mockApplicationService.js`.

### Public experience

- `/` — existing public landing page and course highlights.
- `/about` — school introduction using only approved existing positioning; unconfirmed institutional details are explicitly withheld.
- `/courses` and `/courses/:courseId` — sample catalog and course detail pages.
- `/news` — honest empty state; no unapproved or invented school announcements.
- `/contact` and `/enroll` — accessible guest inquiry/application preview form.
- `/login` and `/register` — clearly disabled preview-only authentication screens.

### Existing demo screens

- `/demo/student` — existing sample student profile.
- `/demo/admin` — existing sample student management.

All demo data remains fictional and in-memory. Inquiry previews are not sent or persisted and must not be interpreted as submitted applications.

## Remaining MVP work

1. Complete localization coverage for the existing student/admin demo screens.
2. Build student dashboard, applications, course/class details, payment history, schedule, attendance, exams/results, materials, and notifications.
3. Build admin dashboard, program/course/class management, enrollment review, payment views, schedule/attendance, exams/results, material/document review, and notifications.
4. Add Super Admin account/permission screens and role-aware demo navigation.
5. Confirm the application form fields and backend contracts with the API owner before replacing the mock service.
6. Add focused automated tests and automated accessibility checks when a test setup is selected; the current checks are manual browser verification.

## Explicitly deferred

Advanced CRM/lead scoring, full CMS, ticket/SLA management, advanced analytics, public reviews, teacher portal, online exams, multi-branch operations, and complex room/teacher scheduling remain outside the MVP, per `UI_SCOPE_ROADMAP.md`.

## Run and verify

- `npm install`
- `npm run dev`
- `npm run build`

The deployed Vercel app uses an SPA rewrite so direct navigation to browser routes returns the Vite entry point. The current repository does not define lint, type-check, or test scripts.

The public routes were checked in a browser at 320, 390, 768, 1024, and 1440 px with no horizontal overflow. Route rendering, mobile navigation, Vietnamese/Japanese switching, translated field validation, preview-only form behavior, and demo-dialog keyboard focus/escape handling were also exercised manually. `npm audit --omit=dev` reported no production dependency advisories.

## Animation compatibility note

The current UI uses React 18. The published `@animate-ui/react` 2.x package requires React 19, so it was not force-installed and React was not upgraded solely to add animation. Existing and new transitions are restrained, respect `prefers-reduced-motion`, and use opacity/position rather than layout animation.
