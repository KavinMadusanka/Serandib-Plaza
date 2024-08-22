import mongoose from "mongoose";
import { type } from "os";
const {Schema} = mongoose;

const LostModel = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        pNumber:{
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        }
    }
)

export default mongoose.model("LostAndFound",LostModel);