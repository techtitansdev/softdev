import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const PaymentMethodDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-md py-4 pl-4 pr-7 text-sm outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{value ? value : placeholder}</div>
        <BiChevronDown size={20} />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-400 bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodDropdown;
