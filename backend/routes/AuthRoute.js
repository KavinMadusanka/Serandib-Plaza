import express from 'express'
import { deleteShopProfileController, deleteUserProfileController, forgotPasswordController, getAllShopsController, getAllUsersController, getShopCountByCategoryController, getShopGrowthController, getTotalShopCountController, getTotalUserCountController, getUserGrowthController, shopRegisterController, testcontroller, updateShopProfileController, updateUserProfileController, userLoginController, userRegisterController } from '../controllers/AuthController.js'
import { isAdmin, requireSignIn } from '../middlewares/AuthMiddleware.js'

//router object
const router = express.Router()

//routing path
//Register || post method
router.post('/userRegister',userRegisterController )

//redister shop
router.post('/shopregister',shopRegisterController )

//login || post
router.post('/userLogin',userLoginController )

// Route to get all shops
router.get('/shops', getAllShopsController );

//test routes
router.get('/test',requireSignIn,isAdmin,testcontroller)

//update user profile
router.put('/updateUserProfile',requireSignIn,updateUserProfileController )

//update shop profile
router.put('/updateShopProfile',requireSignIn,updateShopProfileController )

//delete user profile
router.delete('/deleteUserProfile',requireSignIn,deleteUserProfileController )

//delete shop
router.delete('/deleteShopProfile',requireSignIn,deleteShopProfileController )

// Route to get all shops
router.get('/users', getAllUsersController );

//forgot password
router.post('/forgot-password',forgotPasswordController )

//get shop count
router.get('/get-shopCount',getTotalShopCountController )

//get user count
router.get("/get-userCount",getTotalUserCountController )

router.get('/get-userGrowthData', getUserGrowthController );

//get shop increament by time
router.get('/get-shopGrowthData', getShopGrowthController );

//get shop count by category
router.get('/get-shopCountByCategory', getShopCountByCategoryController );

export default router