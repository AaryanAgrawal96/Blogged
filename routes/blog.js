import { Router } from "express";
import { Blog } from "../models/blog.js";
import { handleViewBlogById, handleComment } from "../controllers/blog.js";
import multer from "multer";
import path from "path";
const blogRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

blogRouter
  .route("/create")
  .get((req, res) => res.render("addBlog", { user: req.user }));

blogRouter.route("/").post(upload.single("coverImg"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverUrl: `/uploads/${req.file.filename}`,
  });
  return res.redirect("/blog/" + blog._id);
});

blogRouter.route("/:id").get(handleViewBlogById);

blogRouter.route("/comment/:blogId").post(handleComment);

export { blogRouter };
