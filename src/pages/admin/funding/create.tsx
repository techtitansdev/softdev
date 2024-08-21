import Head from "next/head";
import { useEffect, useState } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import { categoriesOption } from "~/data/categories";
import Select from "react-select";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import MileStoneTable, { TableRow } from "./components/MilestoneTable";
import { useUser } from "@clerk/nextjs";
import Unauthorized from "~/components/Unauthorized";
import { FundingData } from "~/types/fundingData";
import React from "react";
import UploadIcon from "~/components/svg/UploadIcon";
import { ProjectAboutData } from "~/types/projectData";
import LoadingSpinner from "~/components/LoadingSpinner";

function CreateFunding() {
  const [project, setProject] = useState("");
  const getProjects = api.project.getAllProjectTitles.useQuery();

  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [projectImageUrl, setProjectImageUrl] = useState("");
  const [objectiveImageUrl, setObjectiveImageUrl] = useState("");
  const [projectName1ImageUrl, setProjectName1ImageUrl] = useState("");
  const [projectName2ImageUrl, setProjectName2ImageUrl] = useState("");

  const transformedProjects =
    getProjects.data?.map((project) => ({
      label: project,
      value: project,
    })) || [];

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const router = useRouter();

  const [fundingData, setFundingData] = useState<FundingData>({
    title: "",
    project: "",
    description: "",
    image: "",
    hub: "",
    category: "",
    type: "",
    beneficiaries: "",
    goal: "",
    date: "",
    donors: 0,
    funds: 0,
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
    milestones: [],
  });

  const type = [
    { label: "Activity", value: "Activity" },
    { label: "Project", value: "Project" },
  ];

  const getSpecificProjects = api.project.getByTitle.useQuery({
    title: project,
  });

  useEffect(() => {
    if (getSpecificProjects.data) {
      const specificProject = getSpecificProjects.data;

      const aboutData: ProjectAboutData =
        specificProject.about[0] || ({} as ProjectAboutData);

      setFundingData((prevState) => ({
        ...prevState,
        title: specificProject.title,
        project: specificProject.title,
        description: specificProject.description,
        image: specificProject.image,
        hub: specificProject.hub,
        category: specificProject.category,
        type: specificProject.type,
        beneficiaries: specificProject.beneficiaries,
        about: {
          projectTitle: aboutData.projectTitle || "",
          projectDescription: aboutData.projectDescription || "",
          projectLink: aboutData.projectLink || "",
          projectImage: aboutData.projectImage || "",
          projectObjDescription: aboutData.projectObjDescription || "",
          projectObjImage: aboutData.projectObjImage || "",
          projectName1: aboutData.projectName1 || "",
          projectName1Description: aboutData.projectName1Description || "",
          projectName1Image: aboutData.projectName1Image || "",
          projectName2: aboutData.projectName2 || "",
          projectName2Description: aboutData.projectName2Description || "",
          projectName2Image: aboutData.projectName2Image || "",
          theme: aboutData.theme || "",
        },
        milestones: [],
        goal: "",
        date: "",
        published: specificProject.published,
      }));

      setFeaturedImageUrl(specificProject.image);
      setProjectImageUrl(aboutData.projectImage);
      setObjectiveImageUrl(aboutData.projectObjImage);
      setProjectName1ImageUrl(aboutData.projectName1Image);
      setProjectName2ImageUrl(aboutData.projectName2Image);
    }
  }, [getSpecificProjects.data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const [field, key] = name.split(".");

    if (field === "about" && key) {
      setFundingData((prevState) => ({
        ...prevState,
        about: {
          ...prevState.about,
          [key]: value,
        },
      }));
    } else {
      setFundingData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [milestoneData, setMilestoneData] = useState<TableRow[]>([
    {
      milestone: "1",
      value: 0,
      unit: "",
      description: "",
      id: undefined,
      date: new Date(),
      done: false,
      created: new Date(),
      updated: new Date(),
      fundraiserId: "",
    },
  ]);

  const handleMilestoneDataChange = (data: TableRow[]) => {
    const updatedData = data.map((item) => ({
      ...item,
      value:
        typeof item.value === "string" ? parseFloat(item.value) : item.value,
    }));
    setMilestoneData(updatedData);
    console.log("updated data", updatedData);
  };

  const createFundRaiser = api.fundraiser.create.useMutation();

  const validateFields = (): string[] => {
    const errors: string[] = [];

    // Validate Select Project, Funding Goal, and Target Date
    if (!fundingData.project.trim()) errors.push("Select Project is required.");
    if (!fundingData.goal) errors.push("Funding Goal is required.");
    if (!fundingData.date) errors.push("Target Date is required.");

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    publish: boolean,
  ) => {
    e.preventDefault();

    const errors = validateFields();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {
      const fundraiserResult = await createFundRaiser.mutateAsync({
        goal: parseFloat(fundingData.goal),
        targetDate: new Date(fundingData.date),
        projectId: getSpecificProjects.data?.id ?? "",
        funds: 0,
        donors: 0,
        milestones: milestoneData,
        published: publish,
      });

      setSuccessModalOpen(true);

      setTimeout(() => {
        router.push("/admin/funding");
      }, 2000);

      console.log("Project created:", fundraiserResult);
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
        <title>Create Funding | Global shapers</title>x``
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <div className="flex">
        <Sidebar />

        <div className="mx-auto p-10 md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1250px]">
          <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
            CREATE FUNDING
          </div>

          <form>
            <div className="mb-4">
              <label htmlFor="categories" className="font-medium text-gray-700">
                Select a Project
              </label>

              <Select
                options={transformedProjects}
                value={transformedProjects.find(
                  (option) => option.value === fundingData.category,
                )}
                onChange={(selectedOption) => {
                  setFundingData({
                    ...fundingData,
                  });
                  setProject(selectedOption ? selectedOption.value : "");
                }}
                className="z-20"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="font-medium text-gray-700">
                Fundraiser Title
              </label>

              <input
                type="text"
                value={fundingData.title}
                className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="font-medium text-gray-700"
              >
                Fundraiser Description
              </label>
              <textarea
                value={fundingData.description}
                className="mt-1 h-56 w-full rounded-md border p-2 shadow-sm outline-none"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="font-medium text-gray-700">
                Featured Image
              </label>

              <CldUploadButton
                className={`relative mt-4 grid h-72 w-72 place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                  featuredImageUrl && "pointer-events-none"
                }`}
              >
                <UploadIcon />
                {featuredImageUrl && (
                  <Image
                    src={featuredImageUrl}
                    fill
                    sizes="72"
                    className="absolute inset-0 object-cover"
                    alt={fundingData.title}
                  />
                )}
              </CldUploadButton>
            </div>

            <div className="mb-4">
              <label htmlFor="hub" className="block font-medium text-gray-700">
                Hub
              </label>

              <input
                type="text"
                value={fundingData.hub}
                className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label htmlFor="categories" className="font-medium text-gray-700">
                Categories
              </label>

              <Select
                value={categoriesOption.filter((option) =>
                  fundingData.category.split(",").includes(option.value),
                )}
                className="z-20"
                isDisabled={true}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="categories" className="font-medium text-gray-700">
                Type
              </label>

              <Select
                options={type}
                value={type.find((option) => option.value === fundingData.type)}
                className="z-10"
                isDisabled={true}
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
                value={fundingData.beneficiaries}
                className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
                readOnly
              />
            </div>

            <div className="mb-2 mt-12 text-xl">Fundraiser Page View</div>
            <div className="flex items-center justify-between">
              <div className="">
                <div className="">
                  <input
                    placeholder="Project Title"
                    maxLength={40}
                    value={fundingData.about.projectTitle}
                    className="text-bold mb-1 mt-1 h-12 w-[530px] rounded-md border p-2 text-lg shadow-sm outline-none"
                    readOnly
                  />
                </div>
                <div className="">
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    placeholder="Project Description"
                    value={fundingData.about.projectDescription}
                    maxLength={500}
                    className="mt-1 h-60 w-[530px] rounded-md border p-2 shadow-sm outline-none"
                    readOnly
                  />
                </div>
                Connect with us:
                <input
                  placeholder="Project Link"
                  type="text"
                  value={fundingData.about.projectLink}
                  className="ml-2 mt-1 w-[400px] rounded-md border p-2 shadow-sm outline-none"
                  readOnly
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
                >
                  <UploadIcon />
                  {projectImageUrl && (
                    <Image
                      src={projectImageUrl}
                      fill
                      sizes="72"
                      className="absolute inset-0 object-cover"
                      alt={"aboutData.projectTitle"}
                    />
                  )}
                </CldUploadButton>
              </div>
            </div>

            <div className="mt-16 text-center text-2xl font-medium">
              Project Objectives
            </div>

            <div className="flex items-center justify-center">
              <textarea
                placeholder="Project Objectives Description"
                maxLength={210}
                value={fundingData.about.projectObjDescription}
                className="mt-1 w-[950px]  rounded-md border p-2 text-center shadow-sm outline-none"
                readOnly
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <CldUploadButton
                className={`relative mt-8 grid h-[380px] w-[1250px] place-items-center justify-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                  objectiveImageUrl && "pointer-events-none"
                }`}
              >
                <UploadIcon />
                {objectiveImageUrl && (
                  <Image
                    src={objectiveImageUrl}
                    fill
                    sizes="72"
                    className="absolute inset-0 object-cover"
                    alt={"aboutData.projectTitle"}
                  />
                )}
              </CldUploadButton>
            </div>

            <div className="flex items-center justify-between">
              <div className="">
                <div className="">
                  <input
                    placeholder="Example Project Name"
                    type="text"
                    maxLength={30}
                    value={fundingData.about.projectName1}
                    className="text-bold mb-1 mt-12 h-12 w-[550px]  rounded-md border p-2 text-center text-lg shadow-sm outline-none"
                    readOnly
                  />
                </div>

                <div className="">
                  <textarea
                    placeholder="Small Description"
                    maxLength={100}
                    value={fundingData.about.projectName1Description}
                    onChange={handleChange}
                    className="mb-1 mt-1 h-12 w-[550px]  rounded-md border p-2 text-center shadow-sm outline-none"
                    required
                  />
                </div>

                <CldUploadButton
                  className={`relative mt-4 grid h-[550px] w-[560px] place-items-center justify-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                    projectName1ImageUrl && "pointer-events-none"
                  }`}
                >
                  <UploadIcon />
                  {projectName1ImageUrl && (
                    <Image
                      src={projectName1ImageUrl}
                      fill
                      sizes="72"
                      className="absolute inset-0 object-cover"
                      alt={"projectData.title"}
                    />
                  )}
                </CldUploadButton>
              </div>

              <div className="flex items-center justify-center">
                <div className="">
                  <div className="">
                    <input
                      placeholder="Example Project Name"
                      type="text"
                      maxLength={30}
                      value={fundingData.about.projectName2}
                      onChange={handleChange}
                      className="text-bold mb-1 mt-12 h-12 w-[550px]  rounded-md border p-2 text-center text-lg shadow-sm outline-none"
                      required
                    />
                  </div>

                  <div className="">
                    <input
                      placeholder="Small Description"
                      type="text"
                      maxLength={100}
                      value={fundingData.about.projectName2Description}
                      onChange={handleChange}
                      className="mb-1 mt-1 h-12 w-[550px]  rounded-md border p-2 text-center shadow-sm outline-none"
                      required
                    />
                  </div>

                  <CldUploadButton
                    className={`relative mt-4 grid h-[560px] w-[560px] place-items-center justify-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
                      projectName2ImageUrl && "pointer-events-none"
                    }`}
                  >
                    <UploadIcon />
                    {projectName2ImageUrl && (
                      <Image
                        src={projectName2ImageUrl}
                        fill
                        sizes="72"
                        className="absolute inset-0 object-cover"
                        alt={"projectData.title"}
                      />
                    )}
                  </CldUploadButton>
                </div>
              </div>
            </div>

            <div className="mt-6 text-lg">Color Theme </div>
            <div>
              <input
                className="h-10 w-40"
                type="color"
                value={fundingData.about.theme}
                disabled
              />
            </div>

            <div className="mb-2 mt-8">
              <label htmlFor="milestones" className="font-medium text-gray-700">
                Milestones
              </label>

              <MileStoneTable
                onRowDataChange={handleMilestoneDataChange}
                existingMilestone={milestoneData}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="funding" className="font-medium text-gray-700">
                Funding Goal
              </label>

              <input
                type="text"
                id="goal"
                name="goal"
                value={fundingData.goal}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    /^\d*$/.test(value) &&
                    (value === "" || parseInt(value) >= 1)
                  ) {
                    setFundingData({ ...fundingData, goal: value });
                  }
                }}
                className="mt-1 w-full rounded-md border p-2 shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="font-medium text-gray-700">
                Target Date
              </label>

              <input
                type="date"
                id="date"
                name="date"
                value={fundingData.date}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border p-2 shadow-sm"
                required
              />
            </div>

            <button
              type="button"
              className="mr-2 mt-4 rounded-lg bg-gray-600 px-2 py-2 font-medium text-white hover:bg-gray-800 md:mr-4 md:px-6"
              onClick={(e) => handleSubmit(e as any, false)} // Save as Draft
            >
              Save as Draft
            </button>

            <button
              type="button"
              className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 md:px-12"
              onClick={(e) => handleSubmit(e as any, true)} // Publish
            >
              Publish
            </button>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message="Funding Created Successfully."
        bgColor="bg-green-700"
      />
    </div>
  );
}

export default CreateFunding;
