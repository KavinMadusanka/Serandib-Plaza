import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    reorderLevel:{
        type:Number,
        required:true,
        default: 10, // Default reorder level, changeable per product
        min: 0 // Ensures reorder level is non-negative
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean,
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true}
);

export default mongoose.model('Products',productSchema)