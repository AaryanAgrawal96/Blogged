import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    userPfp: user.userPfp,
    role: user.role,
  };
  return jwt.sign(payload, secret);
}

function validateToken(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

export { createTokenForUser, validateToken };
