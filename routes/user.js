import { Router } from "express";
import path from "path";
import multer from "multer";
import {
  handleProfile,
  handleMyBlogs,
  handleSignup,
  handleSignin,
  handleSignOut,
  handleProfilePhotoUpload,
} from "../controllers/user.js";
const userRouter = Router();

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

userRouter
  .route("/signup")
  .get((req, res) => res.render("signup"))
  .post(handleSignup);

userRouter
  .route("/signin")
  .get((req, res) => res.render("signin"))
  .post(handleSignin);

userRouter.route("/profile").get(handleProfile);
userRouter.route("/my-blogs").get(handleMyBlogs);
userRouter
  .route("/profile/photo")
  .post(upload.single("pfp"), handleProfilePhotoUpload);

userRouter.route("/signout").get(handleSignOut);

export { userRouter };
