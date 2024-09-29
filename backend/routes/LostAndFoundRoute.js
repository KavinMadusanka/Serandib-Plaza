import express from 'express';
import { AddItemController, 
    getLostItemController, 
    ItemPhotoController, 
    deleteLostItemController,
    getLostSingleItemController,
    addNotifyControll,
    getAllLostNotify,
    deleteLostNotifyController } from '../controllers/LostAndFoundController.js';
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
router.post('/addNotification/:Iid',addNotifyControll);

//get all notifications
router.get('/getAllNotift', getAllLostNotify);

//delete item
router.delete("/delete-Notification/:id",deleteLostNotifyController);


export default router;