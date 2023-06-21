import React from 'react';
import './styles.scss';
import userIMG from './../../assets/user.png';
import logo from './../../assets/meihuared.png';
const UserProfile = props => {
    const { currentUser } = props;
    const { firstName } = currentUser;

    return (
        <div className="userProfile">

                <div className="img">
                    {/* <img src={currentUser.userProfileImage ? currentUser.userProfileImage : userIMG} /> */}
                    <img src={logo} />
                </div>
                <span className="displayName">
                    {/* Hey{firstName && (', ' + firstName)} */}
                </span>
        </div>
    );
}

export default UserProfile; 