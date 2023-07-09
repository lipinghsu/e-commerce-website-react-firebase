import React, {useEffect, useState} from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './styles.scss'
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import Item from "../CartDetail/Item";
import Button from "../forms/Button";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import {MdOutlineLocalShipping} from "react-icons/md";
import {AiFillCheckCircle} from "react-icons/ai";

const mapCartState = createStructuredSelector({
    cartItems: selectCartItems,
    subtotal: selectCartTotal
});

// to do:
// add quantity and delete buttons

const CartDrawer = ({activeStatus, setActiveStatus, text, iconName}) => {
    const history = useHistory();
    const { t } = useTranslation(["cartDrawer"]);
    const { cartItems, subtotal } = useSelector(mapCartState);
    const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2);

    const [progress, setProgress] = useState(0);
    const [remainder, setRemainder] = useState(0);

    useEffect(() => {
        // Calculate progress based on subtotal
        const calculatedProgress = subtotal / 200;
        const calculatedRemainder = 200 - subtotal;
        setProgress(calculatedProgress);
        setRemainder(calculatedRemainder);
    }, [subtotal]);

    const handleRedirect = () =>{
        setTimeout(() => {
            window.location.reload();
        }, 100);
        
    }
    
    return(
        <div className={activeStatus ? "notification" + " active" : "notification"}>
            <div className="drawer-wrapper">
                <div className="drawer-header">
                    <div className="close-button"  onClick={() =>setActiveStatus(false)} >
                        <IoCloseOutline size={28}/>
                    </div>
                    <div className="drawer-title">
                        SHOPPING CART
                    </div>
                </div>

                <div className="drawer-progress">
                    <div className='progress-title-image'>
                        <div className='icon'>
                            {remainder > 0  ?
                            <MdOutlineLocalShipping size={16}/>
                            : <AiFillCheckCircle size={26}/>
                            }
                        </div>
                        <div className='text'>
                            Free Shipping
                        </div>
                    </div>
                    <div className='progress-bar'>
                        <div className="progress" style={{ width: `${progress * 100}%` }}></div>
                    </div>
                    <div className='progress-description'>
                        {remainder > 0 ? 
                        "You are $" + addZeroes(remainder.toString()) + " away from FREE SHIPPING"
                        : "You've unlocked free shipping!"}
                        
                    </div>
                </div>
                <div className="drawer-body">
                    {cartItems.map((item, pos) =>{
                        return (
                            <div key ={pos} className="drawer-body-wrapper">
                                <div className='product-image-container'>
                                    {/* <img className ="productImage" src ={item.productThumbnail} /> */}
                                    <Link to={`/product/${item.documentID}`} >
                                        <img src={item.productThumbnail} alt={item.productName} className="productImage" onClick={() => handleRedirect()}/>
                                    </Link>
                                </div>
                                <div className='product-details'>
                                    <div className='product-name'>{item.productName}</div>
                                    <div className='product-price'>
                                        ${addZeroes(parseFloat((item.productPrice * item.quantity).toFixed(2)).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>
                                    <div className='sizeDiv'>{t("Size")}: {item.size}</div>
                                    <div className='sizeDiv'>{t("Quantity")}: {item.quantity}</div>
                                </div>
                            </div>
                        )
                    })}
                
                    
                </div>
                <div className="drawer-tail">
                    <div className='subtotal'>
                        {/* right aline this span */}
                            {t("Subtotal")}: 
                            <span className='price'> ${addZeroes(subtotal.toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} USD</span>
                    </div>

                    <div className="check-out-button">
                        <Button onClick={() => history.push('/payment')} className="btn btn-submit">
                            {t("Check Out")}
                        </Button>
                    </div>

                    <div className="view-cart-button">
                        <Button onClick={() => history.push('/cart')} className="btn">
                            {t("View Cart")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDrawer