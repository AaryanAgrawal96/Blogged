import { User } from "../models/user.js";

async function handleSignup(req, res) {
  try {
    const { username, email, password } = req.body;

    await User.create({
      username,
      email,
      password,
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .render("signup", { error: "Something went wrong. Try again." });
  }
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

    return res.cookie("token", token).redirect("/");
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

export { handleSignup, handleSignin, handleSignOut };
