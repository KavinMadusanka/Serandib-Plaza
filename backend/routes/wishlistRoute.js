import express from 'express';
import { getWishlist, addToWishlist, deleteWishlistItem } from '../controllers/wishlistController.js';

const router = express.Router();

// Define your routes
router.post('/add-to-wishlist', addToWishlist);
router.get('/get-wishlist/:email', getWishlist);
router.delete('/delete-wishlist/:id', deleteWishlistItem);


export default router;