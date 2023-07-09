import React from 'react'
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
const mapCartState = createStructuredSelector({
    cartItems: selectCartItems,
    subtotal: selectCartTotal
});

// to do:
// add quantity and delete buttons
// make draer-body scrollable when height exceed it's limit

const CartDrawer = ({activeStatus, setActiveStatus, text, iconName}) => {
    const history = useHistory();
    const { t } = useTranslation(["cartDrawer"]);
    const { cartItems, subtotal } = useSelector(mapCartState);
    const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2);

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
                        Shopping Cart
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