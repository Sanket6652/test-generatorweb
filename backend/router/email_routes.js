import express from 'express';
const router = express.Router();

// router.post("/requestOTP", async (req, res) => {
//   const { email } = req.body;
//   const OTP = generateOTP(); // Generate OTP
//   try {
//     await sendOTP(email, OTP); // Send OTP to provided email
//     res.status(200).send({ message: "OTP sent to your email" });
//   } catch (error) {
//     res.status(500).send({ error: "Failed to send OTP" });
//   }
// });

// // Endpoint to verify OTP
// router.post("/verifyOTP", (req, res) => {
//   const { email, otp } = req.body;
//   // Here you would compare the received OTP with the stored OTP
//   // For simplicity, let's just match it with a hardcoded value
//   const storedOTP = "123456"; // Simulated stored OTP
//   if (otp === storedOTP) {
//     res.status(200).send({ message: "OTP verified successfully" });
//   } else {
//     res.status(400).send({ message: "Invalid OTP" });
//   }
// });

import {sendOTP,verifyOTP} from "../controller/email_controller.js"

router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

export default router;


