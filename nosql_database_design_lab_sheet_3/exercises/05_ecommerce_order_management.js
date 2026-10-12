// Exercise 5: E-Commerce Order Management
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const customers = dbx.shop_customers;
const orders = dbx.shop_orders;
customers.deleteMany({});
orders.deleteMany({});
customers.insertMany([
  { customerId: "C101", name: "Meera", email: "meera@example.com" },
  { customerId: "C102", name: "Ishaan", email: "ishaan@example.com" }
]);
orders.insertMany([
  { orderId: "O1001", customerId: "C101", placedAt: ISODate("2026-09-01"), status: "Delivered", items: [{ product: "Keyboard", qty: 1, unitPrice: 1200 }, { product: "Mouse", qty: 2, unitPrice: 500 }] },
  { orderId: "O1002", customerId: "C101", placedAt: ISODate("2026-09-10"), status: "Shipped", items: [{ product: "Monitor", qty: 1, unitPrice: 9000 }] },
  { orderId: "O1003", customerId: "C102", placedAt: ISODate("2026-09-12"), status: "Placed", items: [{ product: "USB Drive", qty: 3, unitPrice: 450 }] }
]);

print("Customer C101 purchase history with totals:");
orders.aggregate([
  { $match: { customerId: "C101" } },
  { $unwind: "$items" },
  { $group: { _id: "$orderId", customerId: { $first: "$customerId" }, placedAt: { $first: "$placedAt" }, status: { $first: "$status" }, total: { $sum: { $multiply: ["$items.qty", "$items.unitPrice"] } } } },
  { $sort: { placedAt: 1 } }
]).forEach(printjson);

print("All order totals:");
orders.aggregate([
  { $project: { _id: 0, orderId: 1, customerId: 1, status: 1, total: { $sum: { $map: { input: "$items", as: "item", in: { $multiply: ["$$item.qty", "$$item.unitPrice"] } } } } } }
]).forEach(printjson);
