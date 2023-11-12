import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { getproductscategorized } from '../../features/overview/Overview';
import { deleteProduct } from '../../App';

export default function CatalogTable({setSelectedProduct,products,setProducts}) {
    const [data,setData]= useState(products)
    useEffect(()=>{
        setData(products)
    },[products])
    

    const handleSearchFilter = (term)=>{
        const matched = products
        .filter(product => product.name.toLowerCase().includes(term.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
        const nonMatching = products.filter(product =>
            !product.name.toLowerCase().includes(term.toLowerCase())
          );
        setData([...matched,...nonMatching])
    }

    const handleCategoryFilter = (term)=>{
        const matched = products
        .filter(product => product.category.toLowerCase().includes(term.toLowerCase()))
        .sort((a, b) => a.category.localeCompare(b.category));
        const nonMatching = products.filter(product =>
            !product.category.toLowerCase().includes(term.toLowerCase())
          );
        setData([...matched,...nonMatching])
    }
    const handleDelete = (productId)=>{
      const confirm = window.confirm("Are You Sure to Delete this Product")
      if(confirm){
        deleteProduct(productId,setProducts)
      }
    }

  return (
    <TableContainer component={Paper}>
        <div style={{display:"flex", gap:"10px", margin:"15px 0px 5px 0px"}}>
            <TextField 
                                fullWidth
                                id="outlined-basic" 
                                variant="outlined"
                                label="Search By Name"
                                type="text"
                                name="imageFile"
                                onChange={(e)=>{handleSearchFilter(e.target.value)}}
                            
                                />
            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">category</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='category'
                                label="category"
                                onChange={(e)=>{handleCategoryFilter(e.target.value)}}
                                >
                                    <MenuItem value={'All'}>All</MenuItem>
                                    {
                                        Object.keys(getproductscategorized(products)).map((item)=>{
                                           return(
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                           );
                                        })
                                        
                                    }
                                </Select>
                            </FormControl>
        </div>
      
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Summery</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right"><img width={50} height={50} src={row.imageFile} alt='' /></TableCell>
              <TableCell align="right">{row.summery}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right"><Button onClick={()=>{setSelectedProduct({type:"edit",data:row})}} variant='contained'>Edit</Button></TableCell>
              <TableCell align="right"><Button onClick={()=>handleDelete(row.id)} color='error' variant='contained'>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}