import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  console.log("Cookies in request:", req.cookies);
//console.log("Authorization Header:", req.headers.authorization);

  
  const token = req.cookies.token; // ✅ Get token from cookies

  console.log("Received Token:", token); // Debugging output

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { id: decoded.id, role: decoded.role }; // Attach user details to request
    console.log("Decoded User:", req.user); // ✅ Check if user ID is set
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid token", error: error.message });
  }
};
