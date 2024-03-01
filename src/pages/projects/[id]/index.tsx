import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";

const SpecificProjectDetails = () => {
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
      <Navbar />

      {projectData && (
        <div
          dangerouslySetInnerHTML={{ __html: projectData.about }}
          className="mx-16 mb-20 mt-32"
        />
      )}
      <Footer />
    </div>
  );
};

export default SpecificProjectDetails;
