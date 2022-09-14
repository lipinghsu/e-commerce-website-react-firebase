import React, { useEffect } from 'react'
import {FiPlus, FiMinus} from "react-icons/fi";
import FormInput from '../../forms/FormInput';
import "./styles.scss"

function QuantityButton({setQuantityValue, quantityValue, setIsLoading}) {

    const handleAddButton = () =>{
        setQuantityValue(quantityValue + 1);
        setIsLoading(true);
    }
    const handleMinusButton = () =>{
        setQuantityValue( (quantityValue <= 1) ? 1 : (quantityValue - 1));
        setIsLoading(true);
    }
    const handleQuantityChange = (event) => {
        setQuantityValue(Number(event.target.value));
        setIsLoading(true);
    }
    
    return (
        <div className="col-quantity-add-button">
            <div className="quantity-input">
                <span className="dec-button" onClick={handleMinusButton}>
                    <FiMinus className="closeImage"/>
                </span>
                
                <FormInput 
                    value={Number(quantityValue).toString()}
                    defaultValue = "1"
                    min= "1"
                    max= "42069"
                    step="1"
                    type= "number"
                    id = "quantity-input"
                    handleChange={handleQuantityChange.bind(this)}
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                />
                <span className="inc-button" onClick={handleAddButton}>
                    <FiPlus className="closeImage"/>
                </span>
            </div>
        </div>
    )
}

export default QuantityButton