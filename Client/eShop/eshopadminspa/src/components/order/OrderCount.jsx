import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const OrderCount = ({totalcount,data}) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const month =new Date().getMonth()
  return (
    <Card sx={{ minWidth: 275 , display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-evenly",backgroundColor:"#f2f2f2"}}>
      <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-between"}}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
         Total Orders
        </Typography>
        <Typography variant="h5" component="div">
            {totalcount}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Orders For month {monthNames[month]}
        </Typography>
        <Typography variant="h5" component="div">
            {data[month]}
        </Typography>
      </CardContent>
      
    </Card>
  );
};

export default OrderCount;
