import express from 'express';
import { addToCart,deleteCartItem, getCart, updateCartItemQuantity } from '../controllers/shoppingcartController.js';

const router = express.Router();

router.post('/add-to-cart', addToCart);
router.get('/get-cart/:email', getCart);
router.put('/update-item/:id', updateCartItemQuantity);
router.delete('/delete-cart-item/:id', deleteCartItem);

export default router;
