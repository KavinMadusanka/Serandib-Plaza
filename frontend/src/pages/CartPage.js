import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'; // Import axios for API requests
import jsPDF from 'jspdf';
import 'jspdf-autotable';// Import jsPDF for report generation


// Utility function to format price in LKR
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(price);
};



const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [quantities, setQuantities] = useState({}); // For storing item quantities locally

    // Get all cart details when email changes
    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8088/api/v1/cart/get-cart/${email}`);
                setCart(response.data.cart);
            } catch (error) {
                console.error('Error fetching cart details:', error);
            }
        };
        if (email) {
            fetchCartDetails();
        }
    }, [email]);

    // Fetch user information (email, username) from auth context
    useEffect(() => {
        if (auth && auth.user) {
            setEmail(auth.user.email); // Set email from auth context
            setUserName(auth.user.fullname); // Set userName from auth context
        }
    }, [auth]);

    // Handle delete cart item
    const handleDeleteCartItem = async (id, quantity, productID, cartQuantity) => {
        try {
            await axios.delete(`http://localhost:8088/api/v1/Cart/delete-cart-item/${id}`);
            setCart(cart.filter(item => item && item._id !== id));
            toast.success("Item deleted successfully");

            // Update product quantity in the database
            try {
                await axios.put(`http://localhost:8088/api/v1/product/update-product-quantity/${productID}`, {
                    quantity: quantity + cartQuantity,
                });
            } catch (error) {
                console.error('Error updating product quantity after deletion:', error);
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    // Handle updating cart item quantity
    // Handle quantity change and update the backend (cart and product quantity)
const updateQuantity = async (id, type, currentQuantity, productID, productQuantity) => {
    let newQuantity;
    if (type === "increase" && currentQuantity < productQuantity) {
        newQuantity = currentQuantity + 1;
    } else if (type === "decrease" && currentQuantity > 1) {
        newQuantity = currentQuantity - 1;
    } else {
        return; // Exit if no valid update
    }

    // Update cart item quantity
    try {
        // Update quantity in the cart
        await axios.put(`http://localhost:8088/api/v1/Cart/update-item/${id}`, { quantity: newQuantity });
        setCart(cart.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item)));

        // Update product stock in the database (increase or decrease based on the action)
        const stockChange = type === "increase" ? -1 : 1;
        await axios.put(`http://localhost:8088/api/v1/product/update-product-quantity/${productID}`, {
        quantity: productQuantity + stockChange, // Make sure you are correctly adjusting the stock
        });

        // Success notification and UI update
        toast.success("Quantity updated successfully");
    } catch (error) {
        console.error("Error updating item quantity or product stock:", error);
    }
};

const totalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * (quantities[item._id] || item.quantity), 0);
};

    // Handle quantity change
    // const updateQuantity = (id, type) => {
    //     const currentQuantity = quantities[id] || 1;
    //     if (type === "increase") {
    //         setQuantities(prev => ({ ...prev, [id]: currentQuantity + 1 }));
    //     } else if (type === "decrease" && currentQuantity > 1) {
    //         setQuantities(prev => ({ ...prev, [id]: currentQuantity - 1 }));
    //     }
    // };


    const generateShoppingCartReport = () => {
      const doc = new jsPDF();
  
      // Company Name and Header Details
      const companyName = "Serendib Plaza";
      const reportTitle = "Shopping Cart Report";
      const currentDate = new Date().toLocaleDateString();
      const userName = auth?.user?.name || "Customer"; // Assuming you have the user's name
      const totalItemsInCart = cart.length; // Using the correct 'cart' array
  
      // Header
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text(companyName, 14, 20); // Company name at the top-left corner
  
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${currentDate}`, 14, 30); // Date below the company name
  
      doc.setFontSize(14);
      doc.text(`Customer: ${userName}`, 14, 40); // Customer name
  
      // Centered Report Title
      doc.setFontSize(18);
      const textWidth = doc.getTextWidth(reportTitle);
      const pageWidth = doc.internal.pageSize.width;
      doc.text(reportTitle, (pageWidth - textWidth) / 2, 50);
  
      // Draw a horizontal line below the header
      doc.setLineWidth(0.5);
      doc.line(14, 55, pageWidth - 14, 55);
  
      // Table Columns for Cart Items
      const columns = ["No.", "Product Name", "Price (Rs.)", "Quantity", "Subtotal (Rs.)"];
      const data = cart.map((item, index) => [
          index + 1,
          item.product.name,
          item.product.price.toFixed(2),
          item.quantity,
          (item.product.price * item.quantity).toFixed(2),
      ]);
  
      // Auto Table for Cart Items
      doc.autoTable({
          head: [columns],
          body: data,
          startY: 60, // Positioning the table after the header
          styles: {
              cellPadding: 3,
              fontSize: 12,
              overflow: 'linebreak',
          },
          headStyles: {
              fillColor: [0, 123, 255], // Example blue color for the header
              textColor: [255, 255, 255],
          },
          columnStyles: {
              2: { halign: 'right' }, // Right-align the price column
              4: { halign: 'right' }, // Right-align the subtotal column
          },
          margin: { top: 10 },
      });
  
      // Add Total and Summary at the Bottom
      const finalY = doc.lastAutoTable.finalY; // Position after the table
      const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
      doc.setFontSize(14);
      doc.text(`Total Items: ${totalItemsInCart}`, 14, finalY + 10); // Left-aligned total items
      doc.text(`Total Amount: Rs. ${totalAmount.toFixed(2)}`, pageWidth - 14, finalY + 10, { align: 'right' }); // Right-aligned total amount
  
      // Footer with Page Number
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          const pageText = `Page ${i} of ${pageCount}`;
          const pageTextWidth = doc.getTextWidth(pageText);
          doc.text(pageText, pageWidth - pageTextWidth - 14, doc.internal.pageSize.height - 10); // Bottom-right corner
      }
  
      // Save the PDF
      doc.save(`Kindify_Shopping_Cart_Report.pdf`);
  };
    return (
        <Layout>
      <div className="container" style={{ padding: "20px" }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-3 mb-4">
              Hello, {userName}
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
            {cart?.map((p) => (
              <div
                className="row mb-4 p-3 card flex-row"
                key={p._id}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8088/api/v1/product/product-photo/${p.product._id}`}
                    alt={p.product.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                    {p.product.name}
                  </h5>
                  <p style={{ color: "#28a745" }}>
                    Price: {formatPrice(p.product.price)}
                  </p>
                  <p>
                    <strong>
                      Available:{" "}
                      {p.product.quantity <= 0 ? "Out of Stock" : p.product.quantity}
                    </strong>
                  </p>

                  <div
                    className="quantity-controls"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        updateQuantity(
                          p._id,
                          "decrease",
                          quantities[p._id] || p.quantity,
                          p.product._id,
                          p.product.quantity
                        )
                      }
                      style={{ fontSize: "18px", padding: "5px 10px" }}
                    >
                      −
                    </button>
                    <span
                      className="quantity-box mx-2"
                      style={{
                        fontSize: "18px",
                        minWidth: "30px",
                        textAlign: "center",
                      }}
                    >
                      {quantities[p._id] || p.quantity}
                    </span>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        updateQuantity(
                          p._id,
                          "increase",
                          quantities[p._id] || p.quantity,
                          p.product._id,
                          p.product.quantity
                        )
                      }
                      style={{ fontSize: "18px", padding: "5px 10px" }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger mt-3"
                    onClick={() =>
                      handleDeleteCartItem(
                        p._id,
                        p.product.quantity,
                        p.product._id,
                        p.quantity
                      )
                    }
                    style={{ fontSize: "16px", padding: "8px 16px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
              Cart Summary
            </h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 style={{ fontWeight: "bold", color: "#28a745" }}>
              Total: {formatPrice(totalPrice())}
            </h4>
            <button
              className="btn btn-primary mt-4"
              style={{ fontSize: "18px", padding: "10px 20px" }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            {/* Button to generate PDF report */}
            <button
              className="btn btn-secondary mt-4"
              onClick={generateShoppingCartReport}
              style={{ fontSize: "18px", padding: "10px 20px" }}
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </Layout>
    );
};

export default CartPage;
