// Exercise 4: Flexible Product Catalog
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const products = dbx.catalog_products;
products.deleteMany({});
products.insertMany([
  { name: "Notebook Pro", category: "laptop", price: 89999, specs: { ramGB: 16, storageGB: 512, processor: "i7" } },
  { name: "Pocket X", category: "mobile", price: 34999, specs: { ramGB: 8, storageGB: 256, cameraMP: 50, network: "5G" } },
  { name: "ZoomCam", category: "camera", price: 52999, specs: { sensorMP: 24, opticalZoom: 5, video: "4K" } },
  { name: "Student Laptop", category: "laptop", price: 45999, specs: { ramGB: 8, storageGB: 256, processor: "i5" } }
]);

print("Laptops with at least 16 GB RAM:");
products.find({ category: "laptop", "specs.ramGB": { $gte: 16 } }).forEach(printjson);
print("Mobiles supporting 5G:");
products.find({ category: "mobile", "specs.network": "5G" }).forEach(printjson);
print("Cameras with at least 20 MP sensors:");
products.find({ category: "camera", "specs.sensorMP": { $gte: 20 } }).forEach(printjson);
print("Products below 50000:");
products.find({ price: { $lt: 50000 } }, { _id: 0, name: 1, category: 1, price: 1 }).forEach(printjson);
