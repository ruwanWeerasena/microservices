import React from 'react'
import "./footer.css"
import { Favorite, Home } from '@mui/icons-material'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footercontainer'>
        <div className='footcols'>
          <span style={{textDecoration:'underline'}}><h3>About</h3></span>
          <span>eshop on containers</span>
        </div>
        <div className='footcols'>
          <span style={{textDecoration:'underline'}}><h3>Informations</h3></span>
          <span>Informations here</span>
          <span>click here for info</span>
        </div>
        <div className='footcols'>
          <span style={{textDecoration:'underline'}}><h3>Other links</h3></span>
          <span>Link 1</span>
          <span>Link 2</span>
          <span>Link 3</span>
          <span>Link 4</span>
        </div>
        <div className='footcols'>
          <span style={{textDecoration:'underline'}}><h3>Contact</h3></span>
          <span style={{display:'flex',alignItems:'center'}}><Home/><span>+94789233363</span></span>

        </div>
      </div>
      <div className='footerend'>
        <span>Back to Top</span>
        <span>eShop@2023</span>
        <span style={{display:'flex'}}>created with <Favorite/> React</span>
      </div>
    </div>
  )
}

export default Footer