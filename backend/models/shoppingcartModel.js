import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
},{timestamps:true});

export default mongoose.model('Cart',CartItemSchema);