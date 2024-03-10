// components/MilestoneComponent.js
import React from "react";

interface Milestone {
  milestone: number;
  value: number;
  unit: string;
  date: string;
  description: string;
}

interface Props {
  milestones: Milestone[];
}

const MilestoneComponent: React.FC<Props> = ({ milestones }) => {
  return (
    <div className="flex items-center justify-center bg-gray-50 shadow">
      <div className="mx-2 my-6 md:mx-20">
        {milestones.map((milestone, index) => (
          <div key={index} className="group relative py-6 pl-8 sm:pl-32">
            <div className="font-caveat mb-1 text-sm font-medium text-blue-800 sm:mb-0">
              Milestone {milestone.milestone}
            </div>
            <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-slate-300 before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-50 after:bg-blue-800 group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
              <time className="left-0 mb-3 inline-flex h-6 w-20 translate-y-0.5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold uppercase text-emerald-600 sm:absolute sm:mb-0">
                {"milestone.date"}
              </time>
              <div className="text-lg font-bold text-slate-900">
                {milestone.value} {milestone.unit}
              </div>
            </div>
            <div className="text-sm font-light text-slate-600">
              {milestone.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneComponent;
