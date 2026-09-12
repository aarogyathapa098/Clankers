"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName =
  | "calendar"
  | "overview"
  | "timetable"
  | "exam"
  | "resources"
  | "faculty"
  | "settings"
  | "room"
  | "spark"
  | "alert"
  | "venue"
  | "user"
  | "module"
  | "search"
  | "chart";

type NavChild = {
  label: string;
  href: string;
  icon: IconName;
  badge?: string;
};

type NavSection = {
  label: string;
  href?: string;
  icon: IconName;
  children?: NavChild[];
};

const navSections: NavSection[] = [
  { label: "Overview", href: "/dashboard", icon: "overview" },
  {
    label: "Timetable",
    icon: "timetable",
    children: [
      { label: "Master Timetable", href: "/timetable", icon: "calendar" },
      { label: "Generate Schedule", href: "/timetable/new", icon: "spark" },
      { label: "Conflicts", href: "/dashboard/conflicts", icon: "alert" },
    ],
  },
  {
    label: "Examinations",
    icon: "exam",
    children: [
      { label: "Exam Schedule", href: "/examinations", icon: "calendar" },
      { label: "Venue Allocation", href: "/examinations/venues", icon: "venue" },
      { label: "Invigilators", href: "/examinations/invigilators", icon: "user", badge: "Coming Soon" },
    ],
  },
  {
    label: "Resources",
    icon: "resources",
    children: [
      { label: "Rooms", href: "/rooms", icon: "room" },
      { label: "Room Availability", href: "/rooms/availability", icon: "calendar" },
    ],
  },
  {
    label: "Faculty",
    icon: "faculty",
    children: [
      { label: "Workload", href: "/workload", icon: "faculty" },
      { label: "Module Assignments", href: "/modules", icon: "module" },
    ],
  },
  {
    label: "Lookups",
    icon: "search",
    children: [
      { label: "Faculty Schedule", href: "/lookups/faculty", icon: "user" },
      { label: "Cohort Schedule", href: "/lookups/cohort", icon: "module" },
      { label: "Room Search", href: "/lookups/room", icon: "room" },
    ],
  },
  {
    label: "Analytics",
    icon: "chart",
    children: [
      { label: "Utilization & Metrics", href: "/analytics/utilization", icon: "spark" },
    ],
  },
];

function isActive(pathname: string, href?: string) {
  if (!href) {
    return false;
  }

  return pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
}

