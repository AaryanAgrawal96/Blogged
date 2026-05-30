import { Router } from "express";
import { Blog } from "../models/blog.js";
import { handleViewBlogById, handleComment } from "../controllers/blog.js";
import multer from "multer";
import path from "path";
const blogRouter = Router();

const blogCategories = {
  article: "Articles",
  freestyle: "Freestyles",
  haiku: "Haikus",
  poem: "Poems",
  prose: "Prose",
  "short-story": "Short-stories",
};

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

blogRouter.route("/create").get((req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  // Render create page where user selects type/genre after clicking
  return res.render("addBlog", {
    user: req.user,
    selectedType: null,
    categoryKey: null,
  });
});

blogRouter.route("/create/:type").get((req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  const selectedType = blogCategories[req.params.type];
  if (!selectedType) {
    return res.status(404).send("Blog type not found");
  }
  return res.render("addBlog", {
    user: req.user,
    selectedType,
    categoryKey: req.params.type,
  });
});

blogRouter.route("/").post(upload.single("coverImg"), async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");
  const { title, body } = req.body;
  const category = req.body.category?.trim() || "Articles";
  const preview = req.body.preview?.trim() || "";
  const coverUrl = req.file
    ? `/uploads/${req.file.filename}`
    : "/images/defaultCover.png";
  const blog = await Blog.create({
    body,
    title,
    category,
    preview,
    createdBy: req.user._id,
    coverUrl,
  });
  return res.redirect("/blog/" + blog._id);
});

blogRouter.route("/:id").get(handleViewBlogById);

blogRouter.route("/comment/:blogId").post(handleComment);

export { blogRouter };
