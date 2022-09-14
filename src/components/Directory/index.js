import React, {useEffect} from 'react';
import LogoW from '../../assets/boxlogo.png'; 
import Logo from '../../assets/mh-rpk-tp-white.png';
import thePicture from '../../assets/barcode.png';
import { Link } from 'react-router-dom';

import './styles.scss';

const Directory = props =>{
    useEffect(() =>{
        window.scrollTo(0, 0);
    }, [])
    return(
        <div className='directory'>
            <div className='wrap'>
                <div className='item' >
                    {/* <div className='inner-wrap' style={{backgroundImage: `url(${thePicture})`}}> */}
                    <div className='inner-wrap'>
                        <Link to= {'/search'}>
                            <div className='item-logo'></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Directory;