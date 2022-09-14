import React from 'react';
import Header from './../components/Header';
import Footer from '../components/Footer';
import './styles.scss';

const MainLayout = props =>{
    return(
        <div className='flex-wrapper-main-layout'>
            <Header {...props}/>
            <div className="main">
                {props.children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;