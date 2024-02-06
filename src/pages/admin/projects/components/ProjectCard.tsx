import Link from "next/link";
import { Key } from "react";
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
          className="hover:scale-104 w-84 h-96 transform shadow-lg transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link
            href={`/projects/${encodeURIComponent(projectData.title)}`}
          >
            <img  
              className="h-64 w-full rounded-lg"
              src={projectData.projectImage}
            />
          </Link>

          <div className="my-2 ml-2">
            <h5 className="text-lg tracking-tight text-gray-900">
              {projectData.title}
            </h5>
            <p className="flex flex-row items-center font-normal text-gray-700 dark:text-gray-500">
              <IoLocationSharp size={15} /> {projectData.hub}
            </p>
          </div>

          <Link href={`/admin/projects/edit`}>
            <button className="ml-2 mt-2 border border-gray-500 px-8 py-1 text-gray-800 shadow-md hover:bg-gray-200">
              Edit
            </button>
          </Link>

          <Link href={''}>
          <button className="ml-2 mt-2 border px-8 py-1 text-white shadow-md bg-blue-800 hover:bg-blue-600">
            Delete
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProjectCard;