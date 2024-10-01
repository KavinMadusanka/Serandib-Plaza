import mongoose from "mongoose";

//shop model
const shopSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    owner_email: {
      type: String,
      required: true,
    },
    owner_contact: {
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
    tax_id_no: {
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
      unique: true,
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
    operating_hrs_from: {
      type: String,
      required: true,
    },
    operating_hrs_to: {
      type: String,
      required: true,
    },
    shoplocation: {
        type: String,
        required: true,
    },
    shopcontact: {
        type: String,
        required: true,
    },
    logo: {
      data: Buffer, // Store image as binary data
      contentType: String, // Store content type of the image (e.g., 'image/png')
    },
    role: {
      type: Number,
      default: 2,
    }
  },
  { timestamps: true }
);

export default mongoose.model("shops", shopSchema);