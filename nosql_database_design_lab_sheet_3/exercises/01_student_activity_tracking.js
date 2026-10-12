// Exercise 1: Student Activity Tracking System
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const students = dbx.student_activity;
students.deleteMany({});
students.insertMany([
  { studentId: "S101", name: "Aarav", courses: ["MongoDB", "Python"], attendance: 92, skills: ["JavaScript", "SQL"], recentActivities: [{ type: "quiz", course: "MongoDB", score: 88, date: ISODate("2026-09-01") }, { type: "assignment", course: "Python", status: "submitted", date: ISODate("2026-09-03") }] },
  { studentId: "S102", name: "Diya", courses: ["MongoDB", "Java"], attendance: 76, skills: ["Java", "HTML"], recentActivities: [{ type: "video", course: "MongoDB", minutes: 30, date: ISODate("2026-09-02") }] },
  { studentId: "S103", name: "Kabir", courses: ["Python"], attendance: 85, skills: ["Python", "SQL"], recentActivities: [{ type: "quiz", course: "Python", score: 95, date: ISODate("2026-09-04") }] }
]);

print("Students with attendance >= 85:");
students.find({ attendance: { $gte: 85 } }).forEach(printjson);
print("Students enrolled in MongoDB:");
students.find({ courses: "MongoDB" }).forEach(printjson);
print("Students with a quiz score >= 90:");
students.find({ recentActivities: { $elemMatch: { type: "quiz", score: { $gte: 90 } } } }).forEach(printjson);
print("Students with SQL skill:");
students.find({ skills: "SQL" }, { _id: 0, studentId: 1, name: 1, skills: 1 }).forEach(printjson);
