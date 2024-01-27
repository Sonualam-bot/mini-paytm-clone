const express = require("express");
const rootRouter = require("./routes/index");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDatabase();

app.get("/", (req, res) => {
  res.send("Paytm Clone online");
});

app.use("/api/v1", rootRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to https://localhost:${process.env.PORT} `);
});

module.exports = app;
