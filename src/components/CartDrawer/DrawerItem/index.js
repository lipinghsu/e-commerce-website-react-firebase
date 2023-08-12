import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, addProduct, reduceCartItem, updateCart } from "../../../redux/Cart/cart.actions";

import { BsTrash } from "react-icons/bs";
import QuantityButton from "../../ProductCard/QuantityButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DrawerItem = ({setIsLoading, ...product}) => {
    const dispatch = useDispatch();
    const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2)
    const { t } = useTranslation(["common"]);
    const { productName, productThumbnail, productPrice, quantity, size, documentID } = product;
    const [quantityValue, setQuantityValue] = useState(quantity);
    
    const handleRemoveCartItem = (product) => {
        dispatch(
            removeCartItem(product)
        );
    }

    const handleUpdateCart = (product, quantityValue) =>{
        dispatch(
            updateCart(product, quantityValue),
            setIsLoading(false)
        );
    }

    const handleRedirect = () =>{
        setTimeout(() => {
            window.location.reload();
        }, 100);
        
    }
    
    useEffect(() => {
        // to do:
        // if quantityValue > stockValue -> show error message
        let timerId = setTimeout(() => {
            handleUpdateCart(product, quantityValue)
        }, 300);
        return () => {
            clearTimeout(timerId)
        };
    }, [quantityValue]);

    return(
        <div className="DrawerItem">
            <div className='product-image-container'>
                <Link to={`/product/${documentID}`} >
                    <img src={productThumbnail} alt={productName} className="productImage" onClick={() => handleRedirect()}/>
                </Link>
            </div>
            <div className='product-details'>
                <div className='first-row'>
                    <div className='product-name'>{productName}</div>
                    <div className="container-remove-button"  onClick={() => handleRemoveCartItem(product)}>
                        <span className="remove-btn">
                            <BsTrash className="buttonImage" color="red"/>
                        </span>
                    </div>
                </div>
                <div className='second-row'>
                    <div className='sizeDiv'>{t("Size")}: {size}</div>
                </div>
                <div className='third-row'>
                    <QuantityButton setQuantityValue={setQuantityValue} quantityValue={quantityValue} setIsLoading={setIsLoading}/>
                    <div className='product-price'>
                        ${addZeroes(parseFloat((productPrice * quantity).toFixed(2)).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DrawerItem;
