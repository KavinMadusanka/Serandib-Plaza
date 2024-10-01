import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useWishlist } from "../context/wishlist";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for API requests

// Utility function to format price in LKR
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(price);
};

const WishlistPage = () => {
    const [auth] = useAuth(); // Use authentication context
    const { wishlist, setWishlist } = useWishlist(); // Use wishlist context
    const navigate = useNavigate(); // Hook for navigation

    // Function to remove item from wishlist
    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(item => item._id !== productId);
        setWishlist(updatedWishlist);
    };

    // Optional: If you want to fetch updated wishlist from the server on mount
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('/api/v1/wishlist'); // Replace with your API endpoint
                setWishlist(response.data.wishlist); // Assuming the API returns a wishlist array
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            }
        };

        fetchWishlist();
    }, [setWishlist]);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Your Wishlist</h1>
                        {wishlist.length === 0 ? (
                            <p className="text-center">Your wishlist is empty</p>
                        ) : (
                            <ul className="list-group">
                                {wishlist.map(product => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={product._id}>
                                        <div className="d-flex align-items-center">
                                            <img 
                                                src={`/api/v1/product/product-photo/${product._id}`} 
                                                alt={product.name} 
                                                width="100" 
                                                className="me-3" 
                                            />
                                            <div>
                                                <p className="mb-0">{product.name}</p>
                                                <p className="mb-0">{formatPrice(product.price)}</p>
                                            </div>
                                        </div>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => removeFromWishlist(product._id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WishlistPage;
