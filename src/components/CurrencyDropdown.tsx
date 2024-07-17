import React, { useState, useRef, useEffect, useCallback } from "react";
import { BiChevronDown } from "react-icons/bi";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const CurrencyDropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative w-1/3" ref={dropdownRef}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-2 py-1 text-sm outline-none md:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption}</span>
        <BiChevronDown size={20} />
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-md">
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer px-2 py-1 hover:bg-gray-200"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencyDropdown;
