import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Checkbox } from "antd";
import { useAuth } from "../context/auth";
import axios from "axios";


const DisplayProductpage = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);


    //get all category
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get("/api/v1/category/get-category");
            if (data?.success){
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    },[]);


    //get products
    const getAllProducts = async () => {
        try{
            const {data} = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);



    return(
        <Layout title={"All Products - Best offers"}>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => console.log(e)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                    {products.map((p) => (
                        <div className="card m-2" style={{width: "18rem"}}>
                            <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                                <button className="btn btn-primary ms-1">More Details</button>
                                <button className="btn btn-secondary ms-1">
                                    ADD TO CART
                                    </button>
                                <button class="btn btn-thirshary ms-1">ADD TO Wishlist</button>
                            </div>
                        </div>
                    ))}
                        
                    </div>
                </div>
            </div>
        </Layout>
    );

};

export default DisplayProductpage;