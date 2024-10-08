import Link from "next/link";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";

interface ProjectData {
  id: string;
  image: string;
  title: string;
  hub: string;
}

interface ProjectCardProps {
  projectData: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  if (!projectData) {
    return null;
  }

  return (
    <div>
      <ul>
        <li
          key={projectData.id}
          className="transform rounded-lg pb-4 shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          <Link href={`/projects/${encodeURIComponent(projectData.id)}`}>
            <Image
              className="h-56 rounded-t-lg object-cover"
              src={projectData.image}
              alt="project-image"
              width={300}
              height={224}
            />
          </Link>

          <div className="my-2 ml-2 max-w-full">
            <h5 className="max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium tracking-tight text-gray-900">
              {projectData.title}
            </h5>
            <p className="flex items-center font-normal text-gray-700 dark:text-gray-500">
              <IoLocationSharp size={15} />
              <span className="ml-1 max-w-[238px] overflow-hidden text-ellipsis whitespace-nowrap">
                {projectData.hub}
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProjectCard;
