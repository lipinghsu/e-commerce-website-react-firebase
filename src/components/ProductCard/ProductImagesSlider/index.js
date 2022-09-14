import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { useState, useEffect } from 'react'

import './styles.scss'

const ProductImageSlider = (props) => {
    const [activeThumb, setActiveThumb] = useState();
    // useEffect(() => {
    //     console.log("activeThumb", activeThumb);
    //     if(activeThumb && activeThumb.destroyed){

    //         setTimeout(() => {
    //             activeThumb.update();
    //         }, 500)
    //     }
        
    // }, []);

    if(props.images === null){
        return;
    }
    return (
        <>
        <div className="wrapper-main-image">
            <Swiper 
                observer= {true} observeParents= {true}
                loop={false} spaceBetween={10} navigation= {true} thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
                modules={[Navigation, Thumbs]} grabCursor={true} className="product-images-slider">
                {
                props.images.map((image, index) =>(
                    <SwiperSlide key={index}>
                        <img src={image} />
                    </SwiperSlide>
                ))
                }
            </Swiper>
        </div>
        <div className="wrapper-small-images">
            <Swiper 
                slidesPerView={'auto'}
                centerInsufficientSlides={true}
                observer= {true} observeParents= {true}
                loop={false} spaceBetween={10} onSwiper={setActiveThumb}
                modules={[Navigation, Thumbs]} className="product-images-slider-thumbs">
            {/* <div className="col-small-images"> */}
                {
                props.images.map((image, index) =>(
                    <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                            <img src={image} />
                        </div>
                    </SwiperSlide>
                ))
                }
            {/* </div> */}
            </Swiper>
        </div>
        </>
    )
}
ProductImageSlider.propTypes = {
    images: PropTypes.array.isRequired
}

export default ProductImageSlider;