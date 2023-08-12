import React, { useState, useRef, useEffect} from "react";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import { Link } from "react-router-dom";
import Button from "../forms/Button";
import Item from "./Item";

import { useTranslation } from "react-i18next";
import './styles.scss';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    subtotal: selectCartTotal
});

const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2);

const CartDetail = ({}) =>{
    const { t } = useTranslation(["cart"]);
    const { cartItems, subtotal } = useSelector(mapState);
    const history = useHistory();
    const EmptyCartMessage = t("Your cart is currently empty.");
    const boxRightRef = useRef();
    const movingDivRef = useRef();
    const [isLoading, setIsLoading] = useState(false);


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [stop, setStop] = useState(false);
    const controlMovingDiv = () => {
        const boxRightBottomY = (boxRightRef.current?.offsetHeight + boxRightRef.current?.offsetTop);
        if (typeof window !== 'undefined') { 
            setStop((window.scrollY + 87 > (boxRightBottomY - movingDivRef.current?.offsetHeight)));
        }
    }

    // detect scroll
    useEffect(() => {
        window.scrollTo(0, 0);
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", controlMovingDiv);
        // cleanup function
            return () => {
                window.removeEventListener('scroll', controlMovingDiv);
            };
        }
    }, []);
     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    return (
        <div className="checkout">
            <div className="wrap">
                
                {cartItems.length > 0 ? (
                    <div className="cart">
                        <div className="row-main-container">
                            <div className="box-left">
                                <h1>{t("Shopping Cart")}</h1>
                                {cartItems.map((item, pos) =>{
                                    return (
                                        <div className="wwww" key ={pos}>
                                            <Item {...item } setIsLoading={setIsLoading}  />
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="box-right" ref={boxRightRef}>
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
                                    <div className="subtotal">
                                        <h3>{t("Subtotal")}:<span>${addZeroes(subtotal.toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} USD</span></h3>
                                        <h5>{t("Shipping & taxes are calculated at checkout.")}</h5>
                                    </div>

                                    <div className="bottom-btn">
                                        <div className="checkout-button">
                                            <Button onClick={() => history.push('/payment')} 
                                            className={isLoading ? "btn btn-submit isLoading" : "btn btn-submit"} disabled={isLoading} isLoading={isLoading}>
                                                {t("Check Out")}
                                            </Button>
                                        </div>
                                        <div className="continue-shopping">
                                            <Link onClick={() => history.goBack()}>
                                                {t("Continue Shopping")}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="cart empty">
                            <div className="empty-cart">
                                <div className="empty-message">
                                    {EmptyCartMessage}
                                </div>
                                <div className="continue-shopping">
                                    <Button onClick={() => history.goBack()} className="btn btn-submit">
                                        {t("Continue Shopping")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                
            </div>
        </div>
    );
};
export default CartDetail