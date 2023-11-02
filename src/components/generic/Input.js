import React from "react";

const Input = ({label, type, inputId, isRequired, ...props}) => {
  return (
    <div>
      <label htmlFor={inputId} className={isRequired ? "required" : ""}>{label}</label>
      <input 
        id={inputId}
        type={type}
        required={isRequired}
        {...props}/>
    </div>
  );
};

export default Input;
