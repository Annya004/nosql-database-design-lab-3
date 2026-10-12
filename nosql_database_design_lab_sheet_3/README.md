# NoSQL Database Design – Lab Sheet 3

MongoDB solutions for the 15 exercises listed in **BCA305P-AS02.pdf**.

## Requirements

- MongoDB Server (local installation or MongoDB Atlas)
- MongoDB Shell (`mongosh`)
- A database connection string

These are runnable learning examples, not a production application. Each exercise uses the database `nosql_lab_sheet3` and its own collection(s). Most scripts clear only their own exercise collections before inserting sample data, so rerunning them gives predictable results. **Read each script before running it against a database containing data you need to keep.**

## Run an exercise

From this folder, run one script at a time:

```bash
mongosh "mongodb://127.0.0.1:27017" exercises/01_student_activity_tracking.js
```

Replace the connection string with your own MongoDB Atlas URI if needed. Do not commit passwords or connection strings containing credentials to GitHub.

## Exercises included

1. Student Activity Tracking System
2. Event Logging System
3. Mini Blogging Platform
4. Flexible Product Catalog
5. E-Commerce Order Management
6. Website Analytics
7. Content Management System
8. Shopping Cart with Embedded Documents
9. Product Review and Rating System
10. Inventory Monitoring
11. Bank Wallet Transfer using a transaction
12. User Notification System
13. Course Learning Platform
14. Real-Time Order Tracking
15. Flexible News Database

## Notes

- Exercise 11 uses a MongoDB transaction. Transactions require a replica set or a sharded cluster; a standalone local MongoDB server does not support multi-document transactions.
- Aggregation pipelines and query operators are demonstrated with small sample datasets so the output is easy to inspect.
- Scripts are written for `mongosh`, not the legacy `mongo` shell.
- The project does not require `npm install`; no external Node.js packages are used.
