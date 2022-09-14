import React, {useState, useEffect} from 'react';
import FormInput from  './../forms/FormInput';
import { Link } from 'react-router-dom';
import ArrowForward from '../../assets/arrowForward.png'

import './styles.scss';

import i18next from "i18next";
import { useTranslation } from "react-i18next";

import Button from '../forms/Button';
import { newsLetterSignUpStart } from '../../redux/User/user.actions';
import { useDispatch } from "react-redux";
const Footer = props => {
    const [email, setEmail] = useState('');
    const [signedUpNewsletter, setSignedUpNewsletter] = useState(false);
    const { i18n, t } = useTranslation(["footer", "common"]);
    const languageChange = (event) =>{
        i18n.changeLanguage(event.target.value);
        i18next.changeLanguage(event.target.value);
    }

    useEffect(() =>{
        if(localStorage.getItem("i18nextLng")?.length > 2){
            i18next.changeLanguage("en");
        }
    },[])

    const dispatch = useDispatch();
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        // return true;
    };
    const handleNewsletterSignUp = (e) =>{
        e.preventDefault();

        if(validateEmail(email)){
            dispatch(
                newsLetterSignUpStart({email: email}),
                setEmail(''),
                setSignedUpNewsletter(true)
            )
        }
        else{
            console.log("Please enter a valid email address.")
        }


    }
    
    return (
        <footer className='footer' id="footer" class="dark">
            <div>
                <div className="box-container">
                    {/* <div className="box box-address"> */}
                        {/* <h3>{t("LOCATION")}</h3>
                        <div className='address'>
                            <a className='notLink'>{t("123 Temp St.")}</a>
                            <a className='notLink'>{t("Xx-xx District,")}</a>
                            <a className='notLink'>{t("Taipei City, Taiwan (R.O.C)")}</a>
                        </div> */}
                    {/* </div> */}
                    <div className="box">
                        <h3>{t("SOCIAL")}</h3>
                        <ul class="footer__quicklinks unstyled">
                            <li><a href="https://www.instagram.com/bushkatpc">{t("Instagram")}</a></li>
                        </ul>
                    </div>

                    <div className="box">
                        <h3>{t("INFORMATION")}</h3>
                        <ul class="footer__quicklinks unstyled">
                            
                            <li>
                                <Link to="/about">{t("About")}</Link>
                            </li>
                            {/* <li><a href="https://www.instagram.com/bushkatpc">{t("Instagram")}</a></li> */}
                        </ul>
                    </div>

                    <div className="box">
                        <h3>{t("JOIN OUR NEWSLETTER")}</h3>
                        <div className="box-email">
                            {!signedUpNewsletter ?                             
                            <form onSubmit={handleNewsletterSignUp}>
                                <FormInput 
                                type = "email"
                                name = "email"
                                value = {email}
                                onChange = { e => setEmail(e.target.value)}
                                label = {t("common:Email")}
                                />

                                <Button type="submit" className="btn btn-submit">
                                    <img src={ArrowForward} className="arrow"/>
                                </Button>
                                {/* <img src={ArrowForward} className="arrow" type="submit" /> */}
                            </form>
                            : <div className='sign-up-message'>
                                {t("Thanks for subscribing!")}
                            </div>}

                        </div>
                    </div>

                </div>

                <div className="box-container">
                    <div className="box-bottom">
                        <div className="content-wrapper">
                            <h>© Büshka 2022</h> 
                            <Link to= "terms">
                                {t("Terms & Privacy")}
                            </Link>
                            {/* <a name ="language" onClick={languageChange} value={"en"}>
                                English
                            </a> 
                            <a name ="language" onClick={languageChange} value={"tw"}>
                                繁體中文
                            </a>  */}
                            <select 
                                name ="language" 
                                onChange={languageChange}
                                value={localStorage.getItem("i18nextLng")}
                            >
                                <option value= "en">English</option>
                                <option value= "tw">繁體中文</option>
                            </select>
                        </div>
                        {/* <div className='lauguage-options'> */}
                            
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './styles.scss';

// const Footer = props => {
//     return (
//         <footer className='footer'>

//             <div className='wrap'>
//                 <div className='wrap-copyrights'>
//                     © Konsol 2022
//                 </div>
//             </div>

//             <div className='wrap'>
//                 <div className='wrap-links'>
//                     <Link to= "terms">
//                         Terms &amp; Privacy
//                     </Link>
//                 </div>
//             </div>

//             <div className='wrap'>
//                 <div className='wrap-social'>
//                     <a href="https://www.instagram.com/konsoltpc">Instagram</a>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer; 