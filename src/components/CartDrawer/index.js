import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import './styles.scss'
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import Item from "../CartDetail/Item";

const mapCartState = createStructuredSelector({
    cartItems: selectCartItems,
    subtotal: selectCartTotal
});

const CartDrawer = ({activeStatus, setActiveStatus, text, iconName}) => {
    const { cartItems, subtotal } = useSelector(mapCartState);
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
                    
                <div className="drawer-body">
                    {cartItems.map((item, pos) =>{
                        return (
                            <div className="drawer-item" key ={pos}>
                                <Item {...item }  />
                            </div>
                        )
                    })}
                </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CartDrawer