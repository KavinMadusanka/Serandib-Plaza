import express from 'express';
import { AddNewEvent,
        getALLEventController,
        EventPhotoController, 
        updateEventController,
        deleteEventController,
        getEventController } from '../controllers/eventController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';


const router = express.Router();

// Add routes here
router.post('/addNewEvent',uploadMiddleware, AddNewEvent);

//get single item
router.get('/getEvent/:Iid', getEventController);

//get all items
router.get('/getAllEvents', getALLEventController);

//get photo
router.get("/getAllEvents-photo/:pid",EventPhotoController);

// update product
router.put('/update-event/:_id', updateEventController);

// //delete item
router.delete("/delete-event/:id",deleteEventController);


export default router;