import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import './styles.scss'
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import Item from "../CartDetail/Item";
import { useTranslation } from 'react-i18next';
const mapCartState = createStructuredSelector({
    cartItems: selectCartItems,
    subtotal: selectCartTotal
});

const CartDrawer = ({activeStatus, setActiveStatus, text, iconName}) => {
    const { t } = useTranslation(["cartDrawer"]);
    const { cartItems, subtotal } = useSelector(mapCartState);
    const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2)
    return(
        <div className={activeStatus ? "notification" + " active" : "notification"}>
            <div className="drawer-wrapper">
                <div className="drawer-header">
                    <div className="close-button"  onClick={() =>setActiveStatus(false)} >
                        <IoCloseOutline size={28}/>
                    </div>
                    <div className="drawer-title">
                        Shopping Cart
                    </div>
                </div>
                <div className="drawer-body">
                    {cartItems.map((item, pos) =>{
                        return (
                            <div key ={pos} className="drawer-body-wrapper">
                                <div className='product-image-container'>
                                    <img className ="productImage" src ={item.productThumbnail} />
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
            </div>
        </div>
    )
}

export default CartDrawer