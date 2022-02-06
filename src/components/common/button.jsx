import React from "react";

const Button = ({ data, onClick, iconClass, btnClass, text }) => {
  return (
    <button
      className={btnClass}
      onClick={() => {
        onClick(data);
      }}
    >
      <i className={iconClass} aria-hidden="true"></i>
      {text && text}
    </button>
  );
};

export default Button;
