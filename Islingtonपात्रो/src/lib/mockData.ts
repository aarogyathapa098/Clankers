export const mockFaculty = [
  { id: 1, name: "Dr. H. Aris", department: "Computer Science", maxHours: 18, assignedHours: 18.0 },
  { id: 2, name: "Dr. K. Chen", department: "Artificial Intelligence", maxHours: 20, assignedHours: 22.0 },
  { id: 3, name: "Prof. M. Lee", department: "Data Science", maxHours: 20, assignedHours: 20.0 },
  { id: 4, name: "Dr. M. Vance", department: "Software Engineering", maxHours: 20, assignedHours: 17.0 },
  { id: 5, name: "Prof. S. Silva", department: "Information Systems", maxHours: 18, assignedHours: 18.0 },
  { id: 6, name: "Prof. P. Novak", department: "Mathematics", maxHours: 16, assignedHours: 14.0 },
  { id: 7, name: "Dr. K. Connor", department: "Robotics & IoT", maxHours: 19, assignedHours: 13.0 },
];

export const mockModules = [
  { id: 1, code: "CS205", name: "Data Structures & Algorithms", facultyId: 1, cohort: "CS-Y2-A", hours: 4.5, scheduled: 3, totalSessions: 3 },
  { id: 2, code: "AI301", name: "Applied Machine Learning", facultyId: 3, cohort: "AI-Y3-B", hours: 6.0, scheduled: 2, totalSessions: 4 },
  { id: 3, code: "SE302", name: "Software Architecture", facultyId: 4, cohort: "SE-Y3-ALL", hours: 0.0, scheduled: 0, totalSessions: 0 },
  { id: 4, code: "MA101", name: "Mathematics I", facultyId: 6, cohort: "CS-Y1-C", hours: 4.0, scheduled: 2, totalSessions: 2 },
  { id: 5, code: "DB204", name: "Relational Database Systems", facultyId: 4, cohort: "CS-Y2-B", hours: 4.0, scheduled: 2, totalSessions: 2 },
];

export const mockRooms = [
  { id: "R404", name: "Room 404", location: "Bldg 4 / FL 4", type: "CLASSROOM", capacity: 40, occupancy: 88.2, status: "available" },
  { id: "HA", name: "Hall A", location: "Bldg C / Main", type: "EXAM_HALL", capacity: 200, occupancy: 24.8, status: "occupied" },
  { id: "R101", name: "Room 101", location: "Bldg 1 / FL 1", type: "CLASSROOM", capacity: 80, occupancy: 88.4, status: "available" },
  { id: "L201", name: "Lab 201", location: "Tech Quad / FL 2", type: "LAB", capacity: 30, occupancy: 52.0, status: "available" },
  { id: "AUD1", name: "Auditorium 1", location: "Main Quad / Gnd", type: "EXAM_HALL", capacity: 350, occupancy: 18.0, status: "available" },
  { id: "R204", name: "Room 204", location: "Bldg 4 / FL 2", type: "CLASSROOM", capacity: 45, occupancy: 71.2, status: "available" },
  { id: "L4", name: "Lab 4", location: "Bldg 3 / FL 1", type: "LAB", capacity: 70, occupancy: 21.0, status: "occupied" },
];

export function getUtilizationStatus(assigned: number, max: number) {
  const ratio = assigned / max;
  if (ratio > 1) return { key: "overload", label: "OVERLOAD", cssClass: "error" };
  if (ratio >= 0.8) return { key: "near", label: "NEAR LIMIT", cssClass: "warning" };
  return { key: "normal", label: "NORMAL", cssClass: "success" };
}
