import React, { useState, useEffect } from 'react';

import Button from '../forms/Button'; 
import CheckoutFormInput from './CheckoutFormInput';

import logoImage from "../../../src/assets/meihua.png";
import navigatePrevImage from "../../../src/assets/navigate_before.png"

import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiInstance } from '../../Utils';
import { saveOrderHistory } from '../../redux/Orders/orders.actions'
import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CardElement, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';

import "./styles.scss"

const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
};

const mapState = createStructuredSelector({
    total: selectCartTotal,
    
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems,
});

const PaymentDetails = () => {

    const stripe = useStripe();
    const history = useHistory();
    const elements = useElements();
    const dispatch = useDispatch();
    const { total, itemCount, cartItems } = useSelector(mapState);
    
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [coupon_code, setCouponCode] = useState('');

    const [informationFinished, setInformationFinished] = useState(false);
    const [shippingFinished, setShippingFinished] = useState(false);
    const [shippingFee, setShippingFee] = useState(null);
    const [salesTax, setSalesTax] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { t } = useTranslation(["payment"]);

    const salesTaxRate  = 8.7/100;
    const freeShippingThreshold = 420.69;
    const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2)
    
    

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    // prevent user from accessing the payment page if there is no item in the cart
    useEffect(() => {
        if (itemCount < 1) {
            history.push('/');
        }

    }, [itemCount]);

    const handleShippingAddress = event => {
        const {name, value} = event.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        })
    }
    const checkCouponCode = () =>{
        console.log("checkCouponCode");
        // if couponCode == database.couponCode.code
            // apply database.couponCode.discount to total
        // else
            // show eror message
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        const cardElement = elements.getElement('card');
        // input validation
        if(!shippingAddress.line1 || !shippingAddress.city || 
            !shippingAddress.state || !shippingAddress.postal_code || !shippingAddress.country ||
            !firstName || !lastName){
                setIsLoading(false);
                console.log("handleFormSubmit - if")
            return;
        }

        apiInstance.post("/payments/create", {
            amount: total * 100,
            shipping: {
                name: (firstName + " " + lastName),
                phone: phoneNumber,
                address: {
                    ...shippingAddress
                }
            }
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
        })
        
        .then(({ data: clientSecret}) =>{
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: (firstName + " " + lastName),
                    address: {
                        ...shippingAddress
                    }
                }

            }).then(({ paymentMethod }) =>{        
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                })
                
                .then(({ paymentIntent }) => {
                    const configOrder = {
                        orderTotal: parseFloat((total + shippingFee).toFixed(2)),
                        orderItems: cartItems.map(item =>{
                            const {documentID, productThumbnail, productName, productPrice, quantity, size} = item; 
                            return {
                                documentID, productThumbnail, productName, productPrice, quantity, size
                            }
                        })
                    }
                    dispatch(
                        saveOrderHistory(configOrder)
                    );
                    setIsLoading(false);

                });
            }).catch(error => {
                // paymentMethod is undefined (invalid card?)
                setIsLoading(false);
                console.log(error);
                
            })
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
        });
        
    };

    // stripe card element
    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base:{
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    };
    

    // monitor country change to set default shipping method
    useEffect(() =>{
        if(shippingAddress.country === "US" && document.getElementById("standard")){
            document.getElementById("standard").checked = true;
            setShippingFee(8.99);
        }
        else if (shippingAddress.country !== "US" && document.getElementById("international")){
            document.getElementById("international").checked = true;
            setShippingFee(69.420);
        }
    }, [shippingAddress.country])

    return(
        <div className="paymentDetails">
            {/* logo when screen < 1000% */}
            <div className='image-container'>
                <Link to="/" >
                    <img src={logoImage}/>
                </Link>
            </div>
            <div className='box-left'>
                <div className='inner-image-container'>
                    <Link to="/" >
                        <img src={logoImage}/>
                    </Link>
                </div>
                {/* <div className='checkout-process-container'>
                    <span>{t("Cart")}</span>
                    <img src={navigateNextImage}/>
                    <span className='current-page'>{t("Information")}</span>
                    <img src={navigateNextImage}/>
                    <span>{t("Shipping")}</span>
                    <img src={navigateNextImage}/>
                    <span>{t("Payment")}</span>
                </div> */}
                <form onSubmit={handleFormSubmit}>
                    {/* information */}
                    <div className={!informationFinished ? "inner-box" : "inner-box"}>
                        <h4>{t("Contact Information")}</h4>
                        <div className='flex-container'>
                            <CheckoutFormInput 
                                label = {t("First Name")}
                                type="text"
                                value= {firstName}
                                name="firstName"
                                handleChange={e => setFirstName(e.target.value)}
                                required
                            />
                            <CheckoutFormInput 
                                label={t("Last Name")}
                                type="text"
                                value= {lastName}
                                name="lastName"
                                handleChange={e => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <CheckoutFormInput 
                            label={t("Phone")}
                            type="text"
                            value= {phoneNumber}
                            name="phoneNumber"
                            handleChange={e => setPhoneNumber(e.target.value)}
                            required
                        />
                        <CheckoutFormInput 
                            label = {t("Email")}
                            type="email"
                            value= {email}
                            name="email"
                            handleChange={e => setEmail(e.target.value)}
                            required
                        />
                        <div className='checkbox-wrapper'>
                            <input type="checkbox" class="checkbox"/>
                            <span>{t("Email me with news and offers")}</span>
                        </div>
                    </div>
                    <div className={!informationFinished ? "inner-box" : "inner-box"}>
                        <h4>{t("Shipping Address")}</h4>
                        <div className="formRow checkoutInput">
                            <div className="country-label">{t("Country/Region")}</div>
                            <CountryDropdown 
                                valueType="short"
                                value= {shippingAddress.country}
                                name="country"
                                whitelist={["US", "TW"]}
                                onChange={val => handleShippingAddress({
                                    target:{
                                        name: 'country',
                                        value: val
                                    }
                                })}
                                required
                            />
                        </div>
                        <CheckoutFormInput 
                            label={t("Address")}
                            type="text"
                            value= {shippingAddress.line1}
                            name="line1"
                            handleChange={e => handleShippingAddress(e)}
                            required
                        />
                        <CheckoutFormInput 
                            label={t("Apartment, suite, etc. (optional)")}
                            type="text"
                            value= {shippingAddress.line2}
                            name="line2"
                            handleChange={e => handleShippingAddress(e)}
                        />
                        <div className='flex-container'>
                            { !shippingAddress.country || shippingAddress.country == "US" ? <>
                            <CheckoutFormInput 
                                label={t("City")}
                                type="text"
                                value= {shippingAddress.city}
                                name="city"
                                handleChange={e => handleShippingAddress(e)}
                                required
                            />
                            {/* <CheckoutFormInput 
                                label={t("State")}
                                type="text"
                                value= {shippingAddress.state}
                                name="state"
                                handleChange={e => handleShippingAddress(e)}
                                required
                            /> */}
                            <div className="formRow checkoutInput">
                                <div className="country-label">
                                    {t(!shippingAddress.country || shippingAddress.country == "US" ? "State": "City")}
                                </div>
                                <RegionDropdown 
                                    country={shippingAddress.country}
                                    value= {shippingAddress.state}
                                    name="state"
                                    onChange = {val => handleShippingAddress({
                                        target:{
                                            name: 'state',
                                            value: val
                                        }
                                    })}
                                    countryValueType="short"
                                    required
                                />
                            </div>
                            </>
                            :  <div className="formRow checkoutInput">
                                <div className="country-label">
                                    {t(!shippingAddress.country || shippingAddress.country == "US" ? "State": "City")}
                                </div>
                                <RegionDropdown 
                                    country={shippingAddress.country}
                                    value= {shippingAddress.city}
                                    name="city"
                                    onChange = {val => handleShippingAddress({
                                        target:{
                                            name: 'city',
                                            value: val
                                        }
                                    })}
                                    countryValueType="short"
                                    required
                                />
                            </div>
                            }
                            <CheckoutFormInput 
                            
                                label={t("ZIP code")}
                                type="text"
                                value= {shippingAddress.postal_code}
                                name="postal_code"
                                handleChange={e => handleShippingAddress(e)}
                                required
                            />
                        </div>
                    </div>
                
                    {/* shipping */}
                    <div className={informationFinished && !shippingFinished ? "inner-box" : "inner-box"}>
                        {/* <h4>{t("Customer Information")}</h4>
                        <div className='container-customer-info'>
                            <div className='row-contact'>
                                <div className='label'>Contact</div>
                                <div className='value'>{email}</div>
                                <div className='edit-button'>Edit</div>
                            </div>
                            <div className='row-address'>
                                <div className='label'>Ship to</div>
                                <div className='value'>{shippingAddress.line1}, {shippingAddress.line2 ? shippingAddress.line2 +", " : ""}{shippingAddress.city}, {shippingAddress.postal_code}, {shippingAddress.country}</div>
                                <div className='edit-button'>Edit</div>
                            </div>
                        
                        </div> */}
                        <h4 className='shipping-h4'>{t("Shipping Method")}</h4>
                        <div className='container-shipping-method'>
                            {shippingAddress.country && shippingAddress.country !== "US" ? 
                            
                            <div className='row-shipping'>
                                <div className='radio-button'>
                                    <input type="radio" value="international" id="international" name="shipping" onChange={(e) => setShippingFee(69.420)} required></input>
                                </div>
                                <div className='label'>{t("International")}</div>
                                <div className='value'>$69.420</div>
                            </div>
                            : 
                            <>
                                {total > freeShippingThreshold ? 
                                <div className='row-shipping'>
                                    <div className='radio-button'>
                                        <input type="radio" value="free" name="shipping" onChange={(e) => setShippingFee(0)}></input>
                                    </div>
                                    <div className='label'>{t("FREE SHIPPING")}</div>
                                    <div className='value'>{t("Free")}</div>
                                </div> : null}
                                <div className='row-shipping'>
                                    <div className='radio-button'>
                                        <input type="radio" value="standard" id="standard" name="shipping" onChange={(e) => setShippingFee(8.99)} required></input>
                                    </div>
                                    <div className='label'>{t("Standard")}</div>
                                    <div className='value'>$8.99</div>
                                </div>
                                <div className='row-shipping'>
                                    <div className='radio-button'>
                                        <input type="radio" value="express" name="shipping" onChange={(e) => setShippingFee(16.99)}></input>
                                    </div>
                                    <div className='label'>{t("Express")}</div>
                                    <div className='value'>$16.99</div>
                                </div>
                            </>}                            
                        </div>
                    </div>

                    {/* payment */}
                    <div className={informationFinished && shippingFinished ? "inner-box payment" : "inner-box payment"}>
                        <h4>{t("Payment")}</h4>
                        <div className='group-card'>
                            <CardElement 
                                options={configCardElement}
                            />
                        </div>
                        <div className='pay-button flex-container'>
                            <div className='return-wrap' >
                                {/* <Link onClick={() =>{setShippingFinished(false)}} > */}
                                <Link to="/cart" >
                                    <img src={navigatePrevImage}/>
                                    <span>{t("Return to cart")}</span>
                                </Link>
                            </div>
                            
                            <Button className={isLoading ? "btn btn-submit isLoading" : "btn btn-submit"} 
                            disabled={isLoading} isLoading={isLoading} onClick={() => {setShippingFinished(true)}}>
                                {t("Confirm Payment")}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='box-right'>
                <div className="inner-box group-order-summary">
                    <h4>
                        {t("Order Summary")} ({itemCount} {t(itemCount > 1 ? "items" : "item")})
                    </h4>
                    <div className='content-wrap'>
                        <div className='item-table' >
                                {cartItems.map((item, pos) =>{
                                    return (
                                        <div key ={pos} className="item-row-container">
                                            <div className='product-image'>
                                                <img src ={item.productThumbnail} />
                                            </div>
                                            <div className='product-details'>
                                                <div className='product-name'>{item.productName}</div>
                                                <div className='sizeDiv'>{t("Quantity")}: {item.quantity}</div>
                                                <div className='sizeDiv'>{t("Size")}: {item.size}</div>
                                            </div>
                                            <div className='product-price'>
                                                ${addZeroes(parseFloat((item.productPrice * item.quantity).toFixed(2)).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className='coupon-table' >
                            <CheckoutFormInput 
                                label={t("Coupon code")}
                                type="text"
                                value= {coupon_code}
                                name="coupon_code"
                                handleChange={e => setCouponCode(e.target.value)}
                                required
                            />
                            <Button className="btn btn-submit" onClick={() => checkCouponCode()}>
                                {t("Apply")}
                            </Button>
                        </div>
                        <div className="price-table">
                            <div className='price-row-container'>
                                <div className='data-row'>
                                    <div className='td-name'>
                                        {t("Subtotal")}
                                    </div>
                                    <div className='td-price'>
                                        ${addZeroes(total.toString())}
                                    </div>
                                </div>
                                <div className='data-row'>
                                    <div className='td-name'>
                                        {t("Shipping fee")}
                                    </div>
                                    <div className='td-price shipping'>
                                        {(shippingFee ? ("$" + shippingFee) : shippingFee === 0 ? "Free" : t("Select a shipping method"))}
                                    </div>
                                </div>
                                <div className='data-row'>
                                    <div className='td-name'>
                                        {t("Taxes (estimated)")}
                                    </div>
                                    <div className='td-price'>
                                    {(shippingAddress.postal_code ? "$"+(addZeroes((total * salesTaxRate).toFixed(2))) : t("Calculated at next step"))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='price-row-container total'>
                                <div className='data-row'>
                                    <div className='td-name'>
                                        {t("Total")}
                                    </div>
                                    <div className='td-price'>
                                        USD <span>${addZeroes((total + (shippingFee? shippingFee : 0) + (shippingAddress.postal_code ? total * salesTaxRate : 0)).toFixed(2))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentDetails;