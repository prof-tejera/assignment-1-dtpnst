import React from "react";

const Button = ({text, ...btnProps }) => {
    return (
      <button
        {...btnProps}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  