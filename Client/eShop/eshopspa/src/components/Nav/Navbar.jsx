import * as React from 'react';
import { styled, alpha, rgbToHex } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Button, createTheme, useMediaQuery } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import "./navbar.css"
import { useTheme } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../App';
import { useContext } from 'react';
import SideDrawer from './SideDrawer/SideDrawer';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display:'flex',
  justifyContent:'flex-end',
  alignItems:'center',
  borderRadius: theme.shape.borderRadius,
  color:"rgb(0,0,0)",
  backgroundColor: alpha("rgb(255,255,255)", 1),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  backgroundColor:"white",
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `1rem`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const Navbar = ()=>{
  const {eShopCart} = useContext(ProductsContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="appbar"  position="static">
        <Toolbar>
          <div className='sidedrawerbutton'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <SideDrawer/>
            </IconButton>
          </div>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            eShop on Containers
          </Typography>
          <div  style={{display:"flex",alignItems:"center", flexGrow:1}}>
            <div className='navlinkscontainer' >
              <Link className='navlinks' to={"/"}>Home</Link>
              <Link className='navlinks' to={"/products"}>Product</Link>
              <Link className='navlinks' to={"/cart"}>Cart</Link>
              <Link className='navlinks' to={"/order"}>Order</Link>
              <Link className='navlinks' >Contact</Link>

            </div>
            <div className='navsearch' >
                <Search >
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  <SearchIconWrapper>
                      
                    <SearchIcon />
                  </SearchIconWrapper>
                  
                
                </Search>
                <div id='carticon'>
                  <Button onClick={()=>navigate('/cart')} id="carticonbtn"   sx={{height:"40px",marginLeft:"10px"}} color='success' size='50px' startIcon={<Badge color="error" badgeContent={eShopCart.count}><ShoppingCart/></Badge>}  variant="contained">Cart</Button>
                  <Badge id="carticonbadge" color="error" badgeContent={eShopCart.count}><ShoppingCart onClick={()=>navigate('/cart')}/></Badge>
                </div>
            </div>
            
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;