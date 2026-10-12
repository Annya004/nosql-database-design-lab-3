// Exercise 11: Bank Wallet Transfer using a MongoDB transaction
// IMPORTANT: Run against a replica set or sharded cluster; standalone MongoDB does not support transactions.
const dbx = db.getSiblingDB("nosql_lab_sheet3");
const wallets = dbx.wallets;

// Seed demo accounts. This setup is for learning only.
wallets.updateOne({ userId: "WALLET-A" }, { $set: { balance: 1000 } }, { upsert: true });
wallets.updateOne({ userId: "WALLET-B" }, { $set: { balance: 500 } }, { upsert: true });

const session = db.getMongo().startSession();
const sessionDb = session.getDatabase("nosql_lab_sheet3");
const sessionWallets = sessionDb.wallets;
const transferAmount = 150;

try {
  session.startTransaction();

  const sender = sessionWallets.findOne({ userId: "WALLET-A" });
  if (!sender || sender.balance < transferAmount) {
    throw new Error("Transfer failed: sender account missing or insufficient funds.");
  }

  const debit = sessionWallets.updateOne(
    { userId: "WALLET-A", balance: { $gte: transferAmount } },
    { $inc: { balance: -transferAmount } }
  );
  if (debit.modifiedCount !== 1) {
    throw new Error("Transfer failed while debiting sender.");
  }

  const credit = sessionWallets.updateOne(
    { userId: "WALLET-B" },
    { $inc: { balance: transferAmount } }
  );
  if (credit.matchedCount !== 1) {
    throw new Error("Transfer failed: recipient account not found.");
  }

  session.commitTransaction();
  print("Transfer completed successfully.");
} catch (err) {
  session.abortTransaction();
  print("Transfer aborted: " + err.message);
} finally {
  session.endSession();
}

print("Wallet balances after transfer:");
wallets.find({ userId: { $in: ["WALLET-A", "WALLET-B"] } }, { _id: 0 }).forEach(printjson);
