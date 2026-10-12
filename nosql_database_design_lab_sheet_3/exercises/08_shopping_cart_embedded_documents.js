// Exercise 8: Shopping Cart with Embedded Documents
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const carts = dbx.shopping_carts;
carts.deleteMany({});
carts.insertOne({
  cartId: "CART-101",
  userId: "U101",
  items: [
    { productId: "P1", name: "Notebook", qty: 2, unitPrice: 80 },
    { productId: "P2", name: "Pen", qty: 3, unitPrice: 20 }
  ]
});

print("Initial cart:");
carts.findOne({ cartId: "CART-101" });

print("Add one more pen:");
carts.updateOne({ cartId: "CART-101", "items.productId": "P2" }, { $inc: { "items.$.qty": 1 } });
carts.findOne({ cartId: "CART-101" });

print("Remove notebook:");
carts.updateOne({ cartId: "CART-101" }, { $pull: { items: { productId: "P1" } } });
carts.findOne({ cartId: "CART-101" });

print("Cart total:");
carts.aggregate([
  { $match: { cartId: "CART-101" } },
  { $project: { _id: 0, cartId: 1, total: { $sum: { $map: { input: "$items", as: "i", in: { $multiply: ["$$i.qty", "$$i.unitPrice"] } } } } } }
]).forEach(printjson);
