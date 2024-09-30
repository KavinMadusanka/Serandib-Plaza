import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for API requests

// Utility function to format price in LKR
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(price);
};

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // State to hold quantities locally
    const [quantities, setQuantities] = useState({});

    // Initialize quantities to 1 for new items or retrieve from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || {};

        // Initialize quantities to 1 for items not in stored quantities
        const initialQuantities = storedCart.reduce((acc, item) => {
            if (!storedQuantities[item._id]) {
                acc[item._id] = 1; // Set to 1 if not stored
            } else {
                acc[item._id] = storedQuantities[item._id]; // Retrieve stored quantity
            }
            return acc;
        }, {});

        setQuantities(initialQuantities);
        setCart(storedCart);
    }, [setCart]);

    // Calculate total price based on the current quantity
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach(item => {
                total += item.price * (quantities[item._id] || 1); // Use local quantities
            });
            return formatPrice(total); // Format total price in LKR
        } catch (error) {
            console.log(error);
        }
    };

    // Function to update product quantity in MongoDB
    const updateProductQuantityInDB = async (pid, change) => {
        try {
            await axios.patch(`/api/v1/product/update-product-quantity/${pid}`, {
                change
            });
        } catch (error) {
            console.log("Error updating product quantity in MongoDB:", error);
        }
    };

    // Update item quantity and ensure it's stored in both the cart state and localStorage
    const updateQuantity = (pid, action) => {
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            let currentQuantity = newQuantities[pid] || 1;
            let change = 0;

            if (action === "increase") {
                newQuantities[pid] = currentQuantity + 1;
                change = -1; // Decrease stock in MongoDB
            } else if (action === "decrease" && currentQuantity > 1) {
                newQuantities[pid] = currentQuantity - 1;
                change = 1; // Increase stock in MongoDB
            }

            // Update the cart state with new quantities
            const updatedCart = cart.map(item => {
                if (item._id === pid) {
                    return { ...item, quantity: newQuantities[pid] };
                }
                return item;
            });

            // Save updated cart and quantities to localStorage
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            localStorage.setItem("quantities", JSON.stringify(newQuantities));
            setCart(updatedCart);

            // Update MongoDB with the change in quantity
            if (change !== 0) {
                updateProductQuantityInDB(pid, change);
            }

            return newQuantities;
        });
    };

    // Delete item from the cart
    const removeCartItem = (pid) => {
        try {
            const removedItem = cart.find(item => item._id === pid);
            const currentQuantity = quantities[pid] || 1;

            // Restore stock in MongoDB when item is removed
            updateProductQuantityInDB(pid, currentQuantity); // Increase stock by the quantity removed

            const updatedCart = cart.filter(item => item._id !== pid);
            const updatedQuantities = { ...quantities };
            delete updatedQuantities[pid]; // Remove quantity of deleted item

            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            localStorage.setItem("quantities", JSON.stringify(updatedQuantities)); // Update quantities in localStorage
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length
                                ? `You have ${cart.length} item(s) in your cart ${
                                    auth?.token ? "" : "please login to checkout"
                                }`
                                : "Your Cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {cart?.map(p => (
                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                <div className="col-md-4">
                                    <img 
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"100px"}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price: {formatPrice(p.price)}</p>

                                    <div className="quantity-controls">
                                        <button 
                                            className="btn btn-secondary" 
                                            onClick={() => updateQuantity(p._id, "decrease")}
                                        >−</button>
                                        <span className="quantity-box mx-2">
                                            {quantities[p._id] || 1} {/* Display local quantity */}
                                        </span>
                                        <button 
                                            className="btn btn-secondary" 
                                            onClick={() => updateQuantity(p._id, "increase")}
                                        >+</button>
                                    </div>

                                    <button 
                                        className="btn btn-danger mt-2" 
                                        onClick={() => removeCartItem(p._id)}
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr/>
                        <h4>Total: {totalPrice()}</h4>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
