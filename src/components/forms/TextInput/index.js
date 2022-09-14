import React from 'react';
import './styles.scss';


const TextInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className="textRow">
            {label && (
                <label className="text-input-label">
                    {label}
                </label>
            )}
            
            <textarea maxlength="230" className="textInput" onChange={ handleChange } {...otherProps} />
        </div>
    );
}

export default TextInput;