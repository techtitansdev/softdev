import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type FilterByProjectNameProps = {
  selectedProject: string;
  handleProjectSelect: (project: string) => void;
  tableData: Array<{ projectName: string }>;
};

const FilterByProjectName: React.FC<FilterByProjectNameProps> = ({
  selectedProject,
  handleProjectSelect,
  tableData,
}) => {
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);

  const toggleProjectList = () => {
    setIsProjectListOpen(!isProjectListOpen);
  };

  const sortedProjects = Array.from(
    new Set(tableData.map((item) => item.projectName)),
  ).sort();

  return (
    <div className="relative z-10">
      <div
        className={`flex w-[230px] cursor-pointer items-center justify-between rounded-md border border-gray-500 bg-white p-2 ${
          isProjectListOpen ? "z-10" : "z-0"
        }`}
        onClick={toggleProjectList}
      >
        {selectedProject}
        <BiChevronDown size={20} />
      </div>

      {isProjectListOpen && (
        <div className="absolute left-0 mt-2 max-h-52 w-[230px] overflow-y-auto border border-gray-500 bg-white md:right-[-8px]">
          <div
            className="cursor-pointer p-2 text-sm hover:bg-gray-200"
            onClick={() => {
              handleProjectSelect("All");
              toggleProjectList();
            }}
          >
            All
            <hr className="border-t-1 mt-2 border-dashed border-gray-500"></hr>
          </div>
          {sortedProjects.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer truncate p-2 pb-1 text-sm hover:bg-gray-200"
              onClick={() => {
                handleProjectSelect(option);
                toggleProjectList();
              }}
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

export default FilterByProjectName;
