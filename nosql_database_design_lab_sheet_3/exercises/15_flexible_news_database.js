// Exercise 15: Flexible News Database
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const news = dbx.news_articles;
news.deleteMany({});
news.insertMany([
  { title: "New Campus Library Opens", author: "Editorial Desk", location: "Roorkee", category: "Education", tags: ["campus", "library"], publishedAt: ISODate("2026-09-01"), sources: ["Campus Bulletin"] },
  { title: "Technology Startup Launches App", category: "Technology", tags: ["startup", "app"], images: ["startup.jpg"], source: "Tech Daily" },
  { title: "Heavy Rain Alert", author: "Weather Desk", location: "Meerut", category: "Weather", publishedAt: ISODate("2026-09-05"), tags: ["rain", "alert"], sources: ["Weather Office", "City News"] }
]);

print("Search by category regardless of optional fields:");
news.find({ category: "Technology" }).forEach(printjson);
print("Search articles tagged campus:");
news.find({ tags: "campus" }).forEach(printjson);
print("Search articles with a location field:");
news.find({ location: { $exists: true, $ne: null } }).forEach(printjson);
print("Search by either legacy source or sources array:");
news.find({ $or: [{ source: "Tech Daily" }, { sources: "Tech Daily" }] }).forEach(printjson);
print("Articles containing both title and category:");
news.find({ title: { $exists: true }, category: { $exists: true } }, { _id: 0, title: 1, category: 1 }).forEach(printjson);
