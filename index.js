import "./config/env.js"
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.js";
import { checkForAuthenticationCookie } from "./middleware/authentication.js";

const app = express();
const PORT = 8003;

mongoose
  .connect("mongodb://localhost:27017/blogged")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB: ", e);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});



app.listen(PORT, () => console.log("Server started at", PORT));
