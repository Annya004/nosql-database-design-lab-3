// Exercise 7: Content Management System
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const articles = dbx.cms_articles;
articles.deleteMany({});
articles.insertMany([
  { title: "MongoDB Basics", author: "Riya", category: "Technology", tags: ["mongodb", "database"], status: "published", publishedAt: ISODate("2026-08-01") },
  { title: "Draft: Indexes", author: "Dev", category: "Technology", tags: ["indexing"], status: "draft" },
  { title: "Campus News", author: "Meera", category: "News", tags: ["campus"], status: "published", publishedAt: ISODate("2026-09-01") }
]);

print("Published articles:");
articles.find({ status: "published" }).forEach(printjson);
print("Unpublished/draft articles:");
articles.find({ status: { $ne: "published" } }).forEach(printjson);
print("Published Technology articles tagged mongodb:");
articles.find({ status: "published", category: "Technology", tags: "mongodb" }).forEach(printjson);
print("Published articles sorted newest first:");
articles.find({ status: "published" }).sort({ publishedAt: -1 }).forEach(printjson);
