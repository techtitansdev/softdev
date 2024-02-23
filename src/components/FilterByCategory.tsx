import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { categoriesOption } from "~/data/categories";
import { FilteredCategoriesProps } from "~/types/filter";

const FilterByCategory = ({
  selectedCategory,
  isCategoryListOpen,
  toggleCategoryList,
  handleCategorySelect,
}: FilteredCategoriesProps) => {
  return (
    <div className="relative z-10">
      <div
        className={`flex w-[300px] cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 ${
          isCategoryListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleCategoryList}
      >
        {selectedCategory}
        <BiChevronDown size={20} />
      </div>
      {isCategoryListOpen && (
        <div className="absolute left-0 mt-2 max-h-52 w-[300px] overflow-y-auto border border-gray-500 bg-white">
          {categoriesOption.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleCategorySelect(option.value)}
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
