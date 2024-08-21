import React from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-6 block w-72 rounded-2xl bg-blue-800 py-2 text-lg font-semibold text-white hover:bg-blue-900 md:mb-6 md:w-80 md:py-3 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
