import express from 'express';
import { AddItemController, 
    getLostItemController, 
    ItemPhotoController, 
    deleteLostItemController,
    getLostSingleItemController,
    addNotifyControll } from '../controllers/LostAndFoundController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Add routes here
router.post('/addLostItem',uploadMiddleware, AddItemController);

//get single item
router.get('/getLostItem/:Iid', getLostSingleItemController);

//get all items
router.get('/getLostItems', getLostItemController);

//get photo
router.get("/getLostItem-photo/:pid",ItemPhotoController);

//delete item
router.delete("/delete-item/:id",deleteLostItemController);

//notify route
router.post('/addNotification',addNotifyControll);


export default router;