import React, { useState } from "react";

function Input({
  type,
  placeholder,
  onChange,
  className,
  passError,
  nameError,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      required
      className={passError || nameError ? "error" : ""}
    />
  );
}

export default Input;
