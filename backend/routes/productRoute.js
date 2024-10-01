import express from 'express'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, updateProductController, getAllProductController,getTotalProductCountController, updateProductQuantity, relatedProductController } from '../controllers/productController.js'
import formidable from 'express-formidable';

const router = express.Router()

// routes
// create product
router.post('/create-product', formidable(), createProductController);
// update product
router.put('/update-product/:pid', formidable(), updateProductController);
// get product
router.get('/get-product/:email', getProductController);
router.get('/get-product', getAllProductController);
// single product
router.get('/get-single-product/:slug', getSingleProductController)
// get photo
router.get('/product-photo/:pid',productPhotoController)
// delete product
router.delete('/delete-product/:pid', deleteProductController)










//piyusha filter product 
router.post('/product-filters', productFiltersController)
//piyusha product count
router.get('/product-count',productCountController)
//piyusha product per page
router.get('/product-list/:page',productListController)
//piyusha mongodb quantity update



//sandamini
router.get('/get-productCount',getTotalProductCountController)


//piyusha
//update product quantity
router.put('/update-product-quantity/:pid',updateProductQuantity)

//similar product
router.get('/related-product/:pid/:cid', relatedProductController)

export default router
