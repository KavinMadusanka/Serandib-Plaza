import mongoose from "mongoose";

const eventModel = new mongoose.Schema(
    {
        title: {
            type:String,
            required: true
        },
        startDate: {
            type: Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        },
        image:{
            data: Buffer,
            contentType: String
        },
        venue:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required:true
        }
    },{timestamps:true}

)

export default mongoose.model("events",eventModel);