import React from "react";

import { FaArrowCircleRight } from "react-icons/fa";


const Accordion = ({title, showContent, setShowContent, detailText, cellRef}) => {
    return(
        <div className="accordion">
            <div className={showContent ? "col-title-button" : "col-title-button hidden"} onClick={() => {setShowContent(!showContent)}}>
                <h3>{title}</h3>
                <div className="react-icon-arrow">
                    <FaArrowCircleRight size={23}/>
                </div>
            </div>
            <div className={showContent ? "description-text" : "description-text hidden"} 
                ref={cellRef}> 
                {detailText}
            </div>
        </div>
    );
}

export default Accordion;