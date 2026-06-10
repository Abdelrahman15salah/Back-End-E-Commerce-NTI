import express from "express";
import testRouter from "./src/modules/user/user.router.js";
import dbconnection from "./src/db/connection.js";
import authRouter from "./src/modules/auth/auth.router.js";
import dotenv from "dotenv";
const app = express();

app.use(express.json());

dotenv.config();
dbconnection();

app.use("/user", testRouter);
app.use("/auth", authRouter);
app.use((req, res) => {
  res.status(404).json("404 Not Found");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
