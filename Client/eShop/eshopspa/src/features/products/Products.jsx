import { Breadcrumbs, Pagination, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './products.css'
import { LastProduct } from '../../components/SpecialProductCards/LastProduct/LastProduct'
import ProductCard from '../../components/ProductCard/ProductCard'
import MenuIcon from '@mui/icons-material/Menu';
import { ProductsContext } from '../../App'

const Products = () => {
  const {eShopProducts} = useContext(ProductsContext);
  const [data,setData]= useState([]);
  const cards_per_page = 8;
  const [page, setPage] = useState(1);

  const handlePage = (e, p) => {
    setPage(p);
  }


  useEffect(()=>{
    var start = (cards_per_page*page)-cards_per_page;
    var end = (page*cards_per_page)
    setData(eShopProducts.slice(start,end))
    window.scrollTo(0, 0)
   
    
  },[page,eShopProducts])
  

  return (
    <div id='productspage'>
        <div className='productspageheader'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to={'/'}>
                Home
                </Link>
                <Link
                underline="hover"
                color="inherit"
                to={'/products'}
                >
                Category
                </Link>
              
            </Breadcrumbs>
        </div>
        <div className='productspagebody'>
            <div className='colfilteringside'>
              {/* categories tile */}
              <div className='productCategories'>
                <div className='productCategoriesHeader'>
                  <MenuIcon/>
                  <span>CATEGORIES</span>
                </div>
                <div className='productCategoriesbody'>
                  <span>Smart Phone</span>
                  <span>White Appliances</span>
                  <span>Home Kitchen</span>
                </div>
              </div>
              {/* lastproduct tile */}
              {data[0]&&<LastProduct product={data[0]}/>}
            </div>
            <div className='colproductside'>
              <div className='colproductsideProducts'>
                {
                data.map((item)=>{
                  return <ProductCard key={item.id} product={item}/>
                })
                }
                
              </div>
              <div className='colproductsidePagination'>
                <Stack spacing={2}>
                  <Pagination onChange={handlePage} count={Math.ceil(eShopProducts.length/cards_per_page)} page={page}   variant="outlined" shape="rounded" />
                </Stack>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default Products