import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";

interface ProjectCardProps {
  projectData: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  return (
    <div>
      <ul>
        <li
          key={projectData.id}
          className="transform rounded-lg pb-4 shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          <Link href={`/projects/${encodeURIComponent(projectData.id)}`}>
            <img
              className="object-obtain h-56 w-[280px] rounded-t-lg lg:w-[300px]"
              src={projectData.image}
              alt="project-image"
            />
          </Link>

          <div className="my-2 ml-2">
            <h5 className="text-lg font-medium tracking-tight text-gray-900">
              {projectData.title}
            </h5>
            <p className="flex flex-row items-center font-normal text-gray-700 dark:text-gray-500">
              <IoLocationSharp size={15} /> {projectData.hub}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProjectCard;
