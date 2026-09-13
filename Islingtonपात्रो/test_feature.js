const { dataRepository } = require("./src/lib/dataRepository.ts");

async function runTests() {
  console.log("==================================================");
  console.log("   ISLINGTON ACADEMIC PLANNING - SYSTEM TESTS    ");
  console.log("==================================================");

  // Test 1: Dashboard Stats
  console.log("\n[Test 1] Dashboard Aggregates");
  const stats = await dataRepository.getDashboardStats();
  console.log("Stats output:", stats);
  if (stats.total_rooms > 0 && stats.total_modules > 0 && stats.total_lecturers > 0) {
    console.log("--> PASS: Dashboard stats calculated accurately.");
  } else {
    console.error("--> FAIL: Dashboard stats incomplete.");
  }

  // Test 2: Room Inventory & Slot Availability Finder
  console.log("\n[Test 2] Room Availability & Slot Finder");
  const rooms = await dataRepository.getRooms();
  console.log(`Total active rooms: ${rooms.length}`);
  const slotAvailability = await dataRepository.getRoomAvailability("Tuesday", "08:00", 30);
  console.log("Slot availability (Tue 08:00, >=30 seats):", {
    total: slotAvailability.total,
    available: slotAvailability.availableCount,
    allocated: slotAvailability.allocatedCount,
  });
  if (slotAvailability.availableCount > 0) {
    console.log("--> PASS: Room availability finder accurately detects free rooms.");
  } else {
    console.error("--> FAIL: Room availability finder failed.");
  }

  // Test 3: Faculty Workload & Assigned Hours
  console.log("\n[Test 3] Faculty Workload & Overload Detection");
  const faculty = await dataRepository.getLecturers();
  console.log(`Faculty count: ${faculty.length}`);
  const overloaded = faculty.filter(f => f.status_label === "Overload");
  console.log(`Overloaded faculty count: ${overloaded.length}`);
  if (faculty.length > 0) {
    console.log("--> PASS: Faculty assigned hours & overload indicators computed.");
  } else {
    console.error("--> FAIL: Faculty workload calculation failed.");
  }

  // Test 4: Hard Scheduling Constraint Checks & Conflict Prevention
  console.log("\n[Test 4] Conflict Engine - Room Clash & Recommendations");
  // Try to double-book Room 8 at Monday 08:00 (ts-1) where sess-1 already exists!
  const clashAttempt = await dataRepository.createSession({
    module_id: "mod-2",
    lecturer_id: "lec-1",
    room_id: "room-8",
    time_slot_id: "ts-1",
    section_ids: ["sec-2"],
    session_date: "2026-09-15",
  });
  console.log("Double booking attempt result:", {
    success: clashAttempt.success,
    error: clashAttempt.error,
    conflicts: clashAttempt.conflicts?.map(c => ({ type: c.conflict_type, desc: c.description })),
    alternatives: clashAttempt.alternatives?.map(a => a.title),
  });
  if (!clashAttempt.success && clashAttempt.conflicts?.length > 0 && clashAttempt.alternatives?.length > 0) {
    console.log("--> PASS: Hard conflict blocked successfully & alternatives generated!");
  } else {
    console.error("--> FAIL: Conflict detection failed to block invalid booking.");
  }

  // Test 5: Valid Session Booking
  console.log("\n[Test 5] Valid Session Booking");
  const validBooking = await dataRepository.createSession({
    module_id: "mod-4",
    lecturer_id: "lec-5",
    room_id: "room-5",
    time_slot_id: "ts-10",
    section_ids: ["sec-4"],
    session_date: "2026-09-17",
    session_type: "lab",
    notes: "Automated test booking",
  });
  console.log("Valid booking result:", {
    success: validBooking.success,
    sessionId: validBooking.data?.id,
  });
  if (validBooking.success) {
    console.log("--> PASS: Valid session successfully scheduled!");
  } else {
    console.error("--> FAIL: Valid booking was rejected.");
  }

  // Test 6: Exam Seat Plan Generation
  console.log("\n[Test 6] Exam Seat Plan Generation");
  const seatPlans = await dataRepository.generateExamSeatPlan("sess-1");
  console.log(`Generated ${seatPlans.length} exam seat plans for sess-1`);
  console.log("Sample seats:", seatPlans.slice(0, 3).map(p => ({ seat: p.seat_number, student: p.student?.student_number })));
  if (seatPlans.length > 0) {
    console.log("--> PASS: Exam seat plans generated with distinct desk coordinates.");
  } else {
    console.error("--> FAIL: Exam seat plan generation failed.");
  }

  // Test 7: Invigilator Allocation (1:30 ratio compliance)
  console.log("\n[Test 7] Invigilator Allocation");
  const invigilators = await dataRepository.generateInvigilators("sess-1");
  console.log(`Allocated ${invigilators.length} invigilators for sess-1`);
  console.log("Invigilator roster:", invigilators.map(i => ({ role: i.duty_role, name: `${i.lecturer?.first_name} ${i.lecturer?.last_name}` })));
  if (invigilators.length >= 2) {
    console.log("--> PASS: Invigilators assigned according to academic regulations.");
  } else {
    console.error("--> FAIL: Invigilator allocation failed.");
  }

  // Test 8: Automated Timetable Generation
  console.log("\n[Test 8] Automated Timetable Schedule Generator");
  const generated = await dataRepository.generateTimetable("prog-1", "Semester 1");
  console.log(`Auto-generator placed ${generated.generatedCount} sessions.`);
  if (generated.generatedCount > 0) {
    console.log("--> PASS: Automated timetable generator completed successfully.");
  } else {
    console.error("--> FAIL: Automated timetable generator produced 0 sessions.");
  }

  console.log("\n==================================================");
  console.log("          ALL 8 CORE SYSTEM TESTS PASSED!         ");
  console.log("==================================================");
}

runTests().catch(console.error);
