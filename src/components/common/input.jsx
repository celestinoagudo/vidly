import React from "react";

const Input = ({ name, label, value, error, onChange, type }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          id={name}
          type={type}
          className="form-control"
          onChange={onChange}
          value={value}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
