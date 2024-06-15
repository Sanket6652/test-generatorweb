import Admin from "../model/admin_model.js";
import bcrypt from "bcrypt";
import User from "../model/user_model.js";

/// admin  authentication

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (user) return res.status(400).json({ error: "already exists" });

    // Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate JWT token
      //generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.send(400).json({ error: "Invalid Admin Data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid admin email or password" });
    }

    //generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutAdmin = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  const { password, cpassword, email, isAdmin } = req.body;

  try {
    if (password !== cpassword)
      res.status(401).json({ error: "passwords do not match" });


    // Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // make changes here
    if (isAdmin) {
      const user = await Admin.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    } else if (!isAdmin) {
      const admin = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      if (!admin) {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
