import React, { useEffect, useState } from 'react';
import { Button,FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import './catalogform.css'
import { Formik } from 'formik'
import Resizer from "react-image-file-resizer";
import { createProduct, updateProduct } from '../../App';

const CatalogForm = ({selectedProduct,setSelectedProduct,catData,setProducts}) => {
    
  
    const validate = (values)=>{
        const errors = {};
       
        if(!values.name) errors.name = 'Required'
        if(!values.category) errors.category = 'Required'
        if(!values.summery) errors.summery = 'Required'
        if(!values.description) errors.description = 'Required'
        if(!values.imageFile) errors.imageFile = 'Required'
 
        if(!values.price) errors.price = 'Required'
        return errors
    }
    const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
    
    const handleFileUpload = async (e,setFieldValue) => {
        try {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            
            setFieldValue(
                "imageFile",
                image
              );
            console.log(image);
          } catch (err) {
            console.log(err);
          }
      };
    return(
    <div className='catalogformsection'>
    <div><h2  style={{margin:"10px 0px 10px 0px"}}>Catalog Form</h2></div>
    <div className='catalogform'>
            <Formik
                        initialValues={selectedProduct.data}
                        enableReinitialize
                        validate={values => validate(values)}
                        onSubmit={async(values, { setSubmitting , resetForm  }) => {
                           if(selectedProduct.type=="edit"){
                                await updateProduct(values,setProducts).then(()=>{setSelectedProduct({type:"add",data:{
                                    name: '',
                                    category:'',
                                    summery:'',
                                    description:'',
                                    imageFile:'',
                                    price:'',
                                  }});resetForm()})
                           }
                           else{
                                await createProduct(values,setProducts).then(()=>resetForm())
                           }
                           console.log(values);
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
                    <div className='twoinputstogethersection'>
                        <div  style={{width:"100%"}}>
                            <TextField 
                              
                                label="Name" 
                                variant="outlined"
                                type="text"
                                name="name"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name} 
                                />
                            
                            <span className='catalogformerrors'>{errors.name && touched.name && errors.name}</span>
                        </div>
                        <div style={{width:"100%"}}>
                            <FormControl fullWidth>
                                <InputLabel>category</InputLabel>
                                <Select
                                value={values.category}
                                name='category'
                                label="category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                >
                                    {
                                         Object.keys(catData).map((cat,idx)=>{
                                            return(
                                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                            );
                                         })
                                    }
                                
                                </Select>
                            </FormControl>
                            <span className='catalogformerrors'>{errors.category && touched.category && errors.category}</span>
                            
                        </div>
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
                                label="Summery"
                                type="text"
                                name="summery"
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.summery} 
                                />
                            <span className='catalogformerrors'>{errors.summery && touched.summery && errors.summery}</span>
                            <div style={{display:"flex"}}>
                                <div>
                                    <InputLabel>Upload Image here</InputLabel>
                                    <TextField 
                                    
                                    
                                    variant="outlined"
                                    
                                    type="file"
                                    name="imageFile"
                                    
                                    onChange={(e) => handleFileUpload(e,setFieldValue)}
                                    onBlur={handleBlur}
                                    />
                                    <span className='catalogformerrors'>{errors.imageFile && touched.imageFile && errors.imageFile}</span>
                                </div>
                                <div>
                                    {values.imageFile!=''&&<img width={100} height={100} src={values.imageFile} alt='' />}
                                </div>
                                
                            </div>
                            <TextField 
                             
                             
                             variant="outlined"
                             label="price"
                             type="text"
                             name="price"
                             fullWidth
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.price} 
                             />
                            <span className='catalogformerrors'>{errors.price && touched.price && errors.price}</span>
                    </div>
                   
                    <hr style={{margin:"20px 0px 20px 0px"}}/>
                    <Button type="submit" sx={{margin:"5px 0px 5px 0px"}}  color='info' fullWidth variant='contained'>Submit</Button>
                </form>
             )}
             </Formik>
    </div>
    
    
</div>
)};

export default CatalogForm;

