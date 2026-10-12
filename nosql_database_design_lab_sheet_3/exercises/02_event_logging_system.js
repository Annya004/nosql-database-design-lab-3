// Exercise 2: Event Logging System
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const logs = dbx.event_logs;
logs.deleteMany({});
logs.insertMany([
  { userId: "U1", event: "login", success: true, ip: "192.0.2.10", at: ISODate("2026-09-01T08:00:00Z") },
  { userId: "U1", event: "failed-login", success: false, ip: "192.0.2.10", at: ISODate("2026-09-01T08:05:00Z") },
  { userId: "U1", event: "failed-login", success: false, ip: "192.0.2.10", at: ISODate("2026-09-01T08:06:00Z") },
  { userId: "U1", event: "failed-login", success: false, ip: "192.0.2.10", at: ISODate("2026-09-01T08:07:00Z") },
  { userId: "U2", event: "file-upload", success: true, fileName: "report.pdf", at: ISODate("2026-09-02T10:00:00Z") },
  { userId: "U2", event: "password-change", success: true, at: ISODate("2026-09-02T10:30:00Z") },
  { userId: "U1", event: "logout", success: true, at: ISODate("2026-09-01T09:00:00Z") }
]);

print("Users with at least 3 failed login attempts:");
logs.aggregate([
  { $match: { event: "failed-login" } },
  { $group: { _id: "$userId", failedAttempts: { $sum: 1 }, ips: { $addToSet: "$ip" } } },
  { $match: { failedAttempts: { $gte: 3 } } },
  { $sort: { failedAttempts: -1 } }
]).forEach(printjson);

print("Event frequency:");
logs.aggregate([
  { $group: { _id: "$event", count: { $sum: 1 } } },
  { $sort: { count: -1, _id: 1 } }
]).forEach(printjson);
