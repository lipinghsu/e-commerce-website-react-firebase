import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles.scss';

const AccountLayout = props =>{
    return(
        <div className='flex-wrapper-account-layout'>
            <Header {...props}/>
            <div className="main-account">
                {props.children}
            </div>
            <Footer />
        </div>
    );
};

export default AccountLayout;