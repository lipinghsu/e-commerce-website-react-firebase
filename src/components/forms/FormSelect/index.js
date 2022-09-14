import React from 'react';

import './styles.scss';

const FormSelect = ({ options, defaultValue, handleChange, label, ...otherProps }) => {
    if (!Array.isArray(options) || options.length < 1) {
        return null;
    }

    return (
        <div className="formRow-select">
            
        {label && (
            <label className="form-select-label">
                {label}
            </label>
        )}
        <div className="select-wrapper">
            <select className="formSelect" 
                    value={defaultValue} onChange={handleChange} {...otherProps}>
                        
                {options.map((option, index) => {
                const { value, name } = option;

                return (
                    <option key={index} value={value}>{name}
                    </option>
                    
                );
                
                })}
            </select>
            
        </div>
        
        </div>
    );
}

export default FormSelect; 