import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import Select from "react-select";
import { ProjectData } from "~/types/projectData";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";
import { NewEditor } from "~/components/editor/Editor";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";

function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const getProject = api.project.getById.useQuery({ id: id as string });
  console.log(getProject.data);
  const categories = api.categories.getAllCategories.useQuery();
  const categoriesOption = categories.data || [];
  categoriesOption.sort((a, b) => a.label.localeCompare(b.label));
  const [editorBlocks, setEditorBlocks] = useState([]);
  const [initialEditorData, setinitialEditorData] = useState();
  const deleteImage = api.project.removeImage.useMutation();

  const editProject = api.project.edit.useMutation({
    onSuccess: () => {
      setSuccessModalOpen(true);
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
      console.log(projectData);
    },
    onError: (error: any) => {
      console.error("Edit Project Failed", error);
    },
  });

  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    image: "",
    hub: "",
    category: "",
    type: "",
    beneficiaries: "",
    about: "",
    published: false,
    featured: false,
  });

  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  useEffect(() => {
    setEditorContent(projectData.about);
  }, [projectData.about]);

  useEffect(() => {
    if (getProject.data) {
      setProjectData((prevData) => ({
        ...prevData,
        about: getProject.data.about || "",
      }));

      const initialEditorData = JSON.parse(
        getProject.data.about || '{"blocks":[]}',
      );
      setinitialEditorData(initialEditorData);
      setEditorBlocks(initialEditorData.blocks);
    }
  }, [getProject.data]);

  useEffect(() => {
    if (getProject.data) {
      setProjectData((prevData) => {
        if (
          prevData.title !== getProject.data.title ||
          prevData.description !== getProject.data.description ||
          prevData.image !== getProject.data.image ||
          prevData.hub !== getProject.data.hub ||
          prevData.category !== getProject.data.category ||
          prevData.type !== getProject.data.type ||
          prevData.beneficiaries !== getProject.data.beneficiaries ||
          prevData.about !== getProject.data.about ||
          prevData.published !== getProject.data.published ||
          prevData.featured !== getProject.data.featured
        ) {
          return {
            title: getProject.data.title,
            description: getProject.data.description,
            image: getProject.data.image,
            hub: getProject.data.hub,
            category: getProject.data.category,
            type: getProject.data.type,
            beneficiaries: getProject.data.beneficiaries,
            about: getProject.data.about,
            published: getProject.data.published,
            featured: getProject.data.featured,
          };
        } else {
          return prevData;
        }
      });
      setImageUrl(getProject.data.image);
      const initialEditorData = JSON.parse(getProject.data.about);
      setinitialEditorData(initialEditorData);
      setEditorBlocks(initialEditorData.blocks);
    }
  }, []);

  const type = [
    { label: "Activity", value: "Activity" },
    { label: "Project", value: "Project" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleImageUpload = (result: CldUploadWidgetResults) => {
    console.log("result: ", result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      projectData.image = url;
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      deleteImage.mutate({
        id: id as string,
      });
      setImageUrl("");
      setProjectData({
        ...projectData,
        image: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (isPublished: boolean) => {
    const data = {
      ...projectData,
      id: id as string,
      image: imageUrl,
      about: JSON.stringify(editorData || initialEditorData || [], null, 2),
      published: isPublished,
      featured: false,
    };

    try {
      const editedProject = await editProject.mutateAsync(data);

      setProjectData(editedProject);
      setSuccessModalOpen(true);
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (error) {
      console.error("Edit Project Failed", error);
    }
  };

  const [editorData, setEditorData] = useState(null);

  const handleChanges = (data: any) => {
    setEditorData(data);
    console.log(data)
    setProjectData({
      ...projectData,
      about: JSON.stringify(data, null, 2),
    });
  };

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  useEffect(() => {}, [isLoaded, user_role]);
  if (!isLoaded) {
    return <Loading/>
  }
  if (user_role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <>
      <div>
        <Head>
          <title>Edit Project | Global shapers</title>
          <meta name="description" content="Generated by create-next-app" />
          <link rel="icon" href="/gsi-logo.png" />
        </Head>

        <div className="flex">
          <Sidebar />

          <div className="mx-auto p-10">
            <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
              EDIT PROJECT
            </div>

            <form onSubmit={() => handleSubmit(false)}>
              <div className="mb-4">
                <label htmlFor="title" className="font-medium text-gray-700">
                  Project Title
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  value={projectData.title}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="font-medium text-gray-700"
                >
                  Project Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  className="mt-1 h-56 w-full rounded-md border p-2 shadow-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="font-medium text-gray-700">
                  Featured Image
                </label>

                <CldUploadButton
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  className={`relative mt-4 grid h-72 w-72 place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                    imageUrl && "pointer-events-none"
                  }`}
                  onUpload={handleImageUpload}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>

                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      fill
                      sizes="72"
                      className="absolute inset-0 object-cover"
                      alt={projectData.title}
                    />
                  )}
                </CldUploadButton>

                {imageUrl && (
                  <button
                    onClick={removeImage}
                    className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hub"
                  className="block font-medium text-gray-700"
                >
                  Hub
                </label>

                <input
                  type="text"
                  id="hub"
                  name="hub"
                  placeholder="hub"
                  value={projectData.hub}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="font-medium text-gray-700"
                >
                  Categories
                </label>

                <CreatableSelect
                  id="long-value-select"
                  placeholder="select option"
                  instanceId="long-value-select"
                  options={categoriesOption}
                  closeMenuOnSelect={false}
                  isMulti
                  value={categoriesOption.filter((option) =>
                    projectData.category.split(",").includes(option.value),
                  )}
                  onChange={(selectedOption) => {
                    const selectedValues = selectedOption
                      ? selectedOption.map((option) => option.value)
                      : [];
                    setProjectData({
                      ...projectData,
                      category: selectedValues.join(","),
                    });
                  }}
                  className="z-20"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="font-medium text-gray-700"
                >
                  Type
                </label>

                <Select
                  id="long-value-select"
                  instanceId="long-value-select"
                  placeholder="type"
                  options={type}
                  value={type.find(
                    (option) => option.value === projectData.type,
                  )}
                  onChange={(selectedOption) => {
                    setProjectData({
                      ...projectData,
                      type: selectedOption ? selectedOption.value : "",
                    });
                  }}
                  className="z-10"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="beneficiaries"
                  className="font-medium text-gray-700"
                >
                  Beneficiaries
                </label>

                <input
                  type="text"
                  id="beneficiaries"
                  name="beneficiaries"
                  placeholder="beneficiaries"
                  value={projectData.beneficiaries}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="about" className="font-medium text-gray-700">
                  About
                </label>
              </div>
              <div></div>
              <div className="min-w-[300px]">
                <NewEditor
                  onChanges={handleChanges}
                  // initialData={editorBlocks}
                />
              </div>

              <button
                type="button"
                className="mr-2 mt-4 rounded-lg bg-gray-600 px-2 py-2 font-medium text-white hover:bg-gray-800 md:mr-4 md:px-6"
                onClick={() => {
                  handleSubmit(false); // Pass false for "Save as Draft"
                }}
              >
                Save as Draft
              </button>

              <button
                type="button"
                className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 md:px-12"
                onClick={() => {
                  handleSubmit(true); // Pass true for "Publish"
                }}
              >
                Publish
              </button>
            </form>
          </div>
        </div>
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          message="Project Edited Successfully."
          bgColor="bg-green-700"
        />
      </div>
    </>
  );
}

export default EditProject;
