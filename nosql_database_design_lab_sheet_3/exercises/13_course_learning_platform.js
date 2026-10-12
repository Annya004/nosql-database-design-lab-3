// Exercise 13: Course Learning Platform
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const progress = dbx.course_progress;
progress.deleteMany({});
progress.insertMany([
  { studentId: "S1", studentName: "Aarav", courseId: "DB101", course: "MongoDB", instructor: "Dr. Rao", modules: [{ name: "Documents", complete: true }, { name: "Queries", complete: true }, { name: "Aggregation", complete: false }], completionPercent: 67, status: "in-progress" },
  { studentId: "S2", studentName: "Diya", courseId: "DB101", course: "MongoDB", instructor: "Dr. Rao", modules: [{ name: "Documents", complete: true }, { name: "Queries", complete: true }, { name: "Aggregation", complete: true }], completionPercent: 100, status: "completed" },
  { studentId: "S3", studentName: "Kabir", courseId: "PY101", course: "Python", instructor: "Ms. Sen", modules: [{ name: "Syntax", complete: true }, { name: "Functions", complete: false }], completionPercent: 50, status: "in-progress" }
]);

print("Students at least 60% through their course:");
progress.find({ completionPercent: { $gte: 60 } }).forEach(printjson);
print("Completed courses:");
progress.find({ status: "completed" }).forEach(printjson);
print("Students who have not completed all modules:");
progress.find({ "modules.complete": false }, { _id: 0, studentId: 1, studentName: 1, course: 1, completionPercent: 1 }).forEach(printjson);
