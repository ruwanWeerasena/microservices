import logo from './logo.svg';
import './App.css';
import { createContext } from 'react';
import { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
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
import { Analytics, DarkMode, Discount as DiscountIcon, Inventory, ViewList } from '@mui/icons-material';
import Overview from './features/overview/Overview';
import axios from 'axios';
import DiscountsOverview from './components/discount/DiscountsOverview';
import Discount from './features/discount/Discount';
import Orders from './features/orders/Orders';

const ProductsContext = createContext();

function App() {

  const navigate = useNavigate();
  const [products,setProducts] = useState([])
  const [discounts,setDiscounts] = useState([])
  const [orders,setOrders] = useState([]);

  const fetchOrders = async()=>{
    await axios.get(`http://localhost:8004/api/v1/order`).then(res=>{setOrders(res.data)})
  }
  const fetchCatalog = async()=>{
    await axios.get(`http://localhost:8000/api/v1/catalog`).then(res=>{setProducts(res.data)})
  }
  const fetchDiscounts = async()=>{
    await axios.get(`http://localhost:8002/api/v1/discount`).then(res=>{setDiscounts(res.data)})
  }
  

  useEffect(()=>{
    fetchOrders()
    fetchCatalog()
    fetchDiscounts()
  },[])



  // things related to nav
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ProductsContext.Provider value={{products,setProducts,discounts,setDiscounts,orders,setOrders}}>
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
                onClick={()=>navigate('/')}
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
                <ListItemText primary={"Overview"} sx={{ opacity: open ? 1 : 0 }} />
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
                onClick={()=>navigate('/catalog')}
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
                onClick={()=>navigate('/discount')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <DiscountIcon />
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
                onClick={()=>navigate('/orders')}
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
        
        
            
              <Routes>
                  <Route path="/" element={<Overview/>}/>
                  <Route path="/catalog" element={<Catalog/>}/>
                  <Route path="/discount" element={<Discount/>}/>
                  <Route path="/orders" element={<Orders/>}/>
              </Routes>
        
        
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

export const createProduct = async(product,setProducts)=>{
   axios.post(`http://localhost:8000/api/v1/catalog`,product).then(res=>{setProducts(c=>{return[...c,res.data]})})
}
export const deleteProduct = async(productId,setProducts)=>{
  axios.delete(`http://localhost:8000/api/v1/catalog/${productId}`).then(res=>{setProducts(c=>c.filter(p=>p.id!==productId))
})}
export const updateProduct = async(product,setProducts)=>{
  axios.put(`http://localhost:8000/api/v1/catalog`,product).then(res=>{setProducts(c=>{
    const filtered = c.filter((p)=>p.id!==product.id)
    return[...filtered,product]
  })})
}
export const createDiscount = async(discount,setDiscounts)=>{
  axios.post(`http://localhost:8002/api/v1/discount`,discount).then(res=>{setDiscounts(c=>{return[...c,res.data]})})
}
export const deleteDiscount = async(productName,setDiscounts)=>{
  axios.delete(`http://localhost:8002/api/v1/discount/${productName}`).then(res=>{setDiscounts(c=>c.filter((d)=>d.productName!==productName))})
}
export default App;
export {ProductsContext}