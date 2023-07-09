import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductStart, setProduct } from "../../redux/Products/products.actions";
import { addProduct } from "../../redux/Cart/cart.actions";
import { useTranslation } from "react-i18next";

import Accordion from "./Accordion";
import Button from "../forms/Button";
import SizeButton from "./SizeButton";
import CartDrawer from "../CartDrawer";
import QuantityButton from "./QuantityButton";
import ProductImageSlider from "./ProductImagesSlider";

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.scss';

const mapState = state => ({
    product: state.productsData.product,
    productLoaded: state.productsData.product.productLoaded
});


const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2)

const ProductCard = ({}) => {
    const { t } = useTranslation(["productCard"]);
    const boxRightRef = useRef();
    const movingDivRef = useRef();
    const descriptionTextRef = useRef();
    
    const dispatch = useDispatch();
    const { productID } = useParams();
    const { product } = useSelector(mapState);
    const { productLoaded } = useSelector(mapState);
    const { productThumbnail, productName, productPrice, productDescription, downloadUrls} = product;

    const [showDescription, setShowDescription] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null);
    const [quantityValue, setQuantityValue] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    const configAddToCartButton = {
        type: 'button'
    }
    
    const handleAddToCart = (product) => {
        if(!product){
            return;
        }
        setIsLoading(true);
        dispatch(
            addProduct(product, quantityValue),
            setAddToCartNotification(true),
            // window.scrollTo({top: 0, left: 0, behavior: 'smooth'}),
            setIsLoading(false)
        );
        // history.push('/cart')
    }


    // should be disabled once screen size < 840px
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [stop, setStop] = useState(false);
    const controlMovingDiv = () => {
        const boxRightBottomY = (boxRightRef.current?.offsetHeight + boxRightRef.current?.offsetTop);
        if (typeof window !== 'undefined') { 
            setStop((window.scrollY + 87 > (boxRightBottomY - movingDivRef.current?.offsetHeight)));
        }
    }

    // detect scroll
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", controlMovingDiv);
          // cleanup function
            return () => {
                window.removeEventListener('scroll', controlMovingDiv);
            };
        }
    }, []);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // entering the page
    useEffect(() =>{
        window.scrollTo(0, 0);
        dispatch(
            fetchProductStart(productID),
            setAddToCartNotification(false)
        )
        return () =>{
            dispatch(
                setProduct({})    // reset product to an empty object to avoid glitch
            )
        }
    }, []);
    
    // aftering loading the product
    useEffect(() =>{
        if(productLoaded){
            setSelectedImg(downloadUrls ? downloadUrls[0] : productThumbnail)
            handleSizeButtonChange({id: 1, value:'XS'})
        }
    }, [productLoaded]);

    function handleSizeButtonChange(options){
        product.size = options.value;
    }

    const [addToCartNotification, setAddToCartNotification] = useState(false);
    const [className, setClassName] = useState('productCard');
    useEffect(() => {
        if (addToCartNotification) {
            setClassName('productCard Dim');
        } else {
            setClassName('productCard');
        }
    }, [addToCartNotification]);


    // mobile scroll enable/disable functions
    const handleScroll = (event) => {
        event.preventDefault();
    };
    
    const disableMobileScroll = () => {
        document.addEventListener('touchmove', handleScroll, { passive: false });
    };
    
    const enableMobileScroll = () => {
        document.removeEventListener('touchmove', handleScroll);
    };


    useEffect(() => {
        const handleClickOutsideDiv = (e) =>{
            if (!e.target.closest('.notification')) { // check if element or parents has class
                setClassName('productCard');
                setAddToCartNotification(false);
            }
        }
        if(addToCartNotification){
            document.addEventListener("click", handleClickOutsideDiv, true);
            document.body.style.overflowY = 'hidden';
            disableMobileScroll();
        }
        return () => {
            document.removeEventListener('click', handleClickOutsideDiv);
            document.body.style.overflowY = 'visible';
            enableMobileScroll();
        };
    }, [addToCartNotification])
    
    if(!productThumbnail || !productName || typeof productPrice === 'undefined'){
        return null;
    }

    return(
        <div className={className}>
            <CartDrawer 
                activeStatus= {addToCartNotification}
                setActiveStatus= {setAddToCartNotification}
            />

            <div className="row-main-cotainer">
                <div className="col box-left">
                    <ProductImageSlider images={downloadUrls}/>
                </div>

                <div className="col box-right" ref={boxRightRef}> 
                    <div className="wrapper-content" ref={movingDivRef} 
                        style={ 
                            stop ? {
                                position: 'sticky',
                                top: (boxRightRef.current?.offsetHeight + boxRightRef.current?.offsetTop - movingDivRef.current?.offsetHeight)
                            } :{
                                position: 'sticky',
                                top: 87  //x
                            }
                        }
                    >
                        <div className="title">{productName}</div>
                        <div className="price">${ addZeroes(productPrice.toString()) } USD</div>
                        {/* <div className="wrapper-color-variation">
                            <div className="col-color-variation">            
                                <div className="card">
                                    <img src={productThumbnail} />
                                </div>
                            </div>
                        </div> */}
                        <div className="size-selector">
                            <SizeButton onChange ={handleSizeButtonChange}/>
                        </div>
                        <QuantityButton quantityValue={quantityValue} setQuantityValue={setQuantityValue} />
                        <div className="col-quantity-add-button">
                            <div class="add-to-cart">
                                <Button {...configAddToCartButton} onClick={() => handleAddToCart(product)} 
                                className={isLoading ? "btn btn-submit isLoading" : "btn btn-submit"} disabled={isLoading} isLoading={isLoading}>
                                    {t("Add to Cart")}
                                </Button>
                            </div>
                        </div>
                        <div className="product-description">
                            <Accordion title={t("Description")} showContent={showDescription} 
                                setShowContent={setShowDescription} detailText={productDescription} cellRef={descriptionTextRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;