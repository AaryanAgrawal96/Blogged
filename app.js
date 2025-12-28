import "./config/env.js";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { Blog } from "./models/blog.js";
import { userRouter } from "./routes/user.js";
import { blogRouter } from "./routes/blog.js";
import { checkForAuthenticationCookie } from "./middleware/authentication.js";

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
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
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => console.log("Server started at", PORT));
