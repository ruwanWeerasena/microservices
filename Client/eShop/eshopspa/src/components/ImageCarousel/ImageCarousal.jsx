import React, { useEffect, useState } from 'react'
import './imageCarousal.css'

import slides from './data.json'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const ImageCarousal = () => {
    const[slide,setSlide]= useState(0);

    const incrementIdx = ()=>{
        console.log('inside increment');
        if(slide==slides.slides.length-1){
            setSlide(0);
        }else{

            setSlide(c=>++c)
        }
    }
    const decrementIdx = ()=>{
        if(slide==0){
            setSlide(slides.slides.length-1);
        }else{

            setSlide(c=>--c)
        }
    }

    useEffect(()=>{
        setInterval(()=>{
            setSlide(prev=>{
                if(prev==slides.slides.length-1) return 0
                return ++prev
            })
        },5000);
    },[])



  return (
    <div className='imgcarousal'>
        <ArrowBackIos className='arrowbackcarousal'  onClick={()=>{decrementIdx()}}/>
        {slides.slides.map((itm,idx)=>{
            return <img className={slide!==idx?'imgslide-hidden':'imgslide'} key={idx} src={itm.src} alt={itm.alt}/>
        })}
        <ArrowForwardIos  className='arrowforwardcarousal' onClick={()=>{incrementIdx()}}/>
        <span className='carousalindicators'>
            {slides.slides.map((_,idx)=>{
                return <button onClick={()=>setSlide(idx)} className={slide!==idx?'carousalindicator':'carousalindicator-selected'} key={idx} ></button>
            })}
        </span>
    </div>
  )
}

export default ImageCarousal