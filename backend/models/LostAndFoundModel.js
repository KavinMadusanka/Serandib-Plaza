import mongoose from "mongoose";

const LostModel = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        pNumber:{
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
        },
        role: {
            type: String
        },
        email: {
            type: String,
            required:true
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },{timestamps:true}
)

export default mongoose.model("LostAndFounds",LostModel);