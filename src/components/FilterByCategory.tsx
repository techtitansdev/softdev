import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { IoFilterCircleOutline, IoFilterOutline } from "react-icons/io5";
import { categoriesOption } from "~/data/categories";
import { FilteredCategoriesProps } from "~/types/filter";

const FilterByCategory = ({
  selectedCategory,
  handleCategorySelect,
}: FilteredCategoriesProps) => {
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  return (
    <div className="relative z-10">
      <div className="mx-1 ml-2 lg:mx-2 lg:hidden">
        <IoFilterOutline
          size={28}
          onClick={toggleCategoryList}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`hidden w-[300px] cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 lg:flex ${
          isCategoryListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleCategoryList}
      >
        {selectedCategory}
        <BiChevronDown size={20} />
      </div>
      {isCategoryListOpen && (
        <div className="absolute mt-2 max-h-52 w-[300px] overflow-y-auto border border-gray-500 bg-white lg:left-0">
          {categoriesOption.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => {
                handleCategorySelect(option.value);
                toggleCategoryList();
              }}
            >
              {option.label}
              <hr className="border-t-1 mt-2 border-dashed border-gray-500"></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByCategory;
