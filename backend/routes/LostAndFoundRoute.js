import express from 'express';
import { AddItemController, getLostItemController, ItemPhotoController } from '../controllers/LostAndFoundController.js';  // Ensure this path is correct

const router = express.Router();

// Add routes here
router.post('/addLostItem', AddItemController);
router.get('/getLostItems', getLostItemController);

//get photo
router.get("/getLostItem-photo/:pid",ItemPhotoController);
export default router;