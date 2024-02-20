import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const ProjectDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState<any>(null);

  const getProject = api.project.getById.useQuery({ id: id as string });

  useEffect(() => {
    if (getProject.data && !projectData && getProject.data !== projectData) {
      setProjectData(getProject.data);
    }
  }, [getProject.data, projectData]);

  return (
    <div>
      {projectData && (
        <>
          <div dangerouslySetInnerHTML={{ __html: projectData.about }} />
        </>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
