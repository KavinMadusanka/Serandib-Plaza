import { error } from "console";
import LostModel from "../models/LostAndFoundModel.js";
import fs from 'fs'

//Add new lost Found item
export const AddItemController = async(req,res) => {
    try {
        const {name,pNumber,Description,role,email} = req.body
        const image = req.files.file;
        // const image = req.files

        // Validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !pNumber:
                return res.status(500).send({error:"Phone Number is Required"})
            case !role:
                return res.status(500).send({error:"role is Required"})
            case image && image.size > 1000000:
                return res.status(500).send({error:"Photo is Required and should be less than 1mb"})
        }

        // const savedItem = await AddLostItem.save();
        //     res.status(200).json({ ID: savedItem._id });

            // const LostItems = new LostModel({name,pNumber,Description,role,email});
            // if(image && image.data && image.mimetype){
            //     console.log(image)
            //     LostItems.image.data = image.data;
            //     LostItems.image.contentType = image.mimetype;
            // }
            // await LostItems.save();
            // res.status(201).send({
            //     success: true,
            //     message: "Lost Item added successfully",
            //     LostItems,
            // });

            // Create new LostItem document
        const LostItems = new LostModel({ name, pNumber, Description, role, email });

        // Handle image upload
        if (image) {
            LostItems.image.data = image.data;
            LostItems.image.contentType = image.mimetype;
        }

        // Save the document
        await LostItems.save();
        res.status(201).send({
            success: true,
            message: "Lost Item added successfully",
            LostItems,
        });
        
    } catch (error) {
        console.log(error);
            res.status(500).send({
                success:false,
                error,
                message:"Error in lost item adding",
            });
    }
}

// // Get all Items controller
export const getLostItemController = async(req,res) =>{
    try {
        const Items = await InventoryModel
        .find({})
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1});
        res.status(200).send({
            success:true,
            counTotal: Items.length,
            message:"All Items",
            Items,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting Items",
            error: error.message,
        });
    }
};