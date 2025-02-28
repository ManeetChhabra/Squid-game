import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  console.log("Received Token:", token); // Debugging output

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to request
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid token", error: error.message });
  }
};
