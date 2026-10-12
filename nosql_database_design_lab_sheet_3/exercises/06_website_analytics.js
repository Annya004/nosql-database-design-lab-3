// Exercise 6: Website Analytics
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const visits = dbx.page_visits;
visits.deleteMany({});
visits.insertMany([
  { page: "/home", userId: "U1", device: "mobile", browser: "Chrome", location: "Delhi", at: ISODate("2026-09-01T09:00:00Z") },
  { page: "/products", userId: "U1", device: "desktop", browser: "Firefox", location: "Delhi", at: ISODate("2026-09-01T09:05:00Z") },
  { page: "/home", userId: "U2", device: "mobile", browser: "Chrome", location: "Meerut", at: ISODate("2026-09-01T09:10:00Z") },
  { page: "/contact", userId: "U3", device: "tablet", browser: "Safari", location: "Roorkee", at: ISODate("2026-09-02T11:00:00Z") },
  { page: "/home", userId: "U4", device: "desktop", browser: "Chrome", location: "Delhi", at: ISODate("2026-09-02T12:00:00Z") }
]);

print("Most visited pages:");
visits.aggregate([{ $group: { _id: "$page", visits: { $sum: 1 } } }, { $sort: { visits: -1, _id: 1 } }]).forEach(printjson);
print("Visits by device:");
visits.aggregate([{ $group: { _id: "$device", visits: { $sum: 1 } } }, { $sort: { visits: -1 } }]).forEach(printjson);
print("Visits by browser:");
visits.aggregate([{ $group: { _id: "$browser", visits: { $sum: 1 } } }, { $sort: { visits: -1 } }]).forEach(printjson);
