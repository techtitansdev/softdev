import Output from "editorjs-react-renderer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import EditorOutput from "../../projects/components/editorOutput";


const ProjectDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blogData, setblogData] = useState<any>(null);
  const [editorBlocks,setEditorBlocks] = useState([]);
  const [initialEditorData,setinitialEditorData] = useState()
  const getBlog = api.blog.getById.useQuery({ id: id as string });

  useEffect(() => {
    if (getBlog.data && !blogData && getBlog.data !== blogData) {
      setblogData(getBlog.data);
      const initialEditorData = JSON.parse(getBlog.data.content);
      setinitialEditorData(initialEditorData)
      setEditorBlocks(initialEditorData.blocks)
    }
  }, [getBlog.data, blogData]);

  return (
    <div className="flex">
      <Sidebar />

      {blogData && (
        <>
        
        <EditorOutput content={initialEditorData}/>
        </>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
