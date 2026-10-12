// Exercise 3: Mini Blogging Platform
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const blogs = dbx.blog_posts;
blogs.deleteMany({});
blogs.insertMany([
  { title: "Getting Started with MongoDB", author: "Riya", category: "Database", tags: ["mongodb", "beginner"], published: true, publishedAt: ISODate("2026-08-15"), comments: [{ by: "Aman", text: "Helpful!" }] },
  { title: "Python Data Tips", author: "Dev", category: "Programming", tags: ["python", "data"], published: true, publishedAt: ISODate("2026-08-20"), comments: [] },
  { title: "MongoDB Aggregation", author: "Riya", category: "Database", tags: ["mongodb", "aggregation"], published: false, comments: [{ by: "Neha", text: "Looking forward to it." }] }
]);

print("Posts tagged mongodb:");
blogs.find({ tags: "mongodb" }).forEach(printjson);
print("Published Database posts:");
blogs.find({ category: "Database", published: true }).forEach(printjson);
print("Posts matching either python or aggregation tag:");
blogs.find({ tags: { $in: ["python", "aggregation"] } }).forEach(printjson);
print("Posts with both mongodb and beginner tags:");
blogs.find({ tags: { $all: ["mongodb", "beginner"] } }).forEach(printjson);
