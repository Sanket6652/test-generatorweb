
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      //  minLength: 6
    },
    division: {
      type: String,
      default: "",
    },
    completedTests: [
      {
        testId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tests",
          required: true,
        },
        useranswers: [],
        score: Number,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
