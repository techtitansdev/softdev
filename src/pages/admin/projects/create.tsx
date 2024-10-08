import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import Select from "react-select";
import { ProjectAboutData, ProjectData } from "~/types/projectData";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";
import { categoriesOption } from "~/data/categories";
import { useUser } from "@clerk/nextjs";
import Unauthorized from "~/components/Unauthorized";
import UploadIcon from "~/components/svg/UploadIcon";
import React from "react";
import LoadingSpinner from "~/components/LoadingSpinner";

interface Category {
  label: string;
  value: string;
}

function CreateProjects() {
  const createProject = api.project.createProject.useMutation();
  const allcategory = api.categories.getAllCategories.useQuery();
  const createCategory = api.categories.create.useMutation();
  const [newcategory, setNewCategory] = useState<Category[]>([]);
  const router = useRouter();

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const [featuredImageUrl, setImageUrl] = useState("");
  const [featuredImagePublicId, setPublicId] = useState("");

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

  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    image: "",
    imageId: "",
    hub: "",
    category: "",
    type: "",
    beneficiaries: "",
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
    published: false,
    featured: false,
  });

  const [aboutData, setAboutData] = useState<ProjectAboutData>({
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
  });

  useEffect(() => {
    setProjectData({
      ...projectData,
      about: aboutData,
    });
  }, [aboutData]);

  const addNewCategory = (input: string) => {
    const newCategories = input.split(",").map((category) => category.trim());

    newCategories.forEach((newCategory) => {
      const existsInCategoriesOption = categoriesOption.some(
        (category) =>
          category.value.toLowerCase() === newCategory.toLowerCase(),
      );

      const existsInNewCategory = newcategory.some(
        (category) =>
          category.value.toLowerCase() === newCategory.toLowerCase(),
      );

      if (
        !existsInCategoriesOption &&
        !existsInNewCategory &&
        newCategory.trim() !== ""
      ) {
        setNewCategory((prevNewCategory) => [
          ...prevNewCategory,
          { label: newCategory, value: newCategory },
        ]);
      }
    });
  };

  const type = [
    { label: "Activity", value: "Activity" },
    { label: "Project", value: "Project" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name in projectData) {
      setProjectData({ ...projectData, [name]: value });

      // Auto-fill the aboutData fields
      if (name === "title") {
        setAboutData((prevAboutData) => ({
          ...prevAboutData,
          projectTitle: value,
        }));
      } else if (name === "description") {
        setAboutData((prevAboutData) => ({
          ...prevAboutData,
          projectDescription: value,
        }));
      }
    } else if (name in aboutData) {
      // Update aboutData state
      setAboutData({ ...aboutData, [name]: value });
    }
  };

  const handleImageUpload = (result: CldUploadWidgetResults, type: string) => {
    console.log("result: ", result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;

      switch (type) {
        case "featured":
          setImageUrl(url);
          setPublicId(public_id);

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
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const removeImage = async (
    e: React.MouseEvent<HTMLButtonElement>,
    imageType: string,
    publicId: string,
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/deleteImage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (response.ok) {
        switch (imageType) {
          case "featured":
            setImageUrl("");
            setPublicId("");
            break;
          case "project":
            setProjectImageUrl("");
            setProjectImagePublicId("");
            break;
          case "objective":
            setObjectiveImageUrl("");
            setObjectiveImagePublicId("");
            break;
          case "name1":
            setProjectName1ImageUrl("");
            setProjectName1ImagePublicId("");
            break;
          case "name2":
            setProjectName2ImageUrl("");
            setProjectName2ImagePublicId("");
            break;
          default:
            console.error("Unknown image type");
        }
      } else {
        const errorData = await response.json();
        console.error("Error removing image:", errorData.error);
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const validateFields = (): string[] => {
    const errors: string[] = [];

    // Validate Project Data
    if (!projectData.title.trim()) errors.push("Project Title is required.");
    if (!projectData.description.trim())
      errors.push("Project Description is required.");
    if (!projectData.hub.trim()) errors.push("Hub is required.");
    if (!projectData.category.trim()) errors.push("Category is required.");
    if (!projectData.type.trim()) errors.push("Type is required.");
    if (!projectData.beneficiaries.trim())
      errors.push("Beneficiaries are required.");

    // Validate About Data
    if (!aboutData.projectTitle.trim())
      errors.push("Project Title (Design) is required.");
    if (!aboutData.projectDescription.trim())
      errors.push("Project Description (Design) is required.");
    if (!projectData.about.projectLink.trim())
      errors.push("Project Link (Design) is required.");
    if (!aboutData.projectObjDescription.trim())
      errors.push("Project Objectives Description is required.");

    // Validate Images
    if (!featuredImageUrl.trim()) errors.push("Featured Image is required.");
    if (!projectImageUrl.trim()) errors.push("Project Image is required.");
    if (!objectiveImageUrl.trim()) errors.push("Objective Image is required.");

    return errors;
  };

  const handleSubmit = async (isPublished: boolean) => {
    const errors = validateFields();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {
      if (newcategory.length > 0) {
        await Promise.all(
          newcategory.map(async (category) => {
            await createCategory.mutateAsync({
              label: category.label,
              value: category.value,
            });
          }),
        );
      }

      const result = await createProject.mutateAsync({
        ...projectData,
        about: {
          ...projectData.about,
          projectObjImage: objectiveImageUrl,
          projectImage: projectImageUrl,
          projectName1Image: projectName1ImageUrl,
          projectName2Image: projectName2ImageUrl,
          projectImageId: projectImagePublicId,
          objectiveImageId: objectiveImagePublicId,
          projectName1ImageId: projectName1ImagePublicId,
          projectName2ImageId: projectName2ImagePublicId,
        },
        image: featuredImageUrl,
        imageId: featuredImagePublicId,
        published: isPublished,
        featured: false,
      });

      console.log("Project created:", result);

      setSuccessModalOpen(true);

      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const { user, isLoaded } = useUser();
  const user_role = user?.publicMetadata.admin;

  useEffect(() => {}, [isLoaded, user_role]);
  if (!isLoaded) {
    return <LoadingSpinner />;
  }
  if (user_role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <div>
      <Head>
        <title>Create Project | Global shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto p-10 md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1250px]">
          <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
            CREATE PROJECT
          </div>

          <form>
            <div className="mb-4">
              <label htmlFor="image" className="font-medium text-gray-700">
                Card Image
              </label>

              <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
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

              {featuredImagePublicId && (
                <button
                  onClick={(e) =>
                    removeImage(e, "featured", featuredImagePublicId)
                  }
                  className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                >
                  Remove Image
                </button>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="font-medium text-gray-700">
                Card Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={projectData.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="font-medium text-gray-700"
              >
                Card Excerpt
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
              <label htmlFor="hub" className="block font-medium text-gray-700">
                Hub
              </label>

              <input
                type="text"
                id="hub"
                name="hub"
                placeholder="Iloilo Hub"
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
                data-testid="category-select"
              >
                Categories
              </label>

              <CreatableSelect
                options={allcategory.data}
                placeholder="select option"
                isMulti
                value={categoriesOption.find(
                  (option) => option.value === projectData.category,
                )}
                onChange={(selectedOption) => {
                  const selectedValues = selectedOption
                    ? selectedOption.map((option) => option.value)
                    : [];
                  setProjectData({
                    ...projectData,
                    category: selectedValues.join(","),
                  });
                  addNewCategory(selectedValues.join(","));
                }}
                className="z-20"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="font-medium text-gray-700">
                Type
              </label>

              <Select
                options={type}
                value={type.find((option) => option.value === projectData.type)}
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
                value={projectData.beneficiaries}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-400 p-2 outline-gray-400"
                required
              />
            </div>

            <div className="mb-2 mt-12 text-xl">Project Page View </div>
            <div className="flex items-center justify-between">
              <div className="">
                <div className="">
                  <input
                    placeholder="Project Title"
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    maxLength={1000}
                    value={aboutData.projectTitle}
                    onChange={handleChange}
                    className="text-bold mb-1 mt-1 h-12 w-[530px] rounded-md border border-gray-400 p-2 text-lg font-medium outline-gray-400"
                    required
                  />
                </div>
                <div className="">
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    placeholder="Project Description"
                    value={aboutData.projectDescription}
                    maxLength={1000}
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
                  name="projectLink"
                  value={aboutData.projectLink}
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
                      alt={aboutData.projectTitle}
                    />
                  )}
                </CldUploadButton>

                {projectImagePublicId && (
                  <button
                    onClick={(e) =>
                      removeImage(e, "project", projectImagePublicId)
                    }
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
                name="projectObjDescription"
                placeholder="Project Objectives Description"
                maxLength={1000}
                value={aboutData.projectObjDescription}
                onChange={handleChange}
                className="mt-1 w-[950px] rounded-md border border-gray-400 p-2 text-center outline-gray-400"
                required
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
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
                    alt={aboutData.projectTitle}
                  />
                )}
              </CldUploadButton>
              {objectiveImagePublicId && (
                <button
                  onClick={(e) =>
                    removeImage(e, "objective", objectiveImagePublicId)
                  }
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
                    placeholder="Example Event"
                    type="text"
                    id="projectName1"
                    name="projectName1"
                    maxLength={500}
                    value={aboutData.projectName1}
                    onChange={handleChange}
                    className="text-bold mb-1 mt-12 h-12 w-[550px] rounded-md border border-gray-400 p-2 text-center text-lg font-medium outline-gray-400"
                    required
                  />
                </div>

                <div className="">
                  <textarea
                    placeholder="Small Description"
                    id="projectName1Description"
                    name="projectName1Description"
                    maxLength={500}
                    value={aboutData.projectName1Description}
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
                {projectName1ImagePublicId && (
                  <button
                    onClick={(e) =>
                      removeImage(e, "name1", projectName1ImagePublicId)
                    }
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
                      placeholder="Example Event"
                      type="text"
                      id="projectName2"
                      name="projectName2"
                      maxLength={500}
                      value={aboutData.projectName2}
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
                      name="projectName2Description"
                      maxLength={500}
                      value={aboutData.projectName2Description}
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
                  {projectName2ImagePublicId && (
                    <button
                      onClick={(e) =>
                        removeImage(e, "name2", projectName2ImagePublicId)
                      }
                      className="mb-4 mt-2 w-fit rounded-md bg-red-600 px-2 py-1 font-bold text-white hover:bg-red-700"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 text-lg">Color Theme </div>
            <div>
              <input
                className="h-12 w-44"
                type="color"
                value={aboutData.theme}
                onChange={(e) =>
                  setAboutData({ ...aboutData, theme: e.target.value })
                }
              />
            </div>

            <button
              type="button"
              onClick={() => handleSubmit(false)} // Save as Draft
              className="mr-2 mt-4 rounded-lg bg-gray-600 px-2 py-2 font-medium text-white hover:bg-gray-800 md:mr-4 md:px-6"
            >
              Save as Draft
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)} // Publish
              className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 md:px-12"
            >
              Publish
            </button>
          </form>
        </div>

        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          message="Project Created Successfully."
          bgColor="bg-green-700"
        />
      </div>
    </div>
  );
}

export default CreateProjects;
