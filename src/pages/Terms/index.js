import React, { useEffect } from 'react';

import './styles.scss';

const Terms = props => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <section className='terms'>
            <div className='terms-detail'>
                <h3>
                    Returns and Exchanges
                </h3>

                <p>
                    SHIPPING FEES ARE ONLY COVERED FOR PRODUCTS THAT ARE DAMAGED OR SHIPPED INCORRECTLY. PLEASE CONTACT CUSTOMER SUPPORT THROUGHT INSTAGRAM (@BUSHKATPC) WITH AN EXPLANATION OF DEFECT AND INCLUDE PHOTO AND/OR VIDEO OF DAMAGED OR INCORRECT ITEM TO RECEIVE A PREPAID SHIPPING LABEL VIA EMAIL FOR YOUR RETURN. 
                </p>
                <p>
                    IF YOU HAVE RECEIVED A RETURN SHIPPING LABEL, MAKE SURE YOU SEND YOUR ITEM(S) BACK WITHIN 2 WEEKS FROM RECEIVING YOUR RETURN SHIPPING LABEL OR YOUR RETURN SHIPPING LABEL WILL BECOME INVALID. 
                </p>
            </div>
            <div className='terms-detail'>
                <h3>
                    Taxes and Duties
                </h3>

                <p>
                    NEARLY EVERY SHIPMENT THAT CROSSES AN INTERNATIONAL BORDER IS SUBJECT TO THE ASSESSMENT OF DUTIES AND TAXES AND (UNFORTUNATELY) EACH COUNTRY DETERMINES THE ASSESSMENT OF DUTIES AND TAXES DIFFERENTLY.
                </p>
                <p>
                    IT IS IMPORTANT TO NOTE THAT ALL TAXES AND DUTIES ARE AT THE RESPONSIBILITY OF THE PURCHASER. WE DO NOT HAVE THE ABILITY TO MARK PACKAGES AS HAVING "NO COMMERCIAL VALUE" IN ORDER TO REDUCE POTENTIAL DUTIES DUE.
                </p>
                <p>
                    **MAKE SURE TO RESEARCH YOUR COUNTRY'S CUSTOMS REQUIREMENTS IN ORDER TO AVOID ANY UNEXPECTED FEES.**
                </p>
            </div>
            <div className='terms-detail'>
                <h3>
                    Shipping and Delivery Time
                </h3>

                <p>
                    MOST ORDERS ARE FULFILLED WITHIN 2-4 BUSINESS DAYS OF THE ORDER BEING PLACED ONLINE. DOMESTIC DELIVERY TAKES 7-10 DAYS WHILE INTERNATIONAL DELIVERY CAN TAKE ANYWHERE FROM 2-10 WEEKS.
                </p>
                <p>
                    **MULTIPLE UNIT ORDERS WILL NOT SHIP UNTIL ALL ITEMS ARE AVAILABLE IN STOCK.**
                </p>
            </div>
            
        </section>
    );
};

export default Terms;