import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../../redux/User/user.actions'; 
import { useTranslation } from "react-i18next";
// the dropdown menu when userIcon/profilePicture is clicked

const mapState = (state) => ({
    currentUser: state.user.currentUser,
});

function DropdownMenu(){
    // const t = useTranslation(["header"])
    const { t } = useTranslation(["header", "common"]);
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);
    const myAccountLink = (currentUser && currentUser.userRoles && currentUser.userRoles[0]) === "admin" ? "/admin" : "/dashboard";
    
    const signOut = () =>{
        dispatch(signOutUserStart());
    }

    function DropdownItem(props){
        return(
            <Link to={props.link}>
                <div className='menu-item'>
                    {props.children}
                </div>
            </Link>
        )
    }

    return(
        <div className="dropdown">
            {/* <DropdownItem link={""}>Your Profile</DropdownItem> */}
            {/* <DropdownItem link="/report">Report</DropdownItem> */}
            <DropdownItem link={myAccountLink}>{t("Account")}</DropdownItem>
            
            {/* <DropdownItem onClick={() => signOut()}>Log Out</DropdownItem> */}
            <a className='menu-item' onClick= {() => signOut()}>
                <span >
                    {t("Log out")}
                </span>
            </a>
        </div>
    )
}

export default DropdownMenu;

