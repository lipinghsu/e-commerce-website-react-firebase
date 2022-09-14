import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles.scss';

const HomepageLayout = props =>{
    return(
        <div className='flex-wrapper-homepage-layout'>
            <Header {...props} />
            {props.children}  
            <Footer />
        </div>
    );
};

export default HomepageLayout;