import mongoose from "mongoose";
import { type } from "os";

const Notify = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        Pnumber:{
            type:String,
            required:true
        },
        email: {
            type: String,
            required: true
        }
    },{timestamps:true}
)

export default mongoose.model("LostFoundNotifies",Notify);