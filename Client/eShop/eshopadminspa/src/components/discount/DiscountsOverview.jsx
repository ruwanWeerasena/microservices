import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const DiscountsOverview = ({total,data}) => {
  console.log(data);
  return (
    <Card sx={{ Width: '100%' , display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-evenly",backgroundColor:"#f2f2f2"}}>
      <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-between"}}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
         Total Discounts
        </Typography>
        <Typography variant="h5" component="div">
            {total} 
        </Typography>
       
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Total discounted products
        </Typography>
        <Typography variant="h5" component="div">
            {Object.keys(data).length} products
        </Typography>
           
      </CardContent>
      
    </Card>
  )
}

export default DiscountsOverview