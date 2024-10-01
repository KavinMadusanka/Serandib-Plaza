import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventIcon from '@mui/icons-material/Event';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
//import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StoreIcon from '@mui/icons-material/Store';
import { useLocation, useNavigate } from 'react-router-dom';
import mallLogo from '../../assets/logo_white.png'; // Adjust the path to your logo image

const drawerWidth = 280;

const AdminMenu = () => {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // For navigation

  // Function to handle the click event and navigation
  const handleListItemClick = (path) => {
    navigate(path); // Navigate to the corresponding route
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'black',
          color: '#fff'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
        <img 
          src={mallLogo} // Path to your logo image
          alt="Mall Logo"
          style={{
            width: '50px', 
            height: '50px',
            marginRight: '16px',
          }}
        />
        <span 
          style={{
            fontSize: '24px',  // Increase the font size as needed
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
          }}
        >
        Serendib Plaza
      </span>
      </Box>

      <List>
        <ListItem 
          button 
          selected={location.pathname === '/adminProfile'} 
          onClick={() => handleListItemClick('/adminProfile')}
          sx={location.pathname === '/adminProfile' ? { backgroundColor: '#1976d2' } : {}}
        >
          <ListItemIcon>
            <HomeIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="DashBoard" />
        </ListItem>
        
        {/* All Shops */}
        <ListItem 
          button 
          selected={location.pathname === '/allshops'} 
          onClick={() => handleListItemClick('/allshops')}
          sx={location.pathname === '/allshops' ? { backgroundColor: '#1976d2' } : {}}
        >
          <ListItemIcon>
            <StoreIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="All Shops" />
        </ListItem>
        
        {/* All Users */}
        <ListItem 
          button 
          selected={location.pathname === '/allusers'} 
          onClick={() => handleListItemClick('/allusers')}
          sx={location.pathname === '/allusers' ? { backgroundColor: '#1976d2' } : {}}
        >
          <ListItemIcon>
            <PeopleIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="All Users" />
        </ListItem>
        
        {/* Products */}
        <ListItem 
          button 
          selected={location.pathname === '/p'} 
          onClick={() => handleListItemClick('/p')}
          sx={location.pathname === '/p' ? { backgroundColor: '#1976d2' } : {}}
        >
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

        {/* Events */}
        <ListItem 
          button 
          selected={location.pathname === '/EventAdmin'} 
          onClick={() => handleListItemClick('/EventAdmin')}
          sx={location.pathname === '/EventAdmin' ? { backgroundColor: '#1976d2' } : {}}
        >
          <ListItemIcon>
            <EventIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Happenings" />
        </ListItem>

        {/* Promotions
        <ListItem 
          button 
          selected={location.pathname === '/p'} 
          onClick={() => handleListItemClick('/p')}
          sx={location.pathname === '/p' ? { backgroundColor: '#1976d2' } : {}}
        >
          <ListItemIcon>
            <LocalOfferIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Promotions" />
        </ListItem> */}

        {/* Logout */}
        {/* <ListItem 
          button 
          selected={location.pathname === '/logout'} 
          onClick={() => handleListItemClick('/logout')}
          sx={location.pathname === '/logout' ? { backgroundColor: '#1976d2' } : {}}
        >
          <ListItemIcon>
            <ExitToAppIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem> */}
      </List>
    </Drawer>
  );
};

export default AdminMenu;
