import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/AddBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';

const InventoryMenu = () => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#1c1c1c',
                    color: '#ffffff',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 64,
                    backgroundColor: '#282828',
                    marginBottom: '1rem',
                }}
            >
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Serendib Plaza</Typography>
            </Box>
            <List>
                <ListItem button component={Link} to="/products" aria-label="Products">
                    <ListItemIcon>
                        <ListAltIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Products" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/lowLevelStock" aria-label="Products">
                    <ListItemIcon>
                        <ListAltIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Low Level Stock" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/outOfStock" aria-label="Products">
                    <ListItemIcon>
                        <ListAltIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Out of Stock" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/createProduct" aria-label="Create Product">
                    <ListItemIcon>
                        <AddBoxIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Add Product" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/createCategory" aria-label="Create Category">
                    <ListItemIcon>
                        <CategoryIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Create Category" sx={{ color: '#ffffff' }} />
                </ListItem>
                {/* <ListItem button component={Link} to="/orders" aria-label="Orders">
                    <ListItemIcon>
                        <ShoppingCartIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Orders" sx={{ color: '#ffffff' }} />
                </ListItem> */}
            </List>
        </Drawer>
    );
};

export default InventoryMenu;
