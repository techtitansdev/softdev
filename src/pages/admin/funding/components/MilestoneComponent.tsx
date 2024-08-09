import React from "react";

interface Milestone {
  milestone: number;
  value: number;
  unit: string;
  date: string;
  description: string;
  done: boolean;
}

interface Props {
  milestones: Milestone[];
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const MilestoneComponent: React.FC<Props> = ({ milestones }) => {
  if (!milestones || milestones.length === 0) {
    return <div>No milestones available.</div>;
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 shadow">
      <div className="mx-2 my-6 md:mx-20">
        {milestones.map((milestone, index) => {
          const nextMilestone = milestones[index + 1];
          const isNextDone = nextMilestone ? nextMilestone.done : false;

          return (
            <div key={index} className="group relative py-6 pl-8 sm:pl-32">
              <div className="font-caveat mb-1 text-sm font-medium text-blue-800 sm:mb-0">
                Milestone {milestone.milestone}
              </div>
              <div
                className={`mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-50 group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem] ${
                  isNextDone ? "before:bg-emerald-600" : "before:bg-slate-300"
                } ${
                  milestone.done ? "after:bg-emerald-600" : "after:bg-slate-300"
                }`}
              >
                <time
                  className={`left-0 mb-3 inline-flex h-6 w-24 translate-y-0.5 items-center justify-center rounded-full text-xs font-semibold uppercase sm:absolute sm:mb-0 ${
                    milestone.done ? "text-emerald-700" : "text-gray-600"
                  }`}
                >
                  {formatDate(milestone.date)}
                </time>
                <div className="text-lg font-bold text-slate-900">
                  {milestone.value} {milestone.unit}
                </div>
              </div>
              <div className="text-sm font-light text-slate-600">
                {milestone.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneComponent;
