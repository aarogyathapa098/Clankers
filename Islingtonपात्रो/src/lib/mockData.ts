// Mock faculty data for workload and module assignment pages
export const mockFaculty = [
  {
    id: "fac-1",
    name: "Dr. A. Smith",
    department: "Computer Science",
    maxHours: 20,
    assignedHours: 16,
    contractType: "Full-time",
  },
  {
    id: "fac-2",
    name: "Prof. J. Lee",
    department: "Software Engineering",
    maxHours: 20,
    assignedHours: 18,
    contractType: "Full-time",
  },
  {
    id: "fac-3",
    name: "Dr. K. Chen",
    department: "Artificial Intelligence",
    maxHours: 20,
    assignedHours: 22,
    contractType: "Full-time",
  },
  {
    id: "fac-4",
    name: "Dr. R. Kumar",
    department: "Data Science",
    maxHours: 20,
    assignedHours: 14,
    contractType: "Full-time",
  },
  {
    id: "fac-5",
    name: "Ms. P. Sharma",
    department: "Web Technologies",
    maxHours: 16,
    assignedHours: 12,
    contractType: "Part-time",
  },
];

// Mock module assignment data
export const mockModules = [
  {
    id: "mod-1",
    code: "CS205",
    name: "Database Systems",
    facultyId: "fac-1",
    cohort: "Group A",
    hours: 3,
    scheduled: 2,
    totalSessions: 3,
  },
  {
    id: "mod-2",
    code: "AI301",
    name: "Advanced Neural Nets",
    facultyId: "fac-2",
    cohort: "Group B",
    hours: 4,
    scheduled: 4,
    totalSessions: 4,
  },
  {
    id: "mod-3",
    code: "DB204",
    name: "Data Modelling",
    facultyId: "fac-4",
    cohort: "Group A",
    hours: 3,
    scheduled: 0,
    totalSessions: 3,
  },
  {
    id: "mod-4",
    code: "SE302",
    name: "Software Engineering",
    facultyId: "fac-1",
    cohort: "Group C",
    hours: 4,
    scheduled: 1,
    totalSessions: 4,
  },
  {
    id: "mod-5",
    code: "WT201",
    name: "Web Technologies",
    facultyId: "fac-5",
    cohort: "Group B",
    hours: 3.5,
    scheduled: 3,
    totalSessions: 3,
  },
  {
    id: "mod-6",
    code: "CV301",
    name: "Computer Vision",
    facultyId: "fac-3",
    cohort: "Group A",
    hours: 5,
    scheduled: 5,
    totalSessions: 5,
  },
  {
    id: "mod-7",
    code: "ML201",
    name: "Foundations of ML",
    facultyId: "fac-3",
    cohort: "Group C",
    hours: 4,
    scheduled: 0,
    totalSessions: 4,
  },
];

// Utilization status helper
export function getUtilizationStatus(assigned: number, max: number) {
  const pct = max > 0 ? (assigned / max) * 100 : 0;

  if (pct > 100) {
    return { key: "overload" as const, label: "Overload", cssClass: "overload" };
  }
  if (pct >= 80) {
    return { key: "near" as const, label: "Near Limit", cssClass: "near-limit" };
  }
  return { key: "normal" as const, label: "Normal", cssClass: "normal" };
}
