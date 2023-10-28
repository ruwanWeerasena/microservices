import React, { useContext, useEffect, useState } from 'react'
import './checkout.css'
import { Badge, Breadcrumbs, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { AlternateEmail } from '@mui/icons-material'
import { ProductsContext } from '../../App'
import axios from 'axios'

const Checkout = () => {
    const {eShopCart,seteShopCart} = useContext(ProductsContext);
    const navigate = useNavigate();

    const InitialValues ={
         totalPrice:eShopCart.totalPrice,
         firstName: '', 
         lastName: '',
         userName:eShopCart.userName,
         emailAddress:"",
         addressLine:"",
         addressLine2:"",
         country:"",
         state:"",
         zipCode:"",
         cardName:"",
         cardNumber:"",
         expiration:"",
         cvv:"",
         paymentMethod:0 
    }
    const validate = (values)=>{
        const errors = {};

        if(!values.userName) errors.userName = 'Required'


       
        if(!values.firstName) errors.firstName = 'Required'
        if(!values.lastName) errors.lastName = 'Required'
        if (!values.emailAddress) {
            errors.emailAddress = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailAddress)) {
            errors.emailAddress = 'Invalid email address';
        }
        if(!values.addressLine) errors.addressLine = 'Required'
        if(!values.country) errors.country = 'Required'
        if(!values.state) errors.state = 'Required'
        if(!values.zipCode) errors.zipCode = 'Required'


        if(!values.cardName) errors.cardName = 'Required'
        if(!values.cardNumber) errors.cardNumber = 'Required'
        if(!values.expiration) errors.expiration = 'Required'
        if(!values.cvv) errors.cvv = 'Required'

        return errors;
    }
  return (
    <div id='checkoutpage'>
        <div className='checkoutpageheader'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to={'/'}>
                Home
                </Link>
                <Link
                underline="hover"
                color="inherit"
                to={'/cart'}
                >
                Cart
                </Link>
                <Link
                underline="hover"
                color="inherit"
                to={'/checkout'}
                >
                CheckOut
                </Link>
              
            </Breadcrumbs>
        </div>
        <div className='checkoutpagebody'>
            <div className='checkoutpageformsection'>
                <div><h2  style={{margin:"10px 0px 10px 0px"}}>Billing address</h2></div>
                <div className='checkoutpageform'>
                    <Formik
                        initialValues={InitialValues}
                        validate={values => validate(values)}
                        onSubmit={async(values, { setSubmitting }) => {
                            await axios.post('/basket/checkout',values).then(
                                (res)=>{
                                    if(res.status===202){
                                        seteShopCart(c=>{return {...c,totalPrice:0,items:[]}});
                                        navigate('/order')}}
                                )
                        }}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form style={{width:"100%"}} onSubmit={handleSubmit}>
                                <div className='twoinputstogethersection' style={{display:"flex",gap:"10px"}}>
                                    <div  style={{width:"100%"}}>
                                        <TextField 
                                            id="outlined-basic" 
                                            label="First Name" 
                                            variant="outlined"
                                            type="text"
                                            name="firstName"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName} />
                                        <span className='checkoutformerrors'>{errors.firstName && touched.firstName && errors.firstName}</span>
                                        

                                    </div>
                                    <div style={{width:"100%"}}>
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Last Name" 
                                            variant="outlined"
                                            type="text"
                                            name="lastName"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName} />
                                    
                                        <span className='checkoutformerrors'>{errors.lastName && touched.lastName && errors.lastName}</span>
                                    </div>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",gap:"5px",marginTop:"5px"}}>
                                        <TextField 
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <AlternateEmail/>
                                                  </InputAdornment>
                                                ),
                                              }}
                                            disabled
                                            id="outlined-basic" 
                                            variant="outlined"
                                            // placeholder='User Name'
                                            type="text"
                                            name="userName"
                                            fullWidth
                                            defaultValue={eShopCart.userName} />
                                    
                                        <span className='checkoutformerrors'>{errors.userName && touched.userName && errors.userName}</span>
                                        <TextField 
                                         
                                            id="outlined-basic" 
                                            variant="outlined"
                                            label="Email"
                                            type="text"
                                            name="emailAddress"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email} />
                                    
                                        <span className='checkoutformerrors'>{errors.emailAddress && touched.emailAddress && errors.emailAddress}</span>
                                        <TextField 
                                         
                                         id="outlined-basic" 
                                         variant="outlined"
                                         label="Address"
                                         type="text"
                                         name="addressLine"
                                         fullWidth
                                         onChange={handleChange}
                                         onBlur={handleBlur}
                                         value={values.addressLine} />
                                 
                                        <span className='checkoutformerrors'>{errors.addressLine && touched.addressLine && errors.addressLine}</span>
                                        <TextField 
                                         
                                         id="outlined-basic" 
                                         variant="outlined"
                                         label="Address 2 (Optional)"
                                         type="text"
                                         name="addressLine2"
                                         fullWidth
                                         onChange={handleChange}
                                         onBlur={handleBlur}
                                         value={values.addressLine2} />
                                 
                                        <span className='checkoutformerrors'>{errors.addressLine2 && touched.addressLine2 && errors.addressLine2}</span>
                                        
                                </div>
                                <div className='formselectsection' style={{display:"flex",marginTop:"5px",gap:"5px"}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.country}
                                            name='country'
                                            label="Country"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            >
                                            <MenuItem value={"Srilanka"}>Srilanka</MenuItem>
                                            </Select>
                                            <span className='checkoutformerrors'>{errors.country && touched.country && errors.country}</span>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label2"
                                            id="demo-simple-select"
                                            value={values.state}
                                            name='state'
                                            label="state"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            >
                                            <MenuItem value={"Western Province"}>Western Province</MenuItem>
                                            <MenuItem value={"Northern Province"}>Northern Province</MenuItem>
                                            <MenuItem value={"North Central Province"}>North Central Province</MenuItem>
                                            <MenuItem value={"North Western Province"}>North Western Province</MenuItem>
                                            <MenuItem value={"Eastern Province"}>Eastern Province</MenuItem>
                                            <MenuItem value={"Uva Province"}>Uva Province</MenuItem>
                                            <MenuItem value={"Central Province"}>Central Province</MenuItem>
                                            <MenuItem value={"Sabaragamuwa Province"}>Sabaragamuwa Province</MenuItem>
                                            <MenuItem value={"Southern Province"}>Southern Province</MenuItem>
                                       
                                            </Select>
                                            <span className='checkoutformerrors'>{errors.state && touched.state && errors.state}</span>
                                        </FormControl>
                                        <div>
                                            <TextField 
                                            
                                            id="outlined-basic" 
                                            variant="outlined"
                                            label="Zip"
                                            type="text"
                                            name="zipCode"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.zipCode} />
                                    
                                            <span className='checkoutformerrors'>{errors.zipCode && touched.zipCode && errors.zipCode}</span>
                                        </div>
                                        
                                        
                                </div>
                                <hr style={{margin:"20px 0px 20px 0px"}}/>
                                <div>
                                    <div style={{display:"flex",alignItems:"center",marginBottom:"5px"}}>
                                        <Checkbox sx={{height:"15px"}}/>
                                        <span>Shiping address is the same as my billing address</span>
                                    </div>
                                    <div style={{display:"flex",alignItems:"center"}}>
                                        <Checkbox sx={{height:"15px"}}/>
                                        <span>Save this information for next time</span>
                                    </div>
                                </div>
                                
                                
                                
                                <hr style={{margin:"20px 0px 20px 0px"}}/>     
                                <div><h2 style={{margin:"10px 0px 10px 0px"}}>Payment</h2></div>    
                                <div>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={values.paymentMethod}
                                            name="paymentMethod"
                                            onChange={handleChange}

                                        >
                                            <FormControlLabel value={0} control={<Radio sx={{height:"15px"}} />} label="Credit Card" />
                                            <FormControlLabel value={1} control={<Radio sx={{height:"15px"}} />} label="Debit Card" />
                                            <FormControlLabel value={2} control={<Radio sx={{height:"15px"}} />} label="Paypal" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>    
                                <div className='twoinputstogethersection' style={{display:"flex",gap:"10px",margin:"10px 0px 10px 0px"}}>
                                    <div  style={{width:"100%"}}>
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Name on Card" 
                                            variant="outlined"
                                            type="text"
                                            name="cardName"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.cardName} />
                                        <span className='checkoutformerrors'>{errors.cardName && touched.cardName && errors.cardName}</span>
                                        

                                    </div>
                                    <div style={{width:"100%"}}>
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Credit Card Number" 
                                            variant="outlined"
                                            type="text"
                                            name="cardNumber"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.cardNumber} />
                                    
                                        <span className='checkoutformerrors'>{errors.cardNumber && touched.cardNumber && errors.cardNumber}</span>
                                    </div>
                                </div>   
                                <div className='twoinputstogethersection' style={{display:"flex",gap:"10px",margin:"10px 0px 10px 0px"}}>
                                    <div style={{display:"flex",flexDirection:"column"}} >
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Expiration" 
                                            variant="outlined"
                                            type="text"
                                            name="expiration"
                                            
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.expiration} />
                                        <span className='checkoutformerrors'>{errors.expiration && touched.expiration && errors.expiration}</span>
                                        

                                    </div>
                                    <div style={{display:"flex",flexDirection:"column"}} >
                                        <TextField 
                                            id="outlined-basic" 
                                            label="CVV" 
                                            variant="outlined"
                                            type="text"
                                            name="cvv"
                                            
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.cvv} />
                                    
                                        <span className='checkoutformerrors'>{errors.cvv && touched.cvv && errors.cvv}</span>
                                    </div>
                                </div>   
                                <hr style={{margin:"20px 0px 20px 0px"}}/>
                                <Button type="submit" sx={{margin:"5px 0px 5px 0px"}} disabled={isSubmitting} color='info' fullWidth variant='contained'>Submit</Button>
                            </form>
                        )}
                    </Formik>
                </div>
                
            </div>
            <div className='checkoutpagecart'>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h2>Your Cart</h2>
                    <Badge badgeContent={eShopCart.count} color="secondary"/>
                </div>
                { eShopCart.items &&
                    <div className='checkoutpagecartcard'>
                        {
                            eShopCart.items.map((itm)=>{
                                return (
                                    <div key={itm.productId} className='checkoutpagecartcarditem'>
                                        <div><h3>{itm.productName} </h3><span>{itm.productName} x {itm.quantity}</span></div>
                                        
                                        <div>${itm.price}</div>
                                    </div>
                                );
                            })
                        }
                        
                        
                        <div className='checkoutpagecartcarditem'>
                            <div><h3>Total (USD)</h3></div>
                            
                            <div>${eShopCart.totalPrice}</div>
                        </div>
                    </div>
                }
                
                <div className='checkoutpagecartcardpromo'>
                    
                    <input  style={{outline:"none",width:"100%",border:"1px solid gray",padding:"5px"}}></input>
                    <button style={{border:"1px solid gray",padding:"5px",color:"white",backgroundColor:"gray"}}>Redeem</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout