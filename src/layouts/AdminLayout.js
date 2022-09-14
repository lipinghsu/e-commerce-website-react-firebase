import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserStart } from './../redux/User/user.actions';
import Button from '../components/forms/Button';
import VerticalNav from '../components/VerticalNav';

import AddNewProduct from '../components/AddNewProduct';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})
const AdminLayout = props => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);
    const configUserProfile = {currentUser}
    
    const [hideModal, setHideModal] = useState(true);


    const signOut = () => {
        dispatch(signOutUserStart());
    };
    const toggleModal = () => {
        setHideModal(!hideModal);
        // resetModalState();
        console.log("AdminLayout - toggleModal")
    };

    return (
        <div className="adminLayout">
            {/* <div className='second-header'> */}
                {/* <UserProfile {...configUserProfile} /> */}
            {/* </div> */}

            <div className="controlPanel">
                <AddNewProduct setHideModal={setHideModal} hideModal={hideModal}/>

                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            <li>
                                <Button onClick={() => toggleModal()}>
                                    List an item
                                </Button>
                            </li>
                            <li> 
                                <Link to="/admin">Overview</Link>
                            </li>
                            <li>
                                <span className="signOut" onClick={() => signOut()}>Sign Out</span>
                            </li>
                        </ul>
                    </VerticalNav>
                </div>

                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;