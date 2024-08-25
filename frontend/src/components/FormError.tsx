import React from "react";

const FormError = ({ error }: { error: string | undefined }) => {
  return (
    <div className="max-w-full text-xs capitalize text-red-500 font-semibold text-center">*{error}</div>
  );
};

export default FormError;
