import express from 'express';
import { AddItemController, 
    getLostItemController, 
    ItemPhotoController, 
    deleteLostItemController } from '../controllers/LostAndFoundController.js';  // Ensure this path is correct

const router = express.Router();

// Add routes here
router.post('/addLostItem', AddItemController);

//get all items
router.get('/getLostItems', getLostItemController);

//get photo
router.get("/getLostItem-photo/:pid",ItemPhotoController);

//delete item
router.delete("/delete-item/:id",deleteLostItemController);


export default router;