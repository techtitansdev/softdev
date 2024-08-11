import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import Select from "react-select";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";
import UploadIcon from "~/components/svg/UploadIcon";

interface ProjectAbout {
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
  projectImage: string;
  projectObjDescription: string;
  projectObjImage: string;
  projectName1: string;
  projectName1Description: string;
  projectName1Image: string;
  projectName2: string;
  projectName2Description: string;
  projectName2Image: string;
  theme: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  hub: string;
  category: string;
  type: string;
  beneficiaries: string;
  published: boolean;
  featured: boolean;
  about: ProjectAbout;
}

function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [featuredImagePublicId, setFeaturedImagePublicId] = useState("");

  const [projectImageUrl, setProjectImageUrl] = useState("");
  const [projectImagePublicId, setProjectImagePublicId] = useState("");

  const [objectiveImageUrl, setObjectiveImageUrl] = useState("");
  const [objectiveImagePublicId, setObjectiveImagePublicId] = useState("");

  const [projectName1ImageUrl, setProjectName1ImageUrl] = useState("");
  const [projectName1ImagePublicId, setProjectName1ImagePublicId] =
    useState("");

  const [projectName2ImageUrl, setProjectName2ImageUrl] = useState("");
  const [projectName2ImagePublicId, setProjectName2ImagePublicId] =
    useState("");

  const deleteImage = api.project.removeImage.useMutation();

  const getProject = api.project.getById.useQuery({ id: id as string });

  const categories = api.categories.getAllCategories.useQuery();
  const categoriesOption = categories.data || [];
  categoriesOption.sort((a, b) => a.label.localeCompare(b.label));

  const editProject = api.project.editProject.useMutation({
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
    id: "",
    title: "",
    description: "",
    image: "",
    hub: "",
    category: "",
    type: "",
    beneficiaries: "",
    published: false,
    featured: false,
    about: {
      projectTitle: "",
      projectDescription: "",
      projectLink: "",
      projectImage: "",
      projectObjDescription: "",
      projectObjImage: "",
      projectName1: "",
      projectName1Description: "",
      projectName1Image: "",
      projectName2: "",
      projectName2Description: "",
      projectName2Image: "",
      theme: "",
    },
  });

  useEffect(() => {
    if (getProject.data) {
      const data = Array.isArray(getProject.data)
        ? getProject.data[0]
        : getProject.data;
      const aboutData = Array.isArray(data.about) ? data.about[0] : data.about;

      setProjectData({
        ...data,
        about: aboutData,
      });
      setFeaturedImageUrl(data.image);
      setFeaturedImagePublicId(data.image);
      setProjectImageUrl(aboutData.projectImage);
      setObjectiveImageUrl(aboutData.projectObjImage);
      setProjectName1ImageUrl(aboutData.projectName1Image);
      setProjectName2ImageUrl(aboutData.projectName2Image);
    }
  }, [getProject.data]);

  const type = [
    { label: "Activity", value: "Activity" },
    { label: "Project", value: "Project" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("about.")) {
      const aboutField = name.substring("about.".length) as keyof ProjectAbout;
      setProjectData((prevData) => ({
        ...prevData,
        about: {
          ...prevData.about,
          [aboutField]: value,
        },
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (result: CldUploadWidgetResults, type: string) => {
    const info = result.info as { secure_url?: string; public_id?: string };

    if (info.secure_url && info.public_id) {
      const url = info.secure_url;
      const public_id = info.public_id;

      switch (type) {
        case "featured":
          setFeaturedImageUrl(url);
          setFeaturedImagePublicId(public_id);
          break;
        case "project":
          setProjectImageUrl(url);
          setProjectImagePublicId(public_id);
          break;
        case "objective":
          setObjectiveImageUrl(url);
          setObjectiveImagePublicId(public_id);
          break;
        case "name1":
          setProjectName1ImageUrl(url);
          setProjectName1ImagePublicId(public_id);
          break;
        case "name2":
          setProjectName2ImageUrl(url);
          setProjectName2ImagePublicId(public_id);
          break;
        default:
          break;
      }
    }
  };

  const removeImage = async (e: React.FormEvent, type: string) => {
    e.preventDefault();

    try {
      await deleteImage.mutateAsync({
        id: id as string,
      });

      switch (type) {
        case "featured":
          setFeaturedImageUrl("");
          setProjectData((prevData) => ({
            ...prevData,
            image: "",
          }));
          break;
        case "project":
          setProjectImageUrl("");
          setProjectData((prevData) => ({
            ...prevData,
            about: {
              ...prevData.about,
              projectImage: "",
            },
          }));
          break;
        case "objective":
          setObjectiveImageUrl("");
          setProjectData((prevData) => ({
            ...prevData,
            about: {
              ...prevData.about,
              projectObjImage: "",
            },
          }));
          break;
        case "name1":
          setProjectName1ImageUrl("");
          setProjectData((prevData) => ({
            ...prevData,
            about: {
              ...prevData.about,
              projectName1Image: "",
            },
          }));
          break;
        case "name2":
          setProjectName2ImageUrl("");
          setProjectData((prevData) => ({
            ...prevData,
            about: {
              ...prevData.about,
              projectName2Image: "",
            },
          }));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleSubmit = async (isPublished: boolean) => {
    const data: ProjectData = {
      ...projectData,
      id: id as string,
      image: featuredImageUrl,
      published: isPublished,
      featured: false,
      about: {
        ...projectData.about,
        projectImage: projectImageUrl,
        projectObjImage: objectiveImageUrl,
        projectName1Image: projectName1ImageUrl,
        projectName2Image: projectName2ImageUrl,
      },
    };

    try {
      await editProject.mutateAsync(data);
      setSuccessModalOpen(true);
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (error) {
      console.error("Edit Project Failed", error);
    }
  };

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  useEffect(() => {}, [isLoaded, user_role]);
  if (!isLoaded) {
    return <Loading />;
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

          <div className="mx-auto p-10 md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1250px]">
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
                  className="mt-1 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
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
                  className="mt-1 h-56 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
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
                    featuredImageUrl && "pointer-events-none"
                  }`}
                  onUpload={(result) => handleImageUpload(result, "featured")}
                >
                  <UploadIcon />

                  {featuredImageUrl && (
                    <Image
                      src={featuredImageUrl}
                      fill
                      sizes="72"
                      className="absolute inset-0 object-cover"
                      alt={projectData.title}
                    />
                  )}
                </CldUploadButton>

                {featuredImageUrl && (
                  <button
                    onClick={(e) => removeImage(e, "featured")}
                    className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
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
                  className="mt-1 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
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
                  className="mt-1 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
                  required
                />
              </div>

              <div className="mb-2 mt-12 text-xl">Project Design</div>
              <div className="flex items-center justify-between">
                <div className="">
                  <div className="">
                    <input
                      placeholder="Project Title"
                      type="text"
                      id="projectTitle"
                      name="about.projectTitle"
                      maxLength={40}
                      value={projectData.about.projectTitle}
                      onChange={handleChange}
                      className="text-bold mb-1 mt-1 h-12 w-[530px] rounded-md border border-gray-400 p-2 text-lg font-medium outline-gray-400"
                      required
                    />
                  </div>
                  <div className="">
                    <textarea
                      id="projectDescription"
                      name="about.projectDescription"
                      placeholder="Project Description"
                      value={projectData.about.projectDescription}
                      maxLength={500}
                      onChange={handleChange}
                      className="mt-1 h-60 w-[530px] rounded-md border border-gray-400 p-2 text-base outline-gray-400"
                      required
                    />
                  </div>
                  Connect with us:
                  <input
                    placeholder="Project Link"
                    type="text"
                    id="projectLink"
                    name="about.projectLink"
                    value={projectData.about.projectLink}
                    onChange={handleChange}
                    className="ml-2 mt-1 w-[400px] rounded-md border border-gray-400 p-2 text-base outline-gray-400"
                  />
                </div>

                <div>
                  <CldUploadButton
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                    className={`relative grid h-[355px] w-[530px] place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                      projectImageUrl && "pointer-events-none"
                    }`}
                    onUpload={(result) => handleImageUpload(result, "project")}
                  >
                    <UploadIcon />
                    {projectImageUrl && (
                      <Image
                        src={projectImageUrl}
                        fill
                        sizes="72"
                        className="absolute inset-0 object-cover"
                        alt={projectData.about.projectTitle}
                      />
                    )}
                  </CldUploadButton>

                  {projectImageUrl && (
                    <button
                      onClick={(e) => removeImage(e, "project")}
                      className=" mt-1 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-16 text-center text-2xl font-medium">
                Project Objectives
              </div>

              <div className="flex items-center justify-center">
                <textarea
                  id="projectObjDescription"
                  name="about.projectObjDescription"
                  placeholder="Project Objectives Description"
                  maxLength={210}
                  value={projectData.about.projectObjDescription}
                  onChange={handleChange}
                  className="mt-1 w-[950px] rounded-md border border-gray-400 p-2 text-center outline-gray-400"
                  required
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                <CldUploadButton
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  className={`relative mt-8 grid h-[380px] w-[1250px] place-items-center justify-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                    objectiveImageUrl && "pointer-events-none"
                  }`}
                  onUpload={(result) => handleImageUpload(result, "objective")}
                >
                  <UploadIcon />
                  {objectiveImageUrl && (
                    <Image
                      src={objectiveImageUrl}
                      fill
                      sizes="72"
                      className="absolute inset-0 object-cover"
                      alt={projectData.about.projectTitle}
                    />
                  )}
                </CldUploadButton>
                {objectiveImageUrl && (
                  <button
                    onClick={(e) => removeImage(e, "objective")}
                    className="mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="">
                  <div className="">
                    <input
                      placeholder="Example Project Name"
                      type="text"
                      id="projectName1"
                      name="about.projectName1"
                      maxLength={30}
                      value={projectData.about.projectName1}
                      onChange={handleChange}
                      className="text-bold mb-1 mt-12 h-12 w-[550px] rounded-md border border-gray-400 p-2 text-center text-lg font-medium outline-gray-400"
                      required
                    />
                  </div>

                  <div className="">
                    <textarea
                      placeholder="Small Description"
                      id="projectName1Description"
                      name="about.projectName1Description"
                      maxLength={100}
                      value={projectData.about.projectName1Description}
                      onChange={handleChange}
                      className="mb-1 mt-1 h-12 w-[550px] rounded-md border border-gray-400 p-2 text-center text-base font-medium outline-gray-400"
                      required
                    />
                  </div>

                  <CldUploadButton
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                    className={`relative mt-4 grid h-[550px] w-[560px] place-items-center justify-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                      projectName1ImageUrl && "pointer-events-none"
                    }`}
                    onUpload={(result) => handleImageUpload(result, "name1")}
                  >
                    <UploadIcon />
                    {projectName1ImageUrl && (
                      <Image
                        src={projectName1ImageUrl}
                        fill
                        sizes="72"
                        className="absolute inset-0 object-cover"
                        alt={projectData.title}
                      />
                    )}
                  </CldUploadButton>
                  {projectImageUrl && (
                    <button
                      onClick={(e) => removeImage(e, "name1")}
                      className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                    >
                      Remove Image
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <div className="">
                    <div className="">
                      <input
                        placeholder="Example Project Name"
                        type="text"
                        id="projectName2"
                        name="about.projectName2"
                        maxLength={30}
                        value={projectData.about.projectName2}
                        onChange={handleChange}
                        className="text-bold mb-1 mt-12 h-12 w-[550px] rounded-md border border-gray-400 p-2 text-center text-lg font-medium outline-gray-400"
                        required
                      />
                    </div>

                    <div className="">
                      <input
                        placeholder="Small Description"
                        type="text"
                        id="projectName2Description"
                        name="about.projectName2Description"
                        maxLength={100}
                        value={projectData.about.projectName2Description}
                        onChange={handleChange}
                        className="mb-1 mt-1 h-12 w-[550px] rounded-md border border-gray-400 p-2 text-center text-base font-medium outline-gray-400"
                        required
                      />
                    </div>

                    <CldUploadButton
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                      }
                      className={`relative mt-4 grid h-[560px] w-[560px] place-items-center justify-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                        projectName2ImageUrl && "pointer-events-none"
                      }`}
                      onUpload={(result) => handleImageUpload(result, "name2")}
                    >
                      <UploadIcon />
                      {projectName2ImageUrl && (
                        <Image
                          src={projectName2ImageUrl}
                          fill
                          sizes="72"
                          className="absolute inset-0 object-cover"
                          alt={projectData.title}
                        />
                      )}
                    </CldUploadButton>
                    {projectName2ImageUrl && (
                      <button
                        onClick={(e) => removeImage(e, "name2")}
                        className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-lg">Color Theme</div>
              <div>
                <input
                  className="h-12 w-44"
                  type="color"
                  id="theme"
                  value={projectData.about.theme}
                  onChange={(e) =>
                    setProjectData((prevData) => ({
                      ...prevData,
                      about: {
                        ...prevData.about,
                        theme: e.target.value,
                      },
                    }))
                  }
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
