// Exercise 12: User Notification System
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const notifications = dbx.notifications;
notifications.deleteMany({});
notifications.insertMany([
  { notificationId: "N1", userId: "U1", type: "message", message: "You have a new message", read: false, createdAt: ISODate("2026-09-01T08:00:00Z") },
  { notificationId: "N2", userId: "U1", type: "order-update", message: "Order shipped", read: false, createdAt: ISODate("2026-09-01T09:00:00Z") },
  { notificationId: "N3", userId: "U1", type: "system-alert", message: "Profile updated", read: true, createdAt: ISODate("2026-09-01T10:00:00Z") },
  { notificationId: "N4", userId: "U2", type: "message", message: "Welcome", read: false, createdAt: ISODate("2026-09-02T10:00:00Z") }
]);

print("Unread notifications for U1:");
notifications.find({ userId: "U1", read: false }).sort({ createdAt: -1 }).forEach(printjson);

print("Mark notification N1 as read:");
notifications.updateOne({ notificationId: "N1", userId: "U1" }, { $set: { read: true, readAt: new Date() } });
notifications.find({ userId: "U1" }).sort({ createdAt: -1 }).forEach(printjson);
