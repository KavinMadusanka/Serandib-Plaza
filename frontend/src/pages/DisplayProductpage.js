import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { useCart } from "../context/cart";
import { useWishlist } from "../context/wishlist"; // Import wishlist context
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useAuth } from '../context/auth';
import { Button } from "antd";
import { ShoppingCartOutlined, HeartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


// Utility function to format price in LKR
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(price);
};

const DisplayProductpage = () => {
    const [cart, setCart] = useCart();
    const { wishlist, setWishlist } = useWishlist(); // Get wishlist context
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [email, setEmail] = useState("");
    const [userName,setUserName] = useState('');
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();



    useEffect(() => {
        if (auth && auth.user) {
          setEmail(auth.user.email);
          setUserName(auth.user.fullname);
        }
      }, [auth]);

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    // Get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Get Total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    // Load more products
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    // Get filtered product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToWishlist = (product) => {
        if (!wishlist.some(item => item._id === product._id)) {
            setWishlist([...wishlist, product]);
            toast.success("Item added to wishlist!");
        } else {
            toast.error("Item already in wishlist!");
        }
    };

    const addToCart = async (_Id,quantity) => {
        try {
    
          if (quantity <= 0) {
            toast.error("Product is out of stock");
            return; // Exit the function if quantity is out of stock
          }
          const response = await axios.post('http://localhost:8088/api/v1/Cart/add-to-cart', {
            product: _Id,
            quantity: 1, 
            email: email 
          });
         
          if(response && response.data.success){
            toast.success(response.data.message);
            const res = await axios.put(`http://localhost:8088/api/v1/product/update-product-quantity/${_Id}`, {
            quantity: quantity -1,
          })
          if(res && res.data.success){
               // toast.success(res.data.message);
                
              }else{
                toast.error(res.data.message);
              }
            
          }else{   
    
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
    
    
        // try {
         
        //   const response = await axios.put(`http://localhost:8000/api/v1/product/update-product-quantity/${productId}`, {
            
        //     quantity: quantity -1,
            
        //   });
        //   if(response && response.data.success){
        //     toast.success(response.data.message);
            
        //   }else{
        //     toast.error(response.data.message);
        //   }
          
        // } catch (error) {
          
        //   console.error('Error updating  product quantity to cart:', error);
        // }
    
       
    
    
    
      };

    return (
        <Layout title={"All Products - Best offers"}>
            
            {/* <Button
                            type="default"
                            icon={<HeartOutlined />}
                            onClick={() =>  navigate('/wishlist')} // Add to wishlist button
                            style={{ marginRight: '100px', backgroundColor: '#f5f5f5', borderColor: '#ccc', color: 'black' }}// No margin needed on the left button
                        >
                            My Wishlist
                        </Button> */}

            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="text-center" color="black">Filter By Category</h4>
                    <div className="d-flex flex-column align-items-left">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}

                        {/* Price filter */}
                        <h4 className="text-center mt-4">Filter By Price</h4>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {Prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="d-flex flex-column">
                            <button className="btn btn-danger" onClick={() => window.location.reload()}
                                style={{ flex: 1, marginRight: '5px' , backgroundColor: 'gray', 
                                    borderColor: 'gray', // Add border to match the background
                                    color: 'white'}}>
                                RESET FILTERS
                            </button>
                        </div>
                    </div>
                </div>

                

                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>

                    <Button 
                            type="default"
                            icon={<HeartOutlined />}
                            onClick={() =>  navigate('/wishlist')} // Add to wishlist button
                            style={{ marginleft: '100px', backgroundColor: '#f5f5f5', borderColor: '#ccc', color: 'black' }}// No margin needed on the left button
                        >
                            My Wishlist
                        </Button> 

                    {/* Search Bar */}
               <div className="mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
               <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
               <input
      type="text"
      className="form-control"
      placeholder="Search for products"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '10px 45px 10px 15px', // Extra padding on right for the icon
        width: '100%',
        borderRadius: '30px',
        border: '2px solid #ccc',
        outline: 'none',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow for depth
        marginBottom: '20px',
      }}
      onFocus={(e) => (e.target.style.borderColor = '#333')} // Darken the border on focus
      onBlur={(e) => (e.target.style.borderColor = '#ccc')} // Return to original color when not focused
    />
    <i
      className="fa fa-search"
      style={{
        position: 'absolute',
        top: '50%',
        right: '15px', // Adjust this to match the padding of the input field
        transform: 'translateY(-50%)',
        color: '#ccc',
        fontSize: '20px',
      }}
    />
  </div>
</div>



                    <div className="d-flex flex-wrap">
                        {filteredProducts.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">{formatPrice(p.price)}</p>
                                    <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-2"> {/* Added margin-bottom for space */}
                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => addToCart(p._id, p.quantity)}
                            style={{ flex: 1, marginRight: '5px' , backgroundColor: 'gray', 
                                borderColor: 'gray', // Add border to match the background
                                color: 'white'}} // Set text color to white for readability}} // Adjust spacing between buttons
                        >
                            Add to Cart
                        </Button>
                        
                        <Button
                            type="default"
                            icon={<HeartOutlined />}
                            onClick={() => addToWishlist(p)} // Add to wishlist button
                            style={{ flex: 1 }} // No margin needed on the left button
                        >
                            Wishlist
                        </Button>
                    </div>

                    <Button
                        type="link"
                        icon={<InfoCircleOutlined />}
                        onClick={() => navigate(`/product/${p.slug}`)} // Replace with actual function or route
                        style={{ width: '100%', marginTop: '10px', color: 'gray' }} // Full width and margin-top for spacing
                    >
                        More Details
                    </Button>
                </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <button onClick={() => setPage(page + 1)} className="btn btn-warning"
                        style={{ flex: 1, marginRight: '5px' , backgroundColor: 'white', 
                            borderColor: 'gray', // Add border to match the background
                            color: 'gray'}}
                        >
                            Load More
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DisplayProductpage;
