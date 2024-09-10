import express from 'express';
import { AddItemController, getLostItemController } from '../controllers/LostAndFoundController.js';  // Ensure this path is correct

const router = express.Router();

// Add routes here
router.post('/addLostItem', AddItemController);
router.get('/getLostItems', getLostItemController);

export default router;