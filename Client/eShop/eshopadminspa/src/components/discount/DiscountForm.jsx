import React from 'react';
import { Autocomplete, Button, TextField } from '@mui/material'

import { Formik } from 'formik'
import { createDiscount } from '../../App';

const DiscountForm = ({products,setDiscounts}) => {
    
    const initial = {
        productName:null,
        description:'',
        amount:''
    }
  
    const validate = (values)=>{
        const errors = {};
       
        if(!values.productName) errors.productName = 'Required'
        if(!values.description) errors.description = 'Required'
        if(!values.amount) errors.amount = 'Required'

        return errors
    }
    
  
    return(
    <div className='catalogformsection'>
    <div><h2  style={{margin:"10px 0px 10px 0px"}}>Discount Form</h2></div>
    <div className='catalogform'>
            <Formik
                        initialValues={initial}
                        enableReinitialize
                        validate={values => validate(values)}
                        onSubmit={async(values, { setSubmitting, resetForm }) => {
                         await createDiscount(values,setDiscounts).then(()=>resetForm())
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
                            setFieldValue
                            /* and other goodies */
                        }) => (
                <form style={{width:"100%"}} onSubmit={handleSubmit} >
                  
                       
                    <div style={{width:"100%"}}>
                        <Autocomplete
                            fullWidth
                            disablePortal
                            name='productName'
                            value={values.productName}
                            options={products.map((p)=>p.name)}
                            onChange={(e, value) => {
                               
                                setFieldValue(
                                  "productName",
                                  value !== null ? value :value
                                );
                              }}
                              onBlur={handleBlur}
                            
                           
                           
                            renderInput={(params) => <TextField {...params} label="Select a Product" />}
                        />
                        
                        <span className='catalogformerrors'>{errors.productName && touched.productName && errors.productName}</span>
                        
                    </div>
                    
                    <div style={{display:"flex",flexDirection:"column",gap:"5px",marginTop:"5px"}}>
                            <TextField 
                             
                            
                             variant="outlined"
                             label="Description"
                             type="text"
                             name="description"
                             fullWidth
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.description} 
                             />
                            <span className='catalogformerrors'>{errors.description && touched.description && errors.description}</span>
                            <TextField 
                             
                               
                                variant="outlined"
                                label="Amount"
                                type="text"
                                name="amount"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.amount} 
                                />
                            <span className='catalogformerrors'>{errors.amount && touched.amount && errors.amount}</span>
                            
                    </div>
                   
                    <Button type="submit" sx={{margin:"5px 0px 5px 0px"}}  color='info' fullWidth variant='contained'>Submit</Button>
                </form>
             )}
             </Formik>
    </div>
    
</div>
)};

export default DiscountForm;

