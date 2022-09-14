import React from 'react';

import './styles.scss';

const CheckoutLayout = props =>{
    return(
        <div className='flex-wrapper-checkout-layout'>
            <div className="main-checkout">
                {props.children}
            </div>
        </div>
    );
};

export default CheckoutLayout;