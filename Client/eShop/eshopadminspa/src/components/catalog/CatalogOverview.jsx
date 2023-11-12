import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const CatalogOverview = ({total,data}) => {
  return (
    <Card sx={{ Width: '100%' , display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-evenly",backgroundColor:"#f2f2f2"}}>
      <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-between"}}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
         Total Inventory
        </Typography>
        <Typography variant="h5" component="div">
            {total} items
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
         Total Categories found
        </Typography>
        <Typography variant="h5" component="div">
            {Object.keys(data).length} 
        </Typography>
        <div style={{display:"flex", flexWrap:'wrap', gap:"10px"}}>
          {
            Object.keys(data).map((cat,idx)=>{
              
              return (
                <div key={idx} style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {cat}
                    </Typography>
                    <Typography  component="div">
                        {data[cat].length} items
                    </Typography>
                </div>
              )
            })
          }
            
           

        </div>
      
      </CardContent>
      
    </Card>
  )
}

export default CatalogOverview