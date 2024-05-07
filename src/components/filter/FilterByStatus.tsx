import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";

interface FilteredStatusProps {
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
}

const FilterByStatus = ({
  selectedOption,
  handleOptionSelect,
}: FilteredStatusProps) => {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);

  const toggleOptionList = () => {
    setIsOptionListOpen(!isOptionListOpen);
  };

  const options = ["All", "Published", "Draft"];

  return (
    <div className="relative z-10">
      <div className="mx-1 ml-2 lg:mx-2 lg:hidden">
        <IoFilterOutline
          size={26}
          onClick={toggleOptionList}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`hidden w-[300px] cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 lg:flex ${
          isOptionListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleOptionList}
      >
        {selectedOption}
        <BiChevronDown size={20} />
      </div>
      {isOptionListOpen && (
        <div className="absolute right-0 mt-7 max-h-56 w-[280px] overflow-y-auto rounded-lg border border-gray-500 bg-white md:right-[-8px] lg:left-0 lg:mt-2 lg:w-[300px]">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => {
                handleOptionSelect(option);
                toggleOptionList();
              }}
            >
              {option}
              <hr className="border-t-1 my-2 border-dashed border-gray-500"></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByStatus;
