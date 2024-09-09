import { error } from "console";
import LostModel from "../models/LostAndFoundModel";

//Add new lost Found item
export const AddItem = async(req,res) => {
    const {name,pNumber,Description,role} = req.body
}
try {
    const image = req.files.file;
    const uploadImage = new Date().getTime();
    await image.mv("Assets/LostAndFoundImages/" + `${uploadImage}.jpg`, (err) => {
        console.log("An Error occured in saving the image", err);
    })
    const AddLostItem = new LostModel({
        name,
        pNumber,
        Description,
        role,
        image: `${uploadImage}.jpg`
    })

    // Validation
    switch(true){
        case !name:
            return res.status(500).send({error:"Name is Required"});
        case !pNumber:
            return res.status(500).send({error:"Phone Number is Required"});
        case !role:
            return res.status(500).send({error:"role is Required"});
        case image && image.size > 1000000:
            return res.status(500).send({error:"Photo is Required and should be less than 1mb"});
    }

    return await AddLostItem.save().then((value) => {
        res.status(200).json({ID: value._id });
    }).catch ((err) => {
        res.status(500).json({ err })
    })
    
} catch (error) {
    res.status(500).json({ error })
}

// Get all Items controller
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