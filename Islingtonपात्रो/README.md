# Islington पात्रो — Academic Planning & Scheduling

An academic scheduling dashboard built for the Islington College hackathon. The application brings timetable planning, examination visibility, room availability, faculty workload, and role-specific workspaces into one responsive Next.js interface.

The project includes a deterministic constraint-based schedule generator. It uses the existing modules, cohorts, faculty, rooms, time slots, and sessions to fill missing teaching requirements without inventing conflict-free results.

## Core features

- Role-specific navigation and protected pages for **Admin**, **Student**, **Faculty**, and **SSD**
- Master weekly timetable with create, edit, and delete workflows
- Greedy automatic schedule generation using existing academic data
- Hard prevention of room, lecturer, and cohort double-booking
- Room capacity and room/time-slot availability enforcement
- Clear generated, unscheduled, conflict, and capacity-violation totals
- Student timetable containing relevant classes and scheduled examinations
- Faculty dashboard and assigned-class schedule
- SSD room availability and booking workspace
- Admin module assignments, faculty workload, examinations, rooms, and access overview
- Supabase-backed data access with isolated demo data when the database is unavailable or unseeded

## Technology

- Next.js 15 App Router
- React 19
- TypeScript
- Supabase/PostgreSQL
- Plain CSS using the existing Islington dashboard design system

## Quick start

### Prerequisites

- Node.js 20 or newer
- npm
- A Supabase project (optional for the built-in demo-data mode)

### Installation

```bash
npm install
```

Create a local `.env` file when connecting Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Never commit `.env` or service-role credentials. If Supabase is not configured or contains no usable rows, the repository serves its isolated demo dataset so the hackathon workflow remains runnable.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To use the hackathon demo port shown in this project’s walkthrough:

```bash
npm run dev -- -p 3001
```

Production verification:

```bash
npm run build
npm start
```

## Database setup

For a new Supabase project, run these SQL files in order:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/seed.sql`

`supabase/fix_rls_and_tables.sql` is a development utility for the supplied prototype environment; review it before applying it to another database.

The primary tables are `programme`, `module`, `lecturer`, `section`, `student`, `room`, `time_slots`, `session`, `conflict_schedules`, `invigilator`, and `exam_seat_plans`.

## Generate Schedule workflow

Open **Admin → Timetable** and select **Generate Schedule**. The application:

1. Loads current modules, cohorts, lecturers, rooms, time slots, and sessions.
2. Calculates missing weekly sessions without duplicating completed requirements.
3. Orders requirements by constraint pressure (fewest suitable rooms and largest cohorts first).
4. Selects the best-fitting available room and least-loaded available lecturer.
5. Rejects any assignment that clashes with an existing room, lecturer, or cohort booking.
6. Runs a final validation pass and saves only a conflict-free generated set.
7. Refreshes the existing timetable and displays real totals and unscheduled reasons.

The generator enforces:

- no faculty double-booking;
- no cohort/section double-booking;
- no room double-booking;
- room capacity greater than or equal to cohort size;
- active and available rooms;
- active and available class time slots;
- explicit unscheduled results when no valid assignment exists.

Generation is idempotent: running it again recognizes already-covered requirements instead of adding duplicate sessions.

### API

```http
POST /api/timetable/generate
Content-Type: application/json

{}
```

Optional filters:

```json
{
  "programmeId": "programme-id",
  "semester": "Semester 1"
}
```

The response contains `totalSessions`, `totalScheduled`, `generatedCount`, `unscheduled`, `totalConflicts`, `capacityViolations`, `conflictDetails`, and the generated `sessions`.

## Roles and access

| Role | Main capabilities |
| --- | --- |
| Admin | Manage the timetable, generate schedules, manage rooms/modules, view workload, examinations, and role access |
| Student | View their dashboard, cohort timetable, examinations, and room availability; no booking or admin actions |
| Faculty | View their dashboard, assigned schedule, and room availability; no booking or admin actions |
| SSD | View the SSD dashboard, room inventory/availability, and manage room bookings |

The sidebar role switcher is a hackathon demo identity selector. Route and mutation rules are also enforced by middleware, but production deployment should replace the selector with trusted Supabase authentication and server-derived roles.

## Important routes

| Route | Purpose |
| --- | --- |
| `/dashboard` | Admin planning overview |
| `/timetable` | Master timetable and schedule generator |
| `/examinations` | Examination scheduling and student-visible exam data |
| `/rooms` | Room inventory |
| `/rooms/availability` | Availability search and timetable handoff |
| `/modules` | Module assignment overview |
| `/workload` | Faculty workload overview |
| `/student/dashboard` | Student workspace |
| `/student/timetable` | Cohort timetable |
| `/faculty/dashboard` | Faculty workspace |
| `/faculty/schedule` | Assigned teaching schedule |
| `/ssd/dashboard` | SSD workspace |
| `/ssd/bookings` | SSD booking management |

## Project structure

```text
src/
├── app/                 # App Router pages and API endpoints
├── components/          # Layout, role, SSD, and timetable UI
├── lib/                 # Repository, role rules, conflict and schedule logic
├── middleware.ts        # Page and API role enforcement
├── models/              # Domain model definitions
├── services/            # Supabase-oriented services
└── types/               # Shared application types
supabase/
├── migrations/          # Database schema
├── seed.sql             # Hackathon demonstration records
└── fix_rls_and_tables.sql
```

## Demo checklist

1. Start the app and use the sidebar selector to open each role workspace.
2. As Admin, open `/timetable` and click **Generate Schedule**.
3. Confirm that the result reports actual scheduled, unscheduled, conflict, and capacity counts.
4. Click a timetable session to review its module, cohort, lecturer, room, and status.
5. Try creating a duplicate room, faculty, or cohort booking and confirm that saving is blocked with a precise message.
6. Switch to Student and Faculty to confirm they see only their relevant schedules and no administrative booking controls.

## Notes

- Detailed lecturer availability is enforced when represented by active lecturer data; the supplied schema does not currently contain a separate lecturer-availability table.
- Demo fallback sessions live in the running server process. Restarting without a usable Supabase connection resets them to the seeded in-code state.
- The generator is intentionally deterministic and constraint-based. It does not use machine learning or claim optimization beyond the implemented hard constraints and best-fit ordering.
