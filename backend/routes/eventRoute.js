import express from 'express';
import { AddNewEvent,
        getALLEventController,
        EventPhotoController } from '../controllers/eventController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';


const router = express.Router();

// Add routes here
router.post('/addNewEvent',uploadMiddleware, AddNewEvent);

//get single item
// router.get('/getLostItem/:Iid', getLostSingleItemController);

//get all items
router.get('/getAllEvents', getALLEventController);

//get photo
router.get("/getAllEvents-photo/:pid",EventPhotoController);

// //delete item
// router.delete("/delete-item/:id",deleteLostItemController);


export default router;