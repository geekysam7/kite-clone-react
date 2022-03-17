import React from "react";

function Input({ error, inputClassName, errorClassName, ...props }) {
  return (
    <>
      <div className={inputClassName || "input-wrapper"}>
        <input {...props} />
      </div>
      {error && (
        <div className={errorClassName || "error-wrapper"}>{error}</div>
      )}
    </>
  );
}

export default Input;
