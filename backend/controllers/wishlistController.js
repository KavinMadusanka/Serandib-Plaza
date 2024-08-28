import Wishlist from '../models/wishlistModel.js';

//Add to wishlist

export const addToWishlist = async (req,res) => {
    try {
        const{product,email } =req.body
        //validation
        if(!product){
            return res.send({message:'product is Required'});
        }
        
        
        if(!email){
            return res.send({message:'email is Required'});
        }
        //check cart
        const exisitingWishlist = await Wishlist.findOne({product,email});

        //exisit cart
        if(exisitingWishlist){
            return res.status(200).send({
                success:false,
                message:'This item is alradey added',
            });
        }
        //save
        const wishlist = await new Wishlist({product,email}).save();

        res.status(201).send({
            success:true,
            message:'wishlist Entered Successfully',
            wishlist
        });

    }catch (error) {
        console.error('Error adding to wishlist:', error);

        res.status(500).send({
            success: false,
            message: 'Error in details entering',
            error
        });
    }
};

//get all cart details 

export const getWishlist = async(req, res) =>{
    const{ email } =req.params;
    try {
        const wishlist = await Wishlist.find({email}).populate("product","_id  email name price quantity");
        if (!wishlist || wishlist.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No wishlist details found for this email",
            });
        }
        res.status(200).send({
            success: true,
            message: "wishlist details retrieved successfully",
            wishlist,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while retrieving cart details",
        });
        
    }
};

// Delete from wishlist
export const deleteWishlistItem = async (req, res) =>{
    try {
        const { id } = req.params;
        await Wishlist.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "wishlist Details Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting wishlist Details",
            error,
        });
    }
};