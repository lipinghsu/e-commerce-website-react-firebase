import React from "react";
import './styles.scss';


const Button = ({children, ...otherProps}) => {
    
    return(
        <button className="btn" {...otherProps}>
            {otherProps.isLoading ? <span><i className="bx bx-loader-alt bx-spin"></i></span>
            : <>{children}</>
            }
        </button>
        
    )
}

export default Button;
