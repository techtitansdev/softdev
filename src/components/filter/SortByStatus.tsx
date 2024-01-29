import React from "react";
import { BiChevronDown } from "react-icons/bi";

type SortByStatusProps = {
  selectedStatus: string;
  isStatusListOpen: boolean;
  toggleStatusList: () => void;
  handleStatusSelect: (status: string) => void;
};

const statusOptions = ["Newest", "Coming Soon"];

const SortByStatus = ({
  selectedStatus,
  isStatusListOpen,
  toggleStatusList,
  handleStatusSelect,
}: SortByStatusProps) => {
  return (
    <div className="relative z-10">
      <div
        className={`flex w-60 cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 ${
          isStatusListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleStatusList}
      >
        {selectedStatus}
        <BiChevronDown size={20} />
      </div>
      {isStatusListOpen && (
        <div className="absolute left-0 mt-2 w-60 border border-gray-500 bg-white">
          {statusOptions.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleStatusSelect(option)}
            >
              {option}
              <hr className="border-t-1 mt-2 border-dashed border-gray-500"></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortByStatus;
