import { Router } from "express";
import { User } from "../models/user.js";
import { handleSignup, handleSignin, handleSignOut } from "../controllers/user.js";
const userRouter = Router();

userRouter
  .route("/signup")
  .get((req, res) => res.render("signup"))
  .post(handleSignup);

userRouter
  .route("/signin")
  .get((req, res) => res.render("signin"))
  .post(handleSignin);

userRouter.route("/signout").get(handleSignOut);

export { userRouter };
