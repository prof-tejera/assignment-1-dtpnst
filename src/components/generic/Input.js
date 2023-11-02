import React from "react";

const Input = ({label, type, inputId, isRequired, onChange, ...props}) => {
    const handleInputChange = (event) => {
        onChange(event.target.value);
    }

    return (
        <div>
        <label htmlFor={inputId} className={isRequired ? "required" : ""}>{label}</label>
        <input 
            id={inputId}
            type={type}
            required={isRequired}
            onChange={handleInputChange}
            {...props}/>
        </div>
    );
};

export default Input;
