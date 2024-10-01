import React,{useEffect,useState} from 'react';
import InventoryMenu from '../../components/Layout/InventoryMenu'
import ShopHeader from '../../components/Layout/ShopHeader';
import { Paper, Typography, Box, Modal, Button, Divider, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Layout, Select, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';


const {Option} = Select

const Products = () => {
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
            const {data} = await axios.get(`/api/v1/product/get-product/${auth?.shopOwner?.email}`);
            setProducts(data.products);
            setFilteredProducts(data.products);
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    // Get all categories that are used by products
    const getUsedCategories = async () => {
        try {
            const { data: categoryData } = await axios.get('/api/v1/category/get-category');
            const usedCategories = categoryData.category.filter((category) =>
                products.some((product) => product.category._id === category._id)
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
            const filtered = products.filter((p) => p.category.name === value);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Show all products if no category is selected
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        filterProducts(selectedCategory, value);
    };

    const filterProducts = (category, query) => {
        let filtered = products;

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


    const generateReportWithoutImages = () => {
        const doc = new jsPDF();
    
        // Set the date
        const currentDate = new Date().toLocaleDateString();
    
        // Set filtered category name
        const categoryLabel = selectedCategory ? `Category: ${selectedCategory}` : 'All Categories';
    
        // Set total filtered products count
        const totalFilteredProducts = filteredProducts.length;
    
        // Shop details
        const shopName = auth?.shopOwner?.shopname;
        const shopAddress = auth?.shopOwner?.description;
        const shopContact = "Phone: "+ auth?.shopOwner?.shopcontact + " | Email: " + auth?.shopOwner?.email;
    
        // Set font and shop details
        doc.setFont("roboto", "bold");
        doc.setFontSize(18);
        doc.text(shopName, 14, 20); // Shop name at the top
    
        doc.setFont("roboto", "normal");
        doc.setFontSize(12);
        doc.text(shopAddress, 14, 26); // Shop address
        doc.text(shopContact, 14, 32); // Shop contact details
    
        // Set the title below the shop details
        doc.setFontSize(17);
        doc.setFont("roboto", "bold");
        // Calculate the width of the text
        const text = 'Inventory Report (All Products)';
        const textWidth = doc.getTextWidth(text);
        const pageWidth = doc.internal.pageSize.width;

        // Center the text
        doc.text(text, (pageWidth - textWidth) / 2, 50); 
        
        
        // Add the date, category, and total product count below the title
        doc.setFont("roboto", "normal");
        doc.setFontSize(12);
        const textYPosition = 60; // Set Y position for date and other details
        doc.text(`Date: ${currentDate}`, 14, textYPosition); // Left-aligned, below the title
        doc.text(categoryLabel, doc.internal.pageSize.width / 2, textYPosition, { align: 'center' }); // Center-aligned, below the title
        doc.text(`Total Products: ${totalFilteredProducts}`, doc.internal.pageSize.width - 14, textYPosition, { align: 'right' }); // Right-aligned, below the title

        const pageW = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const borderMargin = 7;

        // Draw a border
        doc.setLineWidth(0.2);
        doc.rect(borderMargin, borderMargin, pageW - 2 * borderMargin, pageHeight - 2 * borderMargin);

        // Draw a line above the title
        doc.setDrawColor(0); // Set line color
        const lineYPosition = 40; // Y position for the line
        doc.line(14, lineYPosition, doc.internal.pageSize.width - 14, lineYPosition); // Draw the line

        // Add a new column for category after 'Product Name'
        const columns = ["No.", "Product Name", "Category", "Price (Rs.)", "Qty", "Reorder Level"];
        const data = filteredProducts.map((product, index) => [
            index + 1,
            product.name,
            product.category.name, // Add the product category here
            product.price.toFixed(2),
            product.quantity,
            product.reorderLevel
        ]);
    
        // Generate the table with the new column
        doc.autoTable({
            head: [columns],
            body: data,
            startY: 70, // Adjust to ensure the header doesn't overlap with the table
            styles: {
                cellPadding: 1,
                fontSize: 12,
                overflow: 'linebreak',
            },
            headStyles: {
                fillColor: [76, 175, 80], // Example color
                textColor: [255, 255, 255],
            },
            columnStyles: {
                3: { halign: 'right' } // Right-align the price column (index 3)
            },
            margin: { top: 20 },
            didDrawCell: (data) => {
                if (data.section === 'body') {
                    doc.setDrawColor(200);
                    doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                }
            }
        });

        // Add page number at the bottom
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(12);
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            const text = `Page ${i} of ${pageCount}`;
            const textWidth = doc.getTextWidth(text);
            const pageWidth = doc.internal.pageSize.width;
            doc.text(text, pageWidth - textWidth - 14, doc.internal.pageSize.height - 10); // Positioning at the bottom right
        }
    
        doc.save('Inventory_Report(All_Products).pdf');
    };     
    
    
    // Excel report Generate

    // Function to generate Excel report
    const generateExcelReport = () => {
        // Prepare data for the Excel sheet
        const data = filteredProducts.map((product, index) => ({
            No: index + 1,
            'Product Name': product.name,
            Category: product.category.name,
            'Price (Rs.)': product.price.toFixed(2),
            Qty: product.quantity,
            'Reorder Level': product.reorderLevel
        }));

        // Create a new workbook and add the data
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

        // Generate and save the Excel file
        XLSX.writeFile(workbook, 'Inventory_Report(All_Products).xlsx');
    };
    


    return (
        <Layout>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <ShopHeader />
              <Box sx={{ display: 'flex', flexGrow: 1 ,backgroundColor: "#f5f5f5"}}>
                  <InventoryMenu />
                  <Box sx={{ flexGrow: 1, p: 3 }}>
                    <div className='col md-9'>
                    <h1 className='text-center' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        All Products List
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: '#4CAF50',
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: '30px', color: 'white' }}>
                                {filteredProducts.length}
                            </span>
                        </div>
                    </h1>
                    <br/>

                    
                    



                  <div className="d-flex justify-content-center mb-4">

                    {/* search product */}
                  <Input
                        placeholder="Search Products"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: 300, height: 40, marginRight: '10px' }} // Adjust width as needed
                    />

                  <Select
                    // placeholder="Select a Category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ width: 300, height: 40, marginRight: '10px' }}
                    allowClear
                  >
                    <Option value={null}>All Categories</Option>
                    {categories?.map((category) => (
                        <Option key={category._id} value={category.name}>
                            {category.name}
                        </Option>
                    ))}
                  </Select>


                    {/* Generate Report Buttons */}
                    <div>
                        <Button
                            variant="contained"
                            onClick={generateReportWithoutImages}
                            style={{ marginBottom: '20px', height: 40, backgroundColor: '#282828', color: 'white', marginRight: '10px' }}
                        >
                            <DownloadIcon style={{ marginRight: '5px' }} />
                            PDF Report
                        </Button>

                        <Button
                            variant="contained"
                            onClick={generateExcelReport}
                            style={{ marginBottom: '20px', height: 40, backgroundColor: '#282828', color: 'white' }}
                        >
                            <DownloadIcon style={{ marginRight: '5px' }} />
                            Excel Report
                        </Button>
                    </div>



                </div>

                {/* Color Guide */}
                <div className="color-guide" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to="/lowLevelStock" style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                            <div 
                                style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    backgroundColor: '#ff6666', 
                                    borderRadius: '50%', // Makes the div circular
                                    marginRight: '10px' 
                                }} 
                            />
                            <span style={{ color: 'black' }}>Low Level Stock</span>
                        </div>
                        </Link>


                        {/* Link to Out of Stock section */}
                        <Link to="/outOfStock" style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                <div 
                                    style={{ 
                                        width: '20px', 
                                        height: '20px', 
                                        backgroundColor: 'darkred', 
                                        borderRadius: '50%', // Makes the div circular
                                        marginRight: '10px' 
                                    }} 
                                />
                                <span style={{ color: 'black' }}>Out of Stock</span>
                            </div>
                        </Link>
                    </div>
                </div>


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

                                {/* Thick red line at the bottom */}
                                <div style={{ 
                                    height: '8px', 
                                    backgroundColor: p.quantity === 0 
                                        ? 'darkred' 
                                        : p.quantity <= p.reorderLevel 
                                        ? '#ff6666' // Light red for low quantity
                                        : 'transparent' // No color if above reorder level
                                }}></div>

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

export default Products