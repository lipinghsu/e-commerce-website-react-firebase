import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';

import DropdownMenu from './DropdownMenu';
import NavItem from './NavItem';

import { MdOutlineShoppingBag } from "react-icons/md";
import { TbMenu2 } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import Logo from '../../assets/meihua.png';
import DefaultUserImage from '../../assets/user2-w.png';
import SideMenuDefaultUserImage from '../../assets/account_circle.png';

import './styles.scss';

import i18next from "i18next";
import { useTranslation } from "react-i18next";

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state),
});

const Header = props =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const profileImageUrl = currentUser ? currentUser.userProfileImage : null;
    const profileImageClass = "icon-button" + " " + (profileImageUrl ? "with-profile-picture": "");
    const myAccountLink = (currentUser && currentUser.userRoles && currentUser.userRoles[0]) === "admin" ? "/admin" : "/dashboard";
    
    const [mobile, setMobile] = useState(false);
    const [sidebar, setSidebar] = useState(false);

    const [hide, setHide] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const refOutsideDiv = useRef(null);

    const signOut = () =>{
        dispatch(signOutUserStart());
    }
    
    // disable scrolling when side menu is opened.
    useEffect(() => {
        const handleClickOutsideDiv = (e) =>{
            if (!e.target.closest('.sidebar')) { // check if element or parents has class
                setSidebar(false);
            }
        }
        if(sidebar){
            document.addEventListener("click", handleClickOutsideDiv, true);
            document.body.style.overflowY = 'hidden';
        }
        return () => {
            document.removeEventListener('click', handleClickOutsideDiv);
            document.body.style.overflowY = 'visible';
        };
    }, [sidebar])

    // detect screen size
    useEffect(() => {
        if (window.innerWidth <= 840) {
            setMobile(true);
        }
    }, []);

    // detect screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 840) {
                setMobile(true);
            } 
            else {
                setMobile(false);
                setSidebar(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // sticky header
    const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
            if (window.scrollY < 45 || window.scrollY < lastScrollY){
                setHide(false); 
            }
            else { // if scroll up show the navbar
                setHide(true);  
            }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY); 
        }
    };

    // detect scroll
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
    
          // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    const { t } = useTranslation(["header", "common"]);
    return(
    <>
        <header className={(hide ? "header hidden" : "header")}>
            <div className="wrap">
                {/* header, left, mobile */}
                {mobile &&
                <div className="sideMenu"> 
                    <a>{!sidebar ?
                        <TbMenu2 size={28} onClick={() => setSidebar(!sidebar)} color={"black"}/> : //stroke-width="0.01"
                        <CgClose size={28} onClick={() => setSidebar(!sidebar)} color={"black"}/>
                    }
                    </a>
                </div>
                }

                <div className="logo"> 
                    <Link to="/">
                        <img src={Logo} alt="LOGO" />
                    </Link>
                </div>
                {/* header, right, not mobile */}
                {!mobile &&
                <div className='callToActions'>
                    <ul>
                        <NavItem text= {t("Shop")} link="/search"/>
                        <NavItem text= {t("Cart")} link="/cart" number={totalNumCartItems}/>
                        {/* <NavItem text= {"Account"} link={myAccountLink}/> */}
                        {/* if the user IS logged in */}
                        {currentUser && [
                            <NavItem image= {profileImageUrl ? profileImageUrl : DefaultUserImage} profileImageClass={profileImageClass} mobile={false}>
                                <DropdownMenu  />
                            </NavItem>,
                        ]}
                        {/* if the user is not logged in */}
                        {!currentUser && [
                            <NavItem text= {t("Account")} link="/login"/>
                        ]}
                    </ul>
                </div>
                }
                {/* header, right, mobile */}
                {mobile &&
                    <div className='callToActions mobile'>
                        <ul>
                            <li className="nav-item">
                                <Link to= {'/cart'}>
                                    <MdOutlineShoppingBag size={28} color={"black"}/>
                                    {totalNumCartItems > 0 &&
                                        <div className='cart-item-number'>{totalNumCartItems}</div>
                                    }
                                </Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>

            {/* sidebar, mobile*/}
            <div className={sidebar ? "sidebar active" : "sidebar"} ref={refOutsideDiv}>
                <ul className="sidebar-items">
                    {/* if the user IS logged in */}
                    {currentUser && [
                        <div className='row-account'>
                            <NavItem 
                                image= {profileImageUrl ? profileImageUrl : SideMenuDefaultUserImage} 
                                profileImageClass={profileImageClass} 
                                mobile={true} 
                                setSidebar={setSidebar} sidebar={sidebar}
                                link={myAccountLink}
                            >
                                <span className='row-account-text'>{t("Account")}</span>
                            </NavItem>
                        </div>,
                        <NavItem 
                            text= {t("Shop")} link="/search"                             
                            mobile={true} 
                            setSidebar={setSidebar} sidebar={sidebar}
                        />,
                        <NavItem 
                            setSidebar={setSidebar} sidebar={sidebar} signOut={signOut} logOutButton={true} text= {t("Log out")}
                        />,
                    ]}

                    {/* if the user is not logged in */}
                    {!currentUser && [
                        <div className='logged-out'>
                            <div className='account'>
                                <NavItem text= {t("Log in")} link="/login" setSidebar={setSidebar} sidebar={sidebar} mobile={true} />
                                <NavItem text= {t("Sign up")} link="/registration" setSidebar={setSidebar} sidebar={sidebar} mobile={true} />
                            </div>
                            <NavItem text= {t("Shop")} link="/search"  setSidebar={setSidebar} sidebar={sidebar} mobile={true} />
                        </div>
                    ]}
                </ul>
            </div>
        </header>
        </>
    );
};

Header.defaultProps = {
    currentUser: null
}

export default Header;