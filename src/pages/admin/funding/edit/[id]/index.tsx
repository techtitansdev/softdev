import Head from "next/head";
import { useState, useEffect, ChangeEvent } from "react";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import { FundingData } from "~/types/fundingData";
import MileStoneTableEdit from "../../components/MilestoneTableEdit";
import React from "react";

function EditFundraiser() {
  const router = useRouter();
  const { id } = router.query;
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const [newMilestone, setInitialMilestoneData] = useState<TableRow[]>([]);
  const [receivers, setReceivers] = useState("");
  const getProject = api.fundraiser.getById.useQuery(
    { id: id as string },
    { enabled: !!id },
  );

  // Get funding data
  const fundingData = getProject.data?.fundings;

  // Default value for fundingData if it is undefined
  const defaultFundingData: {
    id: string;
    fullName: string;
    email: string;
    contact: string;
    date: Date;
    fundraiserId: string;
    amount: number;
    paymentMethod: string;
    donatedAs: string;
    donorsId: string | null;
  }[] = [];

  // Use fundingData if defined, otherwise use defaultFundingData
  const dataToUse = fundingData || defaultFundingData;

  // Extract unique emails into a Set
  const emailSet = new Set(dataToUse.map((item) => item.email));

  // Convert Set to Array
  const uniqueEmailArray = Array.from(emailSet);

  // Convert the array to a comma-separated string
  const emailString = uniqueEmailArray.join(", ");

  // Log the comma-separated string

  async function sendEmailRequest(data: TableRow[]) {
    try {
      const response = await fetch("/api/sendEmailMilestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: receivers,
          subject:
            "Milestone Achieved: Project " + getProject.data?.project.title,
          text: 'The milestone "Project Completion" has been achieved.\n\nDetails:\n- Value: 100%\n- Description: The project has been successfully completed.',
          projectTitle: getProject.data?.project.title,
          projectId: getProject.data?.id,
          milestones: milestoneData,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email request:", error);
    }
  }
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
    funds: 0,
    donors: 0,
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

      setProjectData((prevData) => ({
        ...prevData,
        goal: getProject.data.goal?.toString() || prevData.goal,
        date: getProject.data.targetDate?.toString() || prevData.date,
        milestones: milestones || prevData.milestones,
        published: project.published || prevData.published,
        funds: getProject.data.funds || prevData.funds,
        donors: getProject.data.donors || prevData.donors,
      }));

      // Transforming and setting milestones
      const transformedMilestones = milestones.map((milestone) => ({
        ...milestone,
        date: new Date(milestone.date),
        done: milestone.done,
      }));

      setMilestoneData(transformedMilestones);
    }
  }, [getProject.data]);

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
  const milestoneUpdate = () => {
    setMilestoneUpdated(true);
  };
  const [milestoneUpdated, setMilestoneUpdated] = useState(false);

  const dataWithoutIdAndConvertedValue =
    getObjectsWithoutIdAndConvertValue(milestoneData);

  const handleMilestoneDataChange = (data: TableRow[]) => {
    setMilestoneData(data);
    setInitialMilestoneData(data);
    setReceivers(emailString);
  };

  const dateObject = new Date(projectData.date);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  const convertedDate = `${year}-${month}-${day}`;

  const handleSubmit = async (e: React.FormEvent, isPublished: boolean) => {
    e.preventDefault();
    if (milestoneUpdated) {
      sendEmailRequest(milestoneData);
    }
    editProject.mutate({
      ...projectData,
      id: id as string,
      goal: parseInt(projectData.goal, 10),
      donors: projectData.donors,
      targetDate: new Date(projectData.date),
      published: isPublished,
      milestones: dataWithoutIdAndConvertedValue,
      funds: projectData.funds,
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
                <label
                  htmlFor="milestones"
                  className="font-medium text-gray-800"
                >
                  Milestones
                </label>

                <MileStoneTableEdit
                  onRowDataChange={handleMilestoneDataChange}
                  existingMilestones={milestoneData}
                  setMilestoneUpdated={milestoneUpdate}
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

export default EditFundraiser;
