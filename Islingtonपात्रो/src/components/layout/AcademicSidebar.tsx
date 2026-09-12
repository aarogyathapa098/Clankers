"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName =
  | "logo"
  | "overview"
  | "timetable"
  | "exam"
  | "resources"
  | "faculty"
  | "lookups"
  | "analytics"
  | "settings"
  | "help"
  | "chevron";

type NavChild = {
  label: string;
  href: string;
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
      { label: "Master Timetable", href: "/timetable" },
      { label: "Generate Schedule", href: "/timetable/new" },
      { label: "Conflicts", href: "/dashboard/conflicts" },
    ],
  },
  {
    label: "Examinations",
    icon: "exam",
    children: [
      { label: "Exam Schedule", href: "/examinations" },
      { label: "Venue Allocation", href: "/examinations/venues" },
      { label: "Invigilators", href: "/examinations/invigilators" },
    ],
  },
  {
    label: "Resources",
    icon: "resources",
    children: [
      { label: "Rooms", href: "/rooms" },
      { label: "Room Availability", href: "/rooms/availability" },
    ],
  },
  {
    label: "Faculty",
    icon: "faculty",
    children: [
      { label: "Workload", href: "/workload" },
      { label: "Module Assignments", href: "/modules" },
    ],
  },
  {
    label: "Lookups",
    icon: "lookups",
    children: [
      { label: "Faculty Schedule", href: "/lookups/faculty" },
      { label: "Cohort Schedule", href: "/lookups/cohort" },
      { label: "Room Search", href: "/lookups/room" },
    ],
  },
  {
    label: "Analytics",
    icon: "analytics",
    children: [
      { label: "Utilization & Metrics", href: "/analytics/utilization" },
    ],
  },
];

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
}

function SidebarIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.85,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    style: { width: "19px", height: "19px", flexShrink: 0 },
  };

  switch (name) {
    case "logo":
      return (
        <svg {...common} style={{ width: "26px", height: "26px" }}>
          <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
          <path d="M12 21V12" />
          <path d="M3.5 8.5 12 13l8.5-4.5" />
        </svg>
      );
    case "overview":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "timetable":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "exam":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      );
    case "resources":
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
        </svg>
      );
    case "faculty":
      return (
        <svg {...common}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "lookups":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...common}>
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common} style={{ width: "13px", height: "13px" }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
  }
}

export function AcademicSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Timetable: true,
    Examinations: true,
    Resources: true,
    Faculty: true,
    Lookups: true,
    Analytics: true,
  });

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "258px",
        minWidth: "258px",
        zIndex: 40,
        backgroundColor: "#0C234B",
        backgroundImage: "linear-gradient(180deg, #0d2652 0%, #0a1f42 100%)",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "none",
        padding: "18px 14px 20px",
        boxSizing: "border-box",
        borderRight: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      aria-label="Academic Planning Navigation"
    >
      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "0 6px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
          marginBottom: "14px",
        }}
      >
        <div style={{ color: "#FFFFFF", display: "flex", alignItems: "center" }}>
          <SidebarIcon name="logo" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700, lineHeight: 1.2 }}>
            Academic Planning
          </span>
          <span style={{ color: "#8EA7CA", fontSize: "12px", fontWeight: 400 }}>
            Plan Smarter
          </span>
        </div>
      </div>

      {/* Nav list */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1 }}>
        {navSections.map((section) => {
          const isCurrentActive =
            isActive(pathname, section.href) ||
            Boolean(section.children?.some((child) => isActive(pathname, child.href)));
          const expanded = openSections[section.label] ?? false;

          if (!section.children) {
            const isOverview = section.label === "Overview";
            const isSelected = isOverview || isCurrentActive;

            return (
              <Link
                key={section.label}
                href={section.href ?? "#"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "38px",
                  padding: "0 12px",
                  borderRadius: "7px",
                  backgroundColor: isSelected ? "#1677F5" : "transparent",
                  color: isSelected ? "#FFFFFF" : "#CBDCF7",
                  fontSize: "13.5px",
                  fontWeight: isSelected ? 600 : 500,
                  textDecoration: "none",
                  transition: "background-color 0.15s",
                }}
              >
                <SidebarIcon name={section.icon} />
                <span>{section.label}</span>
              </Link>
            );
          }

          return (
            <div key={section.label} style={{ display: "flex", flexDirection: "column" }}>
              <button
                type="button"
                onClick={() =>
                  setOpenSections((curr) => ({ ...curr, [section.label]: !curr[section.label] }))
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "36px",
                  padding: "0 12px",
                  borderRadius: "6px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#CBDCF7",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                  <SidebarIcon name={section.icon} />
                  <span>{section.label}</span>
                </div>
                <div
                  style={{
                    color: "#7C95BC",
                    transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "transform 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SidebarIcon name="chevron" />
                </div>
              </button>

              {expanded && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    marginLeft: "21px",
                    paddingLeft: "15px",
                    borderLeft: "1px solid rgba(142, 167, 202, 0.22)",
                    marginTop: "2px",
                    marginBottom: "4px",
                  }}
                >
                  {section.children.map((child) => {
                    const childActive = isActive(pathname, child.href);
                    return (
                      <Link
                        key={child.label}
                        href={child.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "30px",
                          color: childActive ? "#FFFFFF" : "#94ADD1",
                          fontSize: "12.5px",
                          fontWeight: childActive ? 600 : 400,
                          textDecoration: "none",
                          transition: "color 0.15s",
                        }}
                      >
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(142, 167, 202, 0.18)",
            margin: "14px 6px 10px",
          }}
        />

        {/* Footer items */}
        <Link
          href="/settings"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            height: "36px",
            padding: "0 12px",
            borderRadius: "6px",
            color: "#CBDCF7",
            fontSize: "13.5px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <SidebarIcon name="settings" />
          <span>Settings</span>
        </Link>
        <Link
          href="/help"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            height: "36px",
            padding: "0 12px",
            borderRadius: "6px",
            color: "#CBDCF7",
            fontSize: "13.5px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <SidebarIcon name="help" />
          <span>Help & Support</span>
        </Link>
      </nav>
    </aside>
  );
}
