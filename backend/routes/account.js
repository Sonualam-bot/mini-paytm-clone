const express = require("express");
const mongoose = require("mongoose");
const { Account } = require("../model/account.model");
const { authMiddleware } = require("../middleware/authmiddleware");
const { User } = require("../model/user.model");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();

  const sentMoneyTo = await User.findById({
    _id: to,
  });

  res.json({
    success: true,
    message: "Transfer successful",
    sentTo: sentMoneyTo.firstName,
    amount: amount,
  });
});

module.exports = accountRouter;
