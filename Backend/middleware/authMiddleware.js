import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Extract token from cookies (or fallback to Authorization header if needed)
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token found!" });
    }

    // Verify token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach decoded user details to the request object

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token" });
  }
};
