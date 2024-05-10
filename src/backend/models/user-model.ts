import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    provider: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema)