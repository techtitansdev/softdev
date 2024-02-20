import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const ProjectDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState<any>(null);

  const getProject = api.project.getById.useQuery({ id: id as string });

  useEffect(() => {
    if (id) {
      getProject.refetch();
    }
  }, [id, getProject]);

  useEffect(() => {
    if (getProject.data) {
      setProjectData(getProject.data);
    }
  }, [getProject.data]);

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