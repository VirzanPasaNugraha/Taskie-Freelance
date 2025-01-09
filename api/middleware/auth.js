import jwt from "jsonwebtoken";

// Middleware untuk verifikasi token JWT
export const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json("Token is required.");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid token."); }
    req.userId = user.id;
    req.isSeller = user.isSeller;
    next();
  });
};
