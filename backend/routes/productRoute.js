import express from 'express'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable';

const router = express.Router()

// routes
// create product
router.post('/create-product', formidable(), createProductController);
// update product
router.put('/update-product/:pid', formidable(), updateProductController);
// get product
router.get('/get-product/:email', getProductController);
// single product
router.get('/get-product/:slug', getSingleProductController)
// get photo
router.get('/product-photo/:pid',productPhotoController)
// delete product
router.delete('/delete-product/:pid', deleteProductController)




//piyusha filter product 
router.post('/product-filters', productFiltersController)


export default router