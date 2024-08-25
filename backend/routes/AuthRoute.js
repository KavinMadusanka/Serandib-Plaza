import express from 'express'
import { shopRegisterController, testcontroller, userLoginController, userRegisterController } from '../controllers/AuthController.js'
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

//test routes
router.get('/test',requireSignIn,isAdmin,testcontroller)

export default router