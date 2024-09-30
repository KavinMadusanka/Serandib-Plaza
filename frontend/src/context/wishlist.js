import { useState, useContext, createContext, useEffect } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const existingWishlist = localStorage.getItem("wishlist");
        if (existingWishlist) setWishlist(JSON.parse(existingWishlist));
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook for using wishlist context
const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
