import React, {useEffect, useState} from 'react'
import { useDispatch } from "react-redux";
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
import DrawerItem from "./DrawerItem";
import QuantityButton from "../ProductCard/QuantityButton";
import { removeCartItem, addProduct, reduceCartItem, updateCart } from "../../redux/Cart/cart.actions";

const mapCartState = createStructuredSelector({
    cartItems: selectCartItems,
    subtotal: selectCartTotal
});

const mapState = state => ({
    product: state.productsData.product,
    productLoaded: state.productsData.product.productLoaded
});

// to do:
// add quantity and delete buttons
// color variations



const CartDrawer = ({activeStatus, setActiveStatus, product}) => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation(["cartDrawer"]);
    const { cartItems, subtotal } = useSelector(mapCartState);
    
    const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2);

    const [progress, setProgress] = useState(0);
    const [remainder, setRemainder] = useState(0);
    const [quantityValue, setQuantityValue] = useState(product.quantity);

    const handleRemoveCartItem = (product) => {
        dispatch(
            removeCartItem(product)
        );
    }

    useEffect(() => {
        // Calculate progress based on subtotal
        const calculatedProgress = subtotal / 200;
        const calculatedRemainder = 200 - subtotal;
        setProgress(calculatedProgress);
        setRemainder(calculatedRemainder);
    }, [subtotal]);


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
                                <DrawerItem {...item } setIsLoading={setIsLoading}/>
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