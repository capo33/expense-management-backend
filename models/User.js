import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/djxhcwowp/image/upload/v1620242136/avatar/avatar_cugq40.png",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);