import mongoose from "mongoose";

export default async function DBConnection() {
  console.log("connecting")
  try {
    await mongoose.connect("mongodb+srv://sanketnannaware21:BFUVkcom1A9fz6Dh@cluster0.eoefhna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("connected to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb", error.message);
  }
};