import mongoose from "mongoose";

//shop model
const shopSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    owneremail: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    businessregno: {
        type: String,
        required: true,
    },
    taxidno: {
        type: String,
        required: true,
    },
    shopname: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
  },
    businesstype: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    operatinghrs_from: {
      type: String,
      required: true,
    },
    operatinghrs_to: {
      type: String,
      required: true,
    },
    shoplocation: {
        type: String,
        required: true,
    },
    businessaddress: {
        type: String,
        required: true
    },
    shopcontact: {
        type: String,
        required: true,
    },
    role: {
      type: Number,
      default: 2,
    }
  },
  { timestamps: true }
);

export default mongoose.model("shops", shopSchema);