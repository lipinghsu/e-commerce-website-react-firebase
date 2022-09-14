import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import './styles.scss'

const Notification = ({activeStatus, setActiveStatus, text, iconName}) => {
    return(
        <div className={activeStatus ? "notification" + " active" : "notification"}>
            <div className="notification-image">
                {iconName}
            </div>
            <div className="notification-text">
                {text}
            </div>
            <div className="close-button"  onClick={() =>setActiveStatus(false)} >
                <IoCloseOutline size={28}/>
            </div>
        </div>
    )
}

export default Notification