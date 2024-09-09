import mongoose from 'mongoose';

const WishlistItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },

    email: {
        type: String,
        required: true,
    }
}, {timestamps:true}
);

export default mongoose.model('Wishlist', WishlistItemSchema);