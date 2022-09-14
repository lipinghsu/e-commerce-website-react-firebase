import React, {useState, useRef, useEffect} from "react";
import { Link } from "react-router-dom";

const NavItem = props => {
    const [open, setOpen] = useState(false);
    const refOutsideDiv = useRef(null);

    useEffect(() => {
        const handleClickOutsideDiv = (e) =>{
            if (!e.target.closest('.profile-image-button')) { 
                setOpen(false);
            }
        }
        if(open){
            document.addEventListener("click", handleClickOutsideDiv, true);
        }
        return () => {
            document.removeEventListener('click', handleClickOutsideDiv);
        };
    }, [open])


    
    return(
        <li className="nav-item">
            {/* not mobile, image */}
            {props.image && !props.mobile &&
            <div ref={refOutsideDiv} className="profile-image-button">
                <img 
                    src={props.image} 
                    alt="userProfilePicture" 
                    className={props.profileImageClass}
                    onClick={() => setOpen(!open)} 
                />
                {open && props.children}
            </div>
            }
            {/* not mobile, text */}
            {props.text && !props.mobile && !props.signOut &&
            <div>
                <Link to= {props.link} >
                    <span className="text-button">
                        {props.text} 
                        {/* cart item number */}
                        {props.number != 0 && props.number &&
                            <span> ({props.number})</span>
                        }
                    </span>
                </Link>
            </div>
            }
            
            {/* mobile, image (account) */}
            {props.image && props.mobile &&
            <div>
                <Link to= {props.link} >
                <img
                    src={props.image} 
                    alt="userProfilePicture" 
                    className={props.profileImageClass}   
                />
                {props.children}
                </Link>
            </div>
            }
            {/* mobile, text */}
            {props.text && props.mobile &&
            <div onClick= {() => {props.setSidebar(false);}}>              
                <Link to= {props.link} >
                    <span className="text-button">
                        {props.text} 
                    </span>
                </Link>

            </div>
            }

            {/*  log out button */}
            {props.text === "Log out" &&
            <div onClick= {() => {props.signOut();}}>                
                <Link to= {props.link} >
                    <span className="text-button">
                        {props.text} 
                    </span>
                </Link>

            </div>
            }
        </li>
    )
}

export default NavItem;