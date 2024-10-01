import mongoose from "mongoose";

const eventModel = new mongoose.Schema(
    {
        title: {
            type:String,
            required: true
        },
        startDate: {
            type: String,
            required:true
        },
        endDate:{
            type:String,
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
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    },{timestamps:true}

)

export default mongoose.model("events",eventModel);