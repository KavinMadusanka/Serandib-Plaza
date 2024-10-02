import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState(null); // Initialize as null
    const [error, setError] = useState(null); // Add error state
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        console.log('Current slug:', params.slug); // Log the slug
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug]);

    // Fetch product details
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-single-product/${params.slug}`);
            console.log(data); // Log the API response
            setProduct(data?.product[0]); // Ensure data.product is not undefined
            //getSimilarProduct(data?.product[0]._id, data?.product[0].category._id);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch product details."); // Set an error message
        }
    };

    // Ensure product data is available before rendering
    if (error) {
        return <div>{error}</div>; // Display error message
    }

    if (!product) {
        return <div>Loading...</div>; // Optional loading state
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        {/* Placeholder for Product Image (if available) */}
                        <img
                            src={`/api/v1/product/product-photo/${product._id}`} // Assuming this endpoint returns the product image
                            alt={product.name}
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{product.name}</h1>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>Price:</strong> {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.price)}</p>
                        <p><strong>Category:</strong> {product?.category?.name}</p>
                        <p><strong>Stock Available:</strong> {product.quantity}</p>
                        {/* <p><strong>Reorder Level:</strong> {product.reorderLevel}</p>
                        <p><strong>Seller Contact:</strong> {product.email}</p> */}

                        {/* Add button for "Add to Cart" */}
                        <button className="btn btn-primary" disabled={product.quantity < 1}>
                            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>

            </div>
            {/* <div className='row'>
                <h1>Similar Products</h1>
                {JSON.stringify(relatedProducts, null, 4)}
            </div> */}
        </Layout>
    );
};

export default ProductDetails;
