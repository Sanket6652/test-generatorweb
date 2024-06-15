import nodemailer from "nodemailer";
import generateOTP from "../helper/generateOTP.js"


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  secure: true,
  auth: {
    user: "sanketnannaware96@gmail.com", // Your email
    pass: "tlnv oskh qvro etld"// Your password
  }
});

const users = {};

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const OTP = generateOTP();
  users[email] = OTP;

  const mailOptions = {
    from: 'sanketnannaware96@gmail.com',
    to: email,
    subject: 'OTP for Email Verification',
    text: `Your OTP for email verification is: ${OTP}`
  };
  console.log(email)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to send OTP' });
    } else {
      console.log('Email sent: ' + info.response, "\n" + info);
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (users[email] && Number(users[email]) === otp) {
    delete users[email];
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
};