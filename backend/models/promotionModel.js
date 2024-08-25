import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    promotionTitle: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    promotionDescription: {
        type: String,
        required: true,
    },
    discountType: {
        type: String,
        required: true,
        enum: ["percentage", "fixed_amount", "BOGO", "other"],
    },
    discountValue: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    termsConditions: {
        type: String,
        required: false, 
    },
    promoCode: {
        type: String,
        required: false, 
    },
    applicableItems: {
        type: [String], 
        required: false, 
    },
    promotionImage: {
        data:Buffer,
        contentType:String,
    },
    shop: {
        type: mongoose.ObjectId,
        ref: "shops",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},{timestamps:true}
);

// Create and export the model
export default mongoose.model("Promotion", promotionSchema);
