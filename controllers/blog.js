import { Blog } from "../models/blog.js";
import { Comment } from "../models/comment.js";

async function handleViewBlogById(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
}

async function handleComment(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect("/blog/" + req.params.blogId);
}

export { handleViewBlogById, handleComment };
