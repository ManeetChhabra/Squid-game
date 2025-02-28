import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; 
import dotenv from "dotenv";

dotenv.config();

//User Registration
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      courses: [],
      skills: [],
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // ✅ Set token in an HTTP-only cookie (automatic for future requests)
    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", // Enable secure cookies in production
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully!" });
};

// Auth Check
export const authCheck = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized!" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json({ message: "Authenticated", userId: decoded.id, role: decoded.role });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token!" , error:error.message});   }
};

// **Role-based Redirect**
export const loginRedirectByRole = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized!" });

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Access denied!" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token!" });
    }
  };
};

// **Register Skills**
// export const registerSkills = async (req, res) => {
//   const { userId, skills } = req.body;

//   if (!skills || skills.length === 0) {
//     return res.status(400).json({ message: "Skills are required!" });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     user.skills.push(...skills);
//     await user.save();
//     res.status(200).json({ message: "Skills updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error!", error });
//   }
// };
