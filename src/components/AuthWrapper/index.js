import React from "react";
import './styles.scss';


const AuthWrapper = ({ headline, children}) => {
    return (
        <div className="authWrapper">
            <div className="wrap">
                {/* only render headline if it's passed in the props */}
                {headline &&<h2>{headline}</h2>}

                <div className="children">
                    { children && children }
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper;