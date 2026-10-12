// Exercise 10: Inventory Monitoring
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const inventory = dbx.inventory;
inventory.deleteMany({});
inventory.insertMany([
  { sku: "SKU-1", product: "Keyboard", stock: 4, minimumStock: 10, supplier: "ABC Supplies", restockDate: ISODate("2026-10-15") },
  { sku: "SKU-2", product: "Monitor", stock: 15, minimumStock: 5, supplier: "Screen House", restockDate: ISODate("2026-11-01") },
  { sku: "SKU-3", product: "Mouse", stock: 2, minimumStock: 8, supplier: "ABC Supplies", restockDate: ISODate("2026-10-13") }
]);

print("Items needing immediate restocking:");
inventory.find({ $expr: { $lte: ["$stock", "$minimumStock"] } }).sort({ stock: 1 }).forEach(printjson);
print("Low-stock count by supplier:");
inventory.aggregate([
  { $match: { $expr: { $lte: ["$stock", "$minimumStock"] } } },
  { $group: { _id: "$supplier", productsToRestock: { $sum: 1 } } }
]).forEach(printjson);
