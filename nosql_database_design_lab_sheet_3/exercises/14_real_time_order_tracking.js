// Exercise 14: Real-Time Order Tracking
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const orders = dbx.tracked_orders;
orders.deleteMany({});
orders.insertMany([
  { orderId: "T1001", customerId: "C1", status: "Shipped", statusHistory: [
    { status: "Placed", at: ISODate("2026-09-01T08:00:00Z") },
    { status: "Confirmed", at: ISODate("2026-09-01T08:10:00Z") },
    { status: "Shipped", at: ISODate("2026-09-02T10:00:00Z") }
  ] },
  { orderId: "T1002", customerId: "C2", status: "Delivered", statusHistory: [
    { status: "Placed", at: ISODate("2026-09-01T09:00:00Z") },
    { status: "Confirmed", at: ISODate("2026-09-01T09:20:00Z") },
    { status: "Shipped", at: ISODate("2026-09-02T11:00:00Z") },
    { status: "Delivered", at: ISODate("2026-09-04T15:00:00Z") }
  ] }
]);

print("Current status for order T1001:");
orders.findOne({ orderId: "T1001" }, { _id: 0, orderId: 1, status: 1 });
print("Complete status history for T1002:");
orders.find({ orderId: "T1002" }, { _id: 0, orderId: 1, statusHistory: 1 }).forEach(printjson);

// Demonstration of moving an order to its next stage:
orders.updateOne(
  { orderId: "T1001" },
  { $set: { status: "Delivered" }, $push: { statusHistory: { status: "Delivered", at: new Date() } } }
);
print("T1001 after status update:");
orders.findOne({ orderId: "T1001" }, { _id: 0, orderId: 1, status: 1, statusHistory: 1 });
