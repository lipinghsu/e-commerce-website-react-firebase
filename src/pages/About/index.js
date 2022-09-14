import React, { useEffect } from 'react';

import './styles.scss';
import backgroundImage from '../../../src/assets/tp101.jpg';

const About = props => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return(
        <section className='about'>
            <div className='about-wrap'>
                <div className="image-container">
                    <img src={backgroundImage}></img>
                </div>
                <div className='text-content-wrap'>
                    <h3>About</h3>
                    <p className='text-content'>
                        Büshka is an independent clothing brand established in 2022 as a streetwear label from Taipei, inspired by the idea of merging traditional eastern culture with contemporary street culture.
                    </p>
                </div>
                

            </div>
        </section>
    );
};

export default About;