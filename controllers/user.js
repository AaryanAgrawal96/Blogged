import { User } from "../models/user.js";
import { Blog } from "../models/blog.js";
import { createTokenForUser } from "../services/authentication.js";

async function handleSignup(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = createTokenForUser(user);
    return res.cookie("token", token, { httpOnly: true }).redirect("/");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .render("signup", { error: "Something went wrong. Try again." });
  }
}

async function handleProfile(req, res) {
  if (!req.user) {
    return res.redirect("/user/signin");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.redirect("/user/signin");
  }

  const blogs = await Blog.find({ createdBy: user._id }).sort({
    createdAt: -1,
  });
  const totalWords = blogs.reduce((sum, blog) => {
    const text = blog.body ? blog.body.replace(/<[^>]+>/g, " ").trim() : "";
    return sum + (text ? text.split(/\s+/).length : 0);
  }, 0);

  return res.render("profile", {
    user,
    blogCount: blogs.length,
    totalWords,
    blogs,
  });
}

async function handleMyBlogs(req, res) {
  if (!req.user) {
    return res.redirect("/user/signin");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.redirect("/user/signin");
  }

  const blogs = await Blog.find({ createdBy: user._id }).sort({
    createdAt: -1,
  });
  return res.render("myBlogs", {
    user,
    blogs,
  });
}

async function handleSignin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .render("signin", { error: "Invalid email or password" });
    }

    let token;
    try {
      token = await user.comparePasswordAndGenerateJWT(password);
    } catch {
      // password mismatch
      return res
        .status(400)
        .render("signin", { error: "Invalid email or password" });
    }

    // set same cookie options as signup (httpOnly)
    return res.cookie("token", token, { httpOnly: true }).redirect("/");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .render("signin", { error: "Server error. Please try again later." });
  }
}

async function handleSignOut(req, res) {
  res.clearCookie("token").redirect("/");
}

export {
  handleSignup,
  handleSignin,
  handleSignOut,
  handleProfile,
  handleMyBlogs,
  handleProfilePhotoUpload,
};

async function handleProfilePhotoUpload(req, res) {
  if (!req.user) return res.redirect("/user/signin");
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.redirect("/user/signin");
    if (!req.file) return res.redirect("/user/profile");

    user.pfpUrl = `/uploads/${req.file.filename}`;
    await user.save();

    // issue new token with updated pfpUrl so cookie reflects change
    const token = createTokenForUser(user);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/user/profile");
  } catch (err) {
    console.error(err);
    return res.status(500).redirect("/user/profile");
  }
}
