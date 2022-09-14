import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from '../../Utils';
import './styles.scss'


const mapState = ({ user}) => ({
    currentUser: user.currentUser
})

const AdminToolbar = props => {
    const { currentUser} = useSelector(mapState);
    const isAdmin = checkUserIsAdmin(currentUser);
    
    // if (!isAdmin){
    //     return null;
    // }
    // return (
    //     <div className='adminToolbar'>
    //         <ul>
    //             <li>
    //                 <Link to= "/admin">
    //                     My Admin
    //                 </Link>
    //             </li>
    //         </ul>

    //     </div>
    // )

    return null;
}

export default AdminToolbar;