function Icon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons: Record<IconName, React.ReactNode> = {
    calendar: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    overview: (
      <svg {...common}>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </svg>
    ),
    timetable: (
      <svg {...common}>
        <path d="M8 2v4M16 2v4" />
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 14h8M8 18h5" />
      </svg>
    ),
    exam: (
      <svg {...common}>
        <path d="m4 10 8-4 8 4-8 4-8-4Z" />
        <path d="M6 12v4c2 2 10 2 12 0v-4M20 10v6" />
      </svg>
    ),
    resources: (
      <svg {...common}>
        <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
        <path d="M9 10h.01M15 10h.01" />
      </svg>
    ),
    faculty: (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    settings: (
      <svg {...common}>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06a2.1 2.1 0 1 1-2.97 2.97l-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.08 1.65V21a2.1 2.1 0 1 1-4.2 0v-.09A1.8 1.8 0 0 0 8.43 19.3a1.8 1.8 0 0 0-2 .36l-.06.06a2.1 2.1 0 1 1-2.97-2.97l.06-.06a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.65-1.08H2a2.1 2.1 0 1 1 0-4.2h.09A1.8 1.8 0 0 0 3.7 8.43a1.8 1.8 0 0 0-.36-2l-.06-.06A2.1 2.1 0 1 1 6.25 3.4l.06.06a1.8 1.8 0 0 0 2 .36H8.4A1.8 1.8 0 0 0 9.5 2.17V2a2.1 2.1 0 1 1 4.2 0v.09a1.8 1.8 0 0 0 1.08 1.65 1.8 1.8 0 0 0 2-.36l.06-.06a2.1 2.1 0 1 1 2.97 2.97l-.06.06a1.8 1.8 0 0 0-.36 2v.09A1.8 1.8 0 0 0 21.83 9.5H22a2.1 2.1 0 1 1 0 4.2h-.09A1.8 1.8 0 0 0 19.4 15Z" />
      </svg>
    ),
    room: (
      <svg {...common}>
        <path d="M4 21V5a2 2 0 0 1 2-2h10v18" />
        <path d="M16 7h2a2 2 0 0 1 2 2v12M9 11h.01M9 15h.01M12 11h.01M12 15h.01M4 21h18" />
      </svg>
    ),
    spark: (
      <svg {...common}>
        <path d="m12 2 1.7 5.2L19 9l-5.3 1.8L12 16l-1.7-5.2L5 9l5.3-1.8L12 2ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
      </svg>
    ),
    alert: (
      <svg {...common}>
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.3 4.3 2.8 17.2A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.8L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      </svg>
    ),
    venue: (
      <svg {...common}>
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-8h6v8M9 9h6" />
      </svg>
    ),
    user: (
      <svg {...common}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </svg>
    ),
    module: (
      <svg {...common}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    ),
    search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    chart: (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  };

  return <span className="nav-icon">{icons[name]}</span>;
}

export function AcademicSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Timetable: true,
    Examinations: true,
    Resources: true,
    Faculty: true,
  });

  const shellClassName = useMemo(
    () => `dashboard-shell${collapsed ? " sidebar-collapsed" : ""}${mobileOpen ? " sidebar-mobile-open" : ""}`,
    [collapsed, mobileOpen],
  );

  return (
    <div className={shellClassName}>
      <button
        className="mobile-menu-button"
        type="button"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <Icon name="overview" />
      </button>

      <aside className="academic-sidebar" aria-label="Academic planning navigation">
        <div className="sidebar-brand">
          <div className="brand-icon" aria-hidden="true">
            <Icon name="calendar" />
          </div>
          <div className="brand-text">
            <strong>Islington College</strong>
            <span>Academic Planning</span>
          </div>
          <button
            className="collapse-button"
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
          >
            <span aria-hidden="true">{collapsed ? ">" : "<"}</span>
          </button>
        </div>

        <nav className="sidebar-nav">
          {navSections.map((section) => {
            const sectionActive =
              isActive(pathname, section.href) ||
              Boolean(section.children?.some((child) => isActive(pathname, child.href)));
            const expanded = openSections[section.label];

            if (!section.children) {
              return (
                <Link
                  className={`nav-item${sectionActive ? " active" : ""}`}
                  href={section.href ?? "#"}
                  key={section.label}
                  title={section.label}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon name={section.icon} />
                  <span className="nav-label">{section.label}</span>
                </Link>
              );
            }

            return (
              <div className={`nav-section${sectionActive ? " active-parent" : ""}`} key={section.label}>
                <button
                  className={`nav-item nav-section-button${sectionActive ? " active" : ""}`}
                  type="button"
                  title={section.label}
                  aria-expanded={expanded}
                  onClick={() =>
                    setOpenSections((current) => ({
                      ...current,
                      [section.label]: !current[section.label],
                    }))
                  }
                >
                  <Icon name={section.icon} />
                  <span className="nav-label">{section.label}</span>
                  <span className="nav-chevron" aria-hidden="true">
                    {expanded ? "^" : "v"}
                  </span>
                </button>

                <div className="submenu" data-open={expanded}>
                  {section.children.map((child) => (
                    <Link
                      className={`submenu-item${isActive(pathname, child.href) ? " active" : ""}`}
                      href={child.href}
                      key={child.label}
                      title={`${section.label}: ${child.label}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon name={child.icon} />
                      <span className="nav-label">{child.label}</span>
                      {child.badge ? <span className="nav-badge">{child.badge}</span> : null}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link className={`nav-item${isActive(pathname, "/settings") ? " active" : ""}`} href="/settings" title="Settings">
            <Icon name="settings" />
            <span className="nav-label">Settings</span>
          </Link>
        </div>
      </aside>

      <button
        className="sidebar-scrim"
        type="button"
        aria-label="Close sidebar"
        onClick={() => setMobileOpen(false)}
      />
    </div>
  );
}
