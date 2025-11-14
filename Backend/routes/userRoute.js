import express from "express";
import { registerUser, loginUser, logoutUser, authCheck, loginRedirectByRole} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// **User Registration**
router.post("/register", registerUser);

// **User Login**
router.post("/login", loginUser);

// **User Logout**
router.post("/logout", logoutUser);

// **Authentication Check**
router.get("/authcheck", authCheck);

// **Role-based Redirects**
/*router.post("/login/student", loginRedirectByRole("student"), (req, res) => {
  res.redirect("/student-dashboard");
});

router.post("/login/instructor", loginRedirectByRole("instructor"), (req, res) => {
  res.redirect("/instructor-dashboard");
});*/

// **Register Skills**
// router.post("/register/skill", registerSkills);

export default router;
