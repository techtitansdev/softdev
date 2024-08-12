import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import { categoriesOption } from "~/data/categories";
import Select from "react-select";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import { FundingData } from "~/types/fundingData";
import MileStoneTableEdit from "../../components/MilestoneTableEdit";
import React from "react";
import UploadIcon from "~/components/svg/UploadIcon";

function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [projectImageUrl, setProjectImageUrl] = useState("");
  const [objectiveImageUrl, setObjectiveImageUrl] = useState("");
  const [projectName1ImageUrl, setProjectName1ImageUrl] = useState("");
  const [projectName2ImageUrl, setProjectName2ImageUrl] = useState("");

  const getProject = api.fundraiser.getById.useQuery(
    { id: id as string },
    { enabled: !!id },
  );

  const editProject = api.fundraiser.edit.useMutation({
    onSuccess: () => {
      setSuccessModalOpen(true);
      setTimeout(() => {
        router.push("/admin/funding");
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Edit Project Failed", error);
    },
  });

  const [projectData, setProjectData] = useState<FundingData>({
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
    milestones: [],
    published: false,
  });

  type TableRow = {
    id: string | undefined;
    milestone: string;
    value: number;
    unit: string;
    description: string;
    created: Date;
    updated: Date;
    fundraiserId: string;
    date: Date | null;
    done: boolean;
  };

  useEffect(() => {
    if (getProject.data) {
      const { project, milestones } = getProject.data;

      // Ensure aboutData is not undefined and has properties
      const aboutData =
        project.about && project.about.length > 0 ? project.about[0] : {};

      setProjectData((prevData) => ({
        ...prevData,
        title: project.title || prevData.title,
        project: project.title || prevData.project,
        description: project.description || prevData.description,
        image: project.image || prevData.image,
        hub: project.hub || prevData.hub,
        category: project.category || prevData.category,
        type: project.type || prevData.type,
        beneficiaries: project.beneficiaries || prevData.beneficiaries,
        goal: getProject.data.goal?.toString() || prevData.goal,
        date: getProject.data.targetDate?.toString() || prevData.date,
        milestones: milestones || prevData.milestones,
        published: project.published || prevData.published,
        about: {
          projectTitle:
            (aboutData as any)?.projectTitle ||
            prevData.about?.projectTitle ||
            "",
          projectDescription:
            (aboutData as any)?.projectDescription ||
            prevData.about?.projectDescription ||
            "",
          projectLink:
            (aboutData as any)?.projectLink ||
            prevData.about?.projectLink ||
            "",
          projectImage:
            (aboutData as any)?.projectImage ||
            prevData.about?.projectImage ||
            "",
          projectObjDescription:
            (aboutData as any)?.projectObjDescription ||
            prevData.about?.projectObjDescription ||
            "",
          projectObjImage:
            (aboutData as any)?.projectObjImage ||
            prevData.about?.projectObjImage ||
            "",
          projectName1:
            (aboutData as any)?.projectName1 ||
            prevData.about?.projectName1 ||
            "",
          projectName1Description:
            (aboutData as any)?.projectName1Description ||
            prevData.about?.projectName1Description ||
            "",
          projectName1Image:
            (aboutData as any)?.projectName1Image ||
            prevData.about?.projectName1Image ||
            "",
          projectName2:
            (aboutData as any)?.projectName2 ||
            prevData.about?.projectName2 ||
            "",
          projectName2Description:
            (aboutData as any)?.projectName2Description ||
            prevData.about?.projectName2Description ||
            "",
          projectName2Image:
            (aboutData as any)?.projectName2Image ||
            prevData.about?.projectName2Image ||
            "",
          theme: (aboutData as any)?.theme || prevData.about?.theme || "",
        },
      }));

      // Setting URLs for images
      setFeaturedImageUrl(project.image || "");
      setProjectImageUrl((aboutData as any)?.projectImage || "");
      setObjectiveImageUrl((aboutData as any)?.projectObjImage || "");
      setProjectName1ImageUrl((aboutData as any)?.projectName1Image || "");
      setProjectName2ImageUrl((aboutData as any)?.projectName2Image || "");

      // Transforming and setting milestones
      const transformedMilestones = milestones.map((milestone) => ({
        ...milestone,
        date: new Date(milestone.date),
        done: milestone.done,
      }));

      setMilestoneData(transformedMilestones);
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
    if (name === "goal") {
      setProjectData({
        ...projectData,
        [name]: parseInt(value, 10).toString(),
      });
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const [milestoneData, setMilestoneData] = useState<TableRow[]>([
    {
      milestone: "1",
      value: 100,
      unit: "2",
      description: "this is description",
      id: undefined,
      date: new Date(),
      done: false,
      created: new Date(),
      updated: new Date(),
      fundraiserId: "",
    },
  ]);

  const getObjectsWithoutIdAndConvertValue = (data: any[]) => {
    return data.map((item) => {
      const { id, ...rest } = item;
      return { ...rest, value: Number(item.value) };
    });
  };

  const dataWithoutIdAndConvertedValue =
    getObjectsWithoutIdAndConvertValue(milestoneData);

  const handleMilestoneDataChange = (data: TableRow[]) => {
    setMilestoneData(data);
  };

  const dateObject = new Date(projectData.date);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  const convertedDate = `${year}-${month}-${day}`;

  const handleSubmit = async (e: React.FormEvent, isPublished: boolean) => {
    e.preventDefault();
    editProject.mutate({
      ...projectData,
      id: id as string,
      goal: parseInt(projectData.goal, 10),
      donors: 0,
      targetDate: new Date(projectData.date),
      funds: 0,
      published: isPublished,
      milestones: dataWithoutIdAndConvertedValue,
    });
  };

  return (
    <>
      <div>
        <Head>
          <title>Edit Fundraiser | Global shapers</title>
          <meta name="description" content="Generated by create-next-app" />
          <link rel="icon" href="/gsi-logo.png" />
        </Head>

        <div className="flex">
          <Sidebar />

          <div className="mx-auto p-10 md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1250px]">
            <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
              EDIT FUNDING
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)}>
              <div className="mb-4">
                <label htmlFor="title" className="font-medium text-gray-800">
                  Project Title
                </label>

                <input
                  type="text"
                  placeholder="title"
                  value={projectData.title}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
                  readOnly
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="font-medium text-gray-800"
                >
                  Project Description
                </label>

                <textarea
                  value={projectData.description}
                  onChange={handleChange}
                  className="mt-1 h-56 w-full rounded-md border p-2 shadow-sm outline-none"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="font-medium text-gray-800">
                  Featured Image
                </label>

                <CldUploadButton
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  className={`relative mt-4 grid h-72 w-72 place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${featuredImageUrl && "pointer-events-none"}`}
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
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hub"
                  className="block font-medium text-gray-800"
                >
                  Hub
                </label>

                <input
                  type="text"
                  placeholder="hub"
                  value={projectData.hub}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="font-medium text-gray-800"
                >
                  Categories
                </label>

                <Select
                  placeholder="categories"
                  options={categoriesOption}
                  isMulti
                  value={categoriesOption.filter((option) =>
                    projectData.category.split(",").includes(option.value),
                  )}
                  isDisabled={true}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="font-medium text-gray-800">
                  Type
                </label>

                <Select
                  placeholder="type"
                  options={type}
                  value={type.find(
                    (option) => option.value === projectData.type,
                  )}
                  className="z-10"
                  isDisabled={true}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="beneficiaries"
                  className="font-medium text-gray-800"
                >
                  Beneficiaries
                </label>

                <input
                  type="text"
                  value={projectData.beneficiaries}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
                  readOnly
                />
              </div>

              <div className="mb-2 mt-12 text-xl">Project Design</div>
              <div className="flex items-center justify-between">
                <div className="">
                  <div className="">
                    <input
                      placeholder="Project Title"
                      maxLength={40}
                      value={projectData.about.projectTitle}
                      className="text-bold mb-1 mt-1 h-12 w-[530px] rounded-md border p-2 text-lg shadow-sm outline-none"
                      readOnly
                    />
                  </div>
                  <div className="">
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      placeholder="Project Description"
                      value={projectData.about.projectDescription}
                      maxLength={500}
                      className="mt-1 h-60 w-[530px] rounded-md border p-2 shadow-sm outline-none"
                      readOnly
                    />
                  </div>
                  Connect with us:
                  <input
                    placeholder="Project Link"
                    type="text"
                    value={projectData.about.projectLink}
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
                  // value={fundingData.about.projectObjDescription}
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
                      value={projectData.about.projectName1}
                      className="text-bold mb-1 mt-12 h-12 w-[550px]  rounded-md border p-2 text-center text-lg shadow-sm outline-none"
                      readOnly
                    />
                  </div>

                  <div className="">
                    <textarea
                      placeholder="Small Description"
                      maxLength={100}
                      value={projectData.about.projectName1Description}
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
                        value={projectData.about.projectName2}
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
                        value={projectData.about.projectName2Description}
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
                  value={projectData.about.theme}
                  disabled
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="milestones"
                  className="font-medium text-gray-800"
                >
                  Milestones
                </label>

                <MileStoneTableEdit
                  onRowDataChange={handleMilestoneDataChange}
                  existingMilestones={milestoneData}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="funding" className="font-medium text-gray-800">
                  Funding Goal
                </label>

                <input
                  type="number"
                  id="goal"
                  name="goal"
                  value={projectData.goal}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm outline-blue-800"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="font-medium text-gray-800 outline-blue-800"
                >
                  Target Date
                </label>

                <input
                  type="date"
                  id="date"
                  name="date"
                  value={convertedDate}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="about" className="font-medium text-gray-800">
                  About
                </label>
              </div>

              <button
                type="submit"
                className="mr-2 mt-4 rounded-lg bg-gray-600 px-2 py-2 font-medium text-white hover:bg-gray-800 md:mr-4 md:px-6"
                onClick={(e) => handleSubmit(e, false)}
              >
                Save as Draft
              </button>

              <button
                type="submit"
                className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 md:px-12"
                onClick={(e) => handleSubmit(e, true)}
              >
                Publish
              </button>
            </form>
          </div>
        </div>
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          message="Funding Edited Successfully."
          bgColor="bg-green-700"
        />
      </div>
    </>
  );
}

export default EditProject;
