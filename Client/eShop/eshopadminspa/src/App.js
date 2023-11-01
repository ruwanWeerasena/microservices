import logo from './logo.svg';
import './App.css';
import { createContext } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from './features/catalog/Catalog';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Analytics, DarkMode, Discount, Inventory, ViewList } from '@mui/icons-material';
import Overview from './features/overview/Overview';

const ProductsContext = createContext();
function App() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [products,setProducts] = useState([])
  const [cart,setCart] = useState({
    userName:"",
    items:[],
    totalPrice:0,
    count:0
  })
  const [orders,setOrders] = useState([]);
  // 
  return (
    <ProductsContext.Provider value={{products,setProducts,cart,setCart,orders,setOrders}}>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:'#1b1b1b'}}   position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            eShop On Containers Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer  sx={{backgroundColor:'#1b1b1b'}} variant="permanent" open={open}>
        <DrawerHeader  sx={{backgroundColor:'#1b1b1b'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color:"white"}} /> : <ChevronLeftIcon sx={{color:"white"}} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Analytics />
                </ListItemIcon>
                <ListItemText primary={"Mail"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          
         
        </List>
        <Divider />
        <List>
         
            

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Inventory />
                </ListItemIcon>
                <ListItemText primary={"Catalog"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Discount />
                </ListItemIcon>
                <ListItemText primary={"Discounts"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <ViewList />
                </ListItemIcon>
                <ListItemText primary={"Orders"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
        <DrawerHeader/>
        
        <BrowserRouter>
            
              <Routes>
                  <Route path="/" element={<Overview/>}/>
              </Routes>
        </BrowserRouter>
        
      </Box>
    </Box>
  </ProductsContext.Provider>
  );
}
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default App;
