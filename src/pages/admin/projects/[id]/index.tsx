import Output from "editorjs-react-renderer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import EditorOutput from "../components/editorOutput";

const ProjectDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState<any>(null);
  const [editorBlocks,setEditorBlocks] = useState([]);
  const [initialEditorData,setinitialEditorData] = useState()
  const getProject = api.project.getById.useQuery({ id: id as string });

  useEffect(() => {
    if (getProject.data && !projectData && getProject.data !== projectData) {
      setProjectData(getProject.data);
      const initialEditorData = JSON.parse(getProject.data.about);
      setinitialEditorData(initialEditorData)
      setEditorBlocks(initialEditorData.blocks)
    }
  }, [getProject.data, projectData]);

  return (
    <div className="flex">
      <Sidebar />

      {projectData && (
        <>
        
        <EditorOutput content={initialEditorData}/>
        </>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
