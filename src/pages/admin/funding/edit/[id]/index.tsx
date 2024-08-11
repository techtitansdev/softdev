import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import { categoriesOption } from "~/data/categories";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import { FundingData } from "~/types/fundingData";
import MileStoneTableEdit from "../../components/MilestoneTableEdit";
import { NewEditor } from "~/components/editor/Editor";

function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const animatedComponents = makeAnimated();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const getProject = api.fundraiser.getById.useQuery(
    { id: id as string },
    { enabled: !!id },
  );

  const deleteImage = api.project.removeImage.useMutation();

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
    about: "",
    milestones: [],
    published: false,
  });

  const [editorBlocks, setEditorBlocks] = useState([]);
  const [initialEditorData, setInitialEditorData] = useState();

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
      setProjectData((prevData) => ({
        title: getProject.data.project.title || prevData.title,
        project: getProject.data.project.title || prevData.project,
        description:
          getProject.data.project.description || prevData.description,
        image: getProject.data.project.image || prevData.image,
        hub: getProject.data.project.hub || prevData.hub,
        category: getProject.data.project.category || prevData.category,
        type: getProject.data.project.type || prevData.type,
        beneficiaries:
          getProject.data.project.beneficiaries || prevData.beneficiaries,
        about: getProject.data.project.about || prevData.about,
        goal: getProject.data.goal?.toString() || prevData.goal,
        date: getProject.data.targetDate?.toString() || prevData.date,
        milestones: getProject.data.milestones || prevData.milestones,
        published: getProject.data.project.published || prevData.published,
      }));

      const initialEditorData = JSON.parse(
        getProject.data.project.about || "{}",
      );
      setInitialEditorData(initialEditorData);
      setEditorBlocks(initialEditorData.blocks);

      const transformedMilestones = getProject.data.milestones.map(
        (milestone) => ({
          ...milestone,
          date: new Date(milestone.date),
          done: milestone.done,
        }),
      );

      setMilestoneData(transformedMilestones);
      setImageUrl(getProject.data.project.image || "");
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

  const handleImageUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      setProjectData({
        ...projectData,
        image: url,
      });
    }
  };

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

          <div className="mx-auto p-10">
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
                  id="title"
                  name="title"
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
                  id="description"
                  name="description"
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
                  className={`relative mt-4 grid h-72 w-72 place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${imageUrl && "pointer-events-none"}`}
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
                  id="hub"
                  name="hub"
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
                  id="long-value-select"
                  instanceId="long-value-select"
                  placeholder="categories"
                  options={categoriesOption}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
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
                  isDisabled={true}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="font-medium text-gray-800">
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
                  id="beneficiaries"
                  name="beneficiaries"
                  value={projectData.beneficiaries}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
                  readOnly
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

              <NewEditor onChanges={() => {}} initialData={editorBlocks} />
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
