import express from "express";

import { loginUser, signupUser, logoutUser } from "../controller/auth_controller.js";
import { loginAdmin, signupAdmin, logoutAdmin, changePassword } from "../controller/adminAuth_controller.js"

const router = express.Router();

router.get("/get", (req, res) => {
  res.send("loguinm");
});

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);

router.post('/adminlogin', loginAdmin);
router.post('/adminignup', signupAdmin);
router.post("/adminlogout", logoutAdmin);

//  change password for user and admin
router.put("/change-password", changePassword)

export default router;
