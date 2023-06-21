import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";

import './styles.scss';
import backgroundImage from '../../../src/assets/tp101.jpg';

const About = props => {
    const { t } = useTranslation(["about"]);

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
                    &emsp;&emsp;{t("Büshka, originating from Taipei, is an autonomous streetwear label founded in 2023. It serves as a fusion of contemporary street culture with traditional eastern influences, positioning itself as an independent streetwear clothing brand.")} 
                    </p>
                    <p className='text-content'>
                    &emsp;&emsp;{t("By blending elements from the rich heritage of eastern culture with modern streetwear aesthetics, Büshka aims to create an unique and captivating clothing experience for its audience. With a focus on merging the past and the present, Büshka's vision is to offer a distinctive style that resonates with individuals seeking a harmonious balance between tradition and urban fashion.")}
                    </p>
                </div>
                

            </div>
        </section>
    );
};

export default About;