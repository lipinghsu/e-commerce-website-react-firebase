import React from 'react';
import './styles.scss';

const FormInput = ({ handleChange, value, label, id, ...otherProps }) => {
    return (
        <div className="formRow">
            {label && (
                <label 
                    className={!value ? "form-input-label": value && "filled"}>
                    {label}
                </label>
            )}
            <input value={value} className={"formInput"} onChange={ handleChange } id={id} {...otherProps} />
        </div>
    );
}

export default FormInput;