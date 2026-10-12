// Exercise 9: Product Review and Rating System
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const reviews = dbx.product_reviews;
reviews.deleteMany({});
reviews.insertMany([
  { productId: "P1", productName: "Notebook", customerId: "C1", rating: 5, review: "Excellent" },
  { productId: "P1", productName: "Notebook", customerId: "C2", rating: 4, review: "Good value" },
  { productId: "P1", productName: "Notebook", customerId: "C3", rating: 5, review: "Very useful" },
  { productId: "P2", productName: "Pen", customerId: "C1", rating: 3, review: "Average" },
  { productId: "P2", productName: "Pen", customerId: "C4", rating: 4, review: "Works well" }
]);

print("Average rating and number of reviews per product:");
reviews.aggregate([
  { $group: { _id: "$productId", productName: { $first: "$productName" }, averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
  { $sort: { averageRating: -1 } }
]).forEach(printjson);
