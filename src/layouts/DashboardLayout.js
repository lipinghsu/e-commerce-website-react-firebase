import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOutUserStart } from './../redux/User/user.actions';
import Header from './../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import VerticalNav from '../components/VerticalNav';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})
const DashBoardLayout = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const signOut = () => {
        dispatch(signOutUserStart());
        history.push('/');
    };
    const { currentUser } = useSelector(mapState);

    const configUserProfile = {
        currentUser
    }
    return (

        <div className="dashboardLayout">
            <Header {...props} />
            {/* <div className='second-header'>
                <UserProfile {...configUserProfile} />
            </div> */}
            <div className="controlPanel">
                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            {/* <li>
                                <Link to={`/profile/${currentUser.userID}`}>Profile</Link>
                            </li> */}
                            <li>
                                <Link to="/dashboard">Order History</Link>
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
            <Footer />
        </div>
    );
};

export default DashBoardLayout;