import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, addProduct, reduceCartItem, updateCart } from "../../../redux/Cart/cart.actions";

import { GoTrashcan } from "react-icons/go";
import QuantityButton from "../../ProductCard/QuantityButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Item = ({setIsLoading, ...product}) => {
    
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
        console.log(product);
        console.log(quantityValue);
        dispatch(
            updateCart(product, quantityValue),
            setIsLoading(false)
        );
    }

    useEffect(() => {
        // to do:
        // disable check out button and formInput
        // show loading animation
        // if quantityValue > stockValue -> show error message
        let timerId = setTimeout(() => {
            handleUpdateCart(product, quantityValue)
        }, 380);
        return () => {
            clearTimeout(timerId)
        };
    }, [quantityValue]);

    return(
        <div className="cartItem">
            {/* <div className="not-buttons"> */}
                <div className="product-image-container">
                    <Link to={`/product/${documentID}`}>
                        <img src={productThumbnail} alt={productName} className="productImage"/>
                    </Link>
                </div>

                <div className="product-details">
                    <div className="name">{productName}</div>
                    <div className="price">
                        ${addZeroes(productPrice.toString())}
                    </div>
                    <div className="size">{t("Size")}: {size}</div>
                </div>
                <div className="total">
                    ${addZeroes(parseFloat((productPrice * quantity).toFixed(2)).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
            {/* </div> */}
            <div className="buttons">
                <QuantityButton setQuantityValue={setQuantityValue} quantityValue={quantityValue} setIsLoading={setIsLoading}/>
                {/* onclick -> show modal -> confirm delete? -> delete*/}
                <div className="container-remove-button"  onClick={() => handleRemoveCartItem(product)}>
                    <span className="remove-btn">
                        <GoTrashcan className="buttonImage" color="red"/>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Item;