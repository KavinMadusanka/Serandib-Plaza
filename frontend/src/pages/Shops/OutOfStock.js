import React,{useEffect,useState} from 'react';
import InventoryMenu from '../../components/Layout/InventoryMenu'
import ShopHeader from '../../components/Layout/ShopHeader';
import { Paper, Typography, Box, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Layout, Select, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const {Option} = Select

const OutOfStock = () => {
    const [products,setProducts] = useState([]);
    const [email,setEmail] = useState("");
    const [auth,setAuth] = useAuth();
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");


    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${auth?.shopOwner?.email}`);
            const outOfStockProducts = data.products.filter(p => p.quantity === 0);
            setProducts(data.products);
            setFilteredProducts(outOfStockProducts); // Set out of stock products
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    // Get all categories that are used by products
    const getUsedCategories = async () => {
        try {
            const { data: categoryData } = await axios.get('/api/v1/category/get-category');
            const usedCategories = categoryData.category.filter((category) =>
                filteredProducts.some((product) => product.category._id === category._id) // Use filteredProducts for categories
            );
            setCategories(usedCategories);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while fetching categories');
        }
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        if (value) {
            const filtered = products.filter((p) => p.category.name === value && p.quantity === 0); // Filter for out of stock only
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products.filter(p => p.quantity === 0)); 
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        filterProducts(selectedCategory, value);
    };

    const filterProducts = (category, query) => {
        let filtered = products.filter(p => p.quantity === 0); // Start with out of stock products

        if (category) {
            filtered = filtered.filter((p) => p.category.name === category);
        }

        if (query) {
            filtered = filtered.filter((p) => 
                p.name.toLowerCase().includes(query.toLowerCase()) || 
                p.description.toLowerCase().includes(query.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, [auth]);

    // Fetch categories only after products are loaded
    useEffect(() => {
        if (products.length > 0) {
            getUsedCategories();
        }
    }, [products]);

    useEffect(() =>{
        if(auth && auth?.shopOwner){
            setEmail(auth?.shopOwner?.email);
            // console.log(email)
        }
    },[auth]);


    return (
        <Layout>
        <div>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <ShopHeader />
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <InventoryMenu />
                        <Box sx={{ flexGrow: 1, p: 3 }}>
                            <div className='col md-9'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h1 className='text-center' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Out of Stock List</h1>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: 'darkred',
                                    marginLeft: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '30px', color: 'white' }}>
                                        {filteredProducts.length}
                                    </span>
                                </div>
                            </div><br></br>

                                <div className="d-flex justify-content-center mb-4">
                                    {/* Search product */}
                                    <Input
                                        placeholder="Search Products"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        style={{ width: 300 }} // Adjust width as needed
                                    />

                                    <Select
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        style={{ width: 300 }}
                                        allowClear
                                    >
                                        <Option value={null}>All Categories</Option>
                                        {categories?.map((category) => (
                                            <Option key={category._id} value={category.name}>
                                                {category.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                {/* Product Display */}
                                <div className='d-flex flex-wrap justify-content-center'>
                                    {filteredProducts?.map((p) => (
                                        <Link key={p._id} to={`/products/${p.slug}`} className='product-link'>
                                            <div className="card product-card"
                                                style={{
                                                    border: '1px solid #ccc',
                                                    margin: '10px',
                                                    width: '250px', // Optional: set a fixed width for uniformity
                                                    borderRadius: '8px', // Smooth rounded corners
                                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Add a soft shadow for elegance
                                                }}
                                            >
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top product-img"
                                                    alt={p.name}
                                                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} // Make the image corners match the card
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title"><b>{p.name}</b></h5>
                                                    <p className="card-text">{p.description}</p>
                                                    {/* Price aligned to the right */}
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                        <p className="card-text" style={{ fontWeight: 'bold' }}>LKR {p.price}</p>
                                                    </div>
                                                </div>

                                                
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </div>
        </Layout>
      );
}

export default OutOfStock