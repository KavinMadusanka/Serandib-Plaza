import mongoose from "mongoose";
import LostAndFounds from './LostAndFoundModel.js';

const Notify = new mongoose.Schema(
    {
        userName:{
            type:String,
            required: true
        },
        userPNumber:{
            type:String,
            required:true
        },
        ItemID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LostAndFounds",
            required:true
        }
    },{timestamps:true}
)

export default mongoose.model("LostFoundNotifies",Notify);