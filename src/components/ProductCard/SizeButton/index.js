import React, {useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './styles.scss';

let sizeOptions = [{id: 1, value:'XS'}, {id: 2, value:'S'}, {id: 3, value: 'M'}, {id:4, value:'L'}, {id:5, value:'XL'}];

export default function SizeButton({onChange}){
    const [current, setCurrent] = useState(sizeOptions[0].id);
    // const dispatch = useDispatch();
    function handleSelectedButton(size){
        onChange(size)
        setCurrent(size.id);
    }
    
    return <div className="button-group-container">
        {sizeOptions.map((sizeOptions, index) => {
            const reactButton = "button" + " " +(current === sizeOptions.id ? "active" : "")
            return (
                <div className="button-container" key={index} onClick={() => handleSelectedButton(sizeOptions)}>
                    <div className={reactButton} >
                        {sizeOptions.value}
                    </div>
                </div>
            );
        })}
    </div>
}  