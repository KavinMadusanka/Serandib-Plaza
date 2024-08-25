import slugify from "slugify"
import promotionModel from "../models/promotionModel.js"
import fs from 'fs'

export const createPromotionController = async(req,res) => {
    try{
        const {
            promotionTitle,
            slug,
            promotionDescription,
            discountType,
            discountValue,
            startDate,
            endDate,
            termsConditions,
            promoCode,
            applicableItems,
            shop,
            isActive
        } = req.fields
        const {promotionImage} = req.files

        //validation
        switch(true){
            case !promotionTitle:
                return res.status(500).send({error:'Promo title is required'})
            case !promotionDescription:
                    return res.status(500).send({error:'Promo description is required'})
            case !discountType:
                    return res.status(500).send({error:'Discount type is required'})
            case !discountValue:
                return res.status(500).send({error:'Discount value is required'})
            case !startDate:
                return res.status(500).send({error:'Promo start date is required'})
            case !endDate:
                return res.status(500).send({error:'Promo end date is required'})
            case !shop:
                return res.status(500).send({error:'Offering shop is required'})
            case !isActive:
                return res.status(500).send({error:'Activation is required'}) 
            case promotionImage>1000000:
                return res.status(500).send({error:'Image should be less than 1mb'})  
        }

        const promotions = new promotionModel({...req.fields,slug:slugify(promotionTitle)})

        if(promotionImage){
            promotions.promotionImage.data = fs.readFileSync(promotionImage.path)
            promotions.promotionImage.contentType = promotionImage.type
        }
        await promotions.save();
        res.status(201).send({
            success:true,
            message:"Promotion created successfully",
            promotions
        })
    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error in creating promotion'
    })
    }
}

//get all promotions
export const getAllPromotionsController = async(req,res) => {
    try{
        const promotions = await promotionModel.find({}).populate('shop').select("-promotionImage").limit(20).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            counTotal: promotions.length,
            message:"All products",
            promotions
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting all products",
            error:error.message
        })
    }
}


//get single promotion
export const getSinglePromotionsController = async(req,res) => {
    try{
        const promotion = await promotionModel.findOne({slug:req.params.slug}).populate('shop').select("-promotionImage")
        res.status(200).send({
            success:true,
            message:"Single promotion fetched",
            promotion
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting single promotion',
            error
        })
    }
}


//get promotiom image
export const promotionImageController = async(req,res) => {
    try{
        const promotion = await promotionModel.findById(req.params.pid).select("promotionImage");
        if(promotion.promotionImage){
            res.set("Content-type",promotion.promotionImage.contentType);
            return res.status(200).send(promotion.promotionImage.data)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting promotion image',
            error
        })
    }
}

//delete promotion
export const deletePromotionController = async (req, res) => {
    try {
        // Find the promotion by ID and delete it
        await promotionModel.findByIdAndDelete(req.params.pid);
        
        // Send success response
        res.status(200).send({
            success: true,
            message: "Promotion deleted successfully"
        });
    } catch (error) {
        console.error(error);
        
        // Send error response
        res.status(500).send({
            success: false,
            message: 'Error while deleting promotion',
            error
        });
    }
};


//update promotion
export const updatePromotionController = async(req,res) => {
    try{
        const {
            promotionTitle,
            slug,
            promotionDescription,
            discountType,
            discountValue,
            startDate,
            endDate,
            termsConditions,
            promoCode,
            applicableItems,
            shop,
            isActive
        } = req.fields
        const {promotionImage} = req.files

        //validation
        switch(true){
            case !promotionTitle:
                return res.status(500).send({error:'Promo title is required'})
            case !promotionDescription:
                    return res.status(500).send({error:'Promo description is required'})
            case !discountType:
                    return res.status(500).send({error:'Discount type is required'})
            case !discountValue:
                return res.status(500).send({error:'Discount value is required'})
            case !startDate:
                return res.status(500).send({error:'Promo start date is required'})
            case !endDate:
                return res.status(500).send({error:'Promo end date is required'})
            case !shop:
                return res.status(500).send({error:'Offering shop is required'})
            case !isActive:
                return res.status(500).send({error:'Activation is required'}) 
            case promotionImage>1000000:
                return res.status(500).send({error:'Image should be less than 1mb'})  
        }

        const promotions = await promotionModel.findByIdAndUpdate(
            req.params.pid,
            {...req.fields, slug: slugify(promotionTitle)},
            { new: true}
        )

        if(promotionImage){
            promotions.promotionImage.data = fs.readFileSync(promotionImage.path)
            promotions.promotionImage.contentType = promotionImage.type
        }
        await promotions.save();
        res.status(201).send({
            success:true,
            message:"Promotion updated successfully",
            promotions
        })
    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error in updating promotion'
    })
    }
}