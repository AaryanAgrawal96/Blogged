import { Blog } from "../models/blog.js";

async function handleViewBlogById(req, res) {
  const blog = await Blog.findById(req.params.id);
  return res.render("blog", {
    user: req.user,
    blog: blog,
  })
}
 
export { handleViewBlogById };
