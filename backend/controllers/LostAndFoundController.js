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

    return await AddLostItem.save().then((value) => {
        res.status(200).json({ID: value._id });
    }).catch ((err) => {
        res.status(500).json({ err })
    })
    
} catch (error) {
    res.status(500).json({ error })
}