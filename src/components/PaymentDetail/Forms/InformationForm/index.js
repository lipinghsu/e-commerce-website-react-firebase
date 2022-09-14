import CheckoutFormInput from "../../CheckoutFormInput"
import { CountryDropdown } from "react-country-region-selector"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../forms/Button";
import navigatePrevImage from "../../../../../src/assets/navigate_before.png"

// shippingAddress becomes undefined
// first inputform value becomes an object
// value.filled effect not presenting
// (problems with handling event when calling)
// 
    // <InformationForm firstName={firstName} setFirstName={setFirstName} 
    //     lastName={lastName} setLastName={setLastName}
    //     phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
    //     email={email} setEmail={setEmail}
    //     shippingAddress={shippingAddress} handleShippingAddress={handleShippingAddress}
    // />
//
// from PaymentDetail

const InformationForm = (firstName, setFirstName, 
        lastName, setLastName,
        phoneNumber, setPhoneNumber,
        email, setEmail,
        shippingAddress, handleShippingAddress
        ) => {
    const { t } = useTranslation(["payment"]);

    const handleFormSubmit = async event =>{

    }
    if(shippingAddress){
        return(
            <form onSubmit={handleFormSubmit}>
                <div className="inner-box">
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
                    <h4>{t("Shipping Address")}</h4>
                    {/* <CheckoutFormInput 
                        label={t("Address")}
                        type="text"
                        value= {shippingAddress.line1}
                        name="line1"
                        // handleChange={e => handleShippingAddress(e)}
                        required
                    /> */}
                    {/* <CheckoutFormInput 
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
                        <CheckoutFormInput 
                            label={t("City")}
                            type="text"
                            value= {shippingAddress.city}
                            name="city"
                            handleChange={e => handleShippingAddress(e)}
                            required
                        />
                        <CheckoutFormInput 
                            label={t("State")}
                            type="text"
                            value= {shippingAddress.state}
                            name="state"
                            handleChange={e => handleShippingAddress(e)}
                            required
                        />
                        <CheckoutFormInput 
                            label={t("ZIP code")}
                            type="text"
                            value= {shippingAddress.postal_code}
                            name="postal_code"
                            handleChange={e => handleShippingAddress(e)}
                            required
                        />
                    </div>
                    
                    <div className="formRow checkoutInput">
                        <div className="country-label">{t("Country/Region")}</div>
                        <CountryDropdown 
                            valueType="short"
                            value= {shippingAddress.country}
                            name="country"
                            
                            onChange={val => handleShippingAddress({
                                target:{
                                    name: 'country',
                                    value: val
                                }
                            })}
                            required
                        /> */}
                    {/* </div> */}
                    <div className='pay-button flex-container'>
                        <div className='return-wrap' >
                            <Link to="/cart" >
                                <img src={navigatePrevImage}/>
                                <span>{t("Return to cart")}</span>
                            </Link>
                        </div>
                        
                        <Button className="btn btn-submit">
                            {t("Next")}
                        </Button>
                    </div>
                </div>
    
                {/* <div className="inner-box">
                    <div className='group-card'>
                        <h2>
                            Payment
                        </h2>
                        <CardElement 
                            options={configCardElement}
                        />
                    </div>
                </div> */}
                <div className='pay-button flex-wrap'>
                    {/* <Button type="submit" className="btn btn-submit"> */}
                        {/* Continue to shipping */}
                    {/* </Button> */}
                </div>
                {/* <div className='pay-button'>
                    <Button type="submit" className="btn btn-submit">
                        Pay Now
                    </Button>
                </div> */}
            </form>
        )
    }
    
}

export default InformationForm;