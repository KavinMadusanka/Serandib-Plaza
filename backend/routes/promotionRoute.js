import express from 'express'
import { requireSignIn } from './../middlewares/AuthMiddleware.js';
import formidable from 'express-formidable'
import { createPromotionController, 
         deletePromotionController, 
         getAllPromotionsController, 
         getSinglePromotionsController, 
         promotionImageController, 
         updatePromotionController 
        } from './../controllers/promotionController.js';

const router = express.Router()

//routes

//create promotion
router.post('/create-promotion',requireSignIn,formidable(),createPromotionController )

//get all promotions
router.get('/get-promotions',getAllPromotionsController)

//get single promotion
router.get('/get-promotions/:slug',getSinglePromotionsController )

//get promotion image
router.get('/promotion-image/:pid', promotionImageController )

//update promotion
router.put('/update-promotion/:pid',requireSignIn,formidable(),updatePromotionController )

//delete promotion
router.delete('/delete-promotion/:pid',deletePromotionController )

export default router