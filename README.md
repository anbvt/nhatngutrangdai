# Nhật Ngữ Trảng Dài

Responsive React/Vite prototype for Japanese course discovery, guest inquiry previews, and student management.

## Run locally

```bash
npm install
npm run dev
```

## Routes

- `/` — public landing page.
- `/about`, `/courses`, `/courses/:courseId`, `/news`, `/contact`, and `/enroll` — public pages.
- `/login` and `/register` — disabled authentication previews.
- `/demo/student` and `/demo/admin` — in-memory student and administration demos.

## Demo behavior

All student, course, schedule, and tuition information is illustrative. Public inquiry forms are preview-only and do not send or persist an application. Student and admin edits remain in browser memory; there is no real authentication, backend, or payment integration.

The public interface supports Vietnamese (default) and Japanese. See `API_ASSUMPTIONS.md` and `UI_IMPLEMENTATION_PLAN.md` for current integration gaps and remaining MVP work.
