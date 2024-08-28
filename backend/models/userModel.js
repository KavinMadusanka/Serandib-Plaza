import mongoose from "mongoose";

//user model
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    shoppingPreference: {
        type: [String],
        required: false,
      },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);