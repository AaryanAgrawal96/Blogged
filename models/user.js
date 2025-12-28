import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import {
  createTokenForUser,
  validateToken,
} from "../services/authentication.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pfpUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswordAndGenerateJWT = async function (
  enteredPassword
) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  if (!isMatch) throw new Error("Incorrect email or password");
  return createTokenForUser(this);
};

const User = model("user", userSchema);

export { User };
