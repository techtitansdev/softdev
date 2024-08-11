// import Head from "next/head";
// import { useEffect, useState } from "react";
// import { Sidebar } from "~/components/Sidebar";
// import { api } from "~/utils/api";
// import { categoriesOption } from "~/data/categories";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
// import Image from "next/image";
// import { Modal } from "~/components/Modal";
// import { useRouter } from "next/router";
// import MileStoneTable, { TableRow } from "./components/MilestoneTable";
// import { NewEditor } from "~/components/editor/Editor";
// import { useUser } from "@clerk/nextjs";
// import Loading from "~/components/Loading";
// import Unauthorized from "~/components/Unauthorized";
// import { FundingData } from "~/types/fundingData";

// function CreateFunding() {
//   const [project, setProject] = useState("");
//   const getProjects = api.project.getAllProjectTitles.useQuery();
//   const getSpecificProjects = api.project.getByTitle.useQuery({
//     title: project,
//   });

//   const [imageUrl, setImageUrl] = useState("");
//   const [publicId, setPublicId] = useState("");

//   const transformedProjects =
//     getProjects.data?.map((project) => ({
//       label: project,
//       value: project,
//     })) || [];

//   const animatedComponents = makeAnimated();
//   const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
//   const router = useRouter();

//   const [fundingData, setFundingData] = useState<FundingData>({
//     title: "",
//     project: "",
//     description: "",
//     image: "",
//     hub: "",
//     category: "",
//     type: "",
//     beneficiaries: "",
//     goal: "",
//     date: "",
//     about: "",
//     published: false,
//     milestones: [],
//   });
//   const [initialEditorData, setinitialEditorData] = useState();

//   const type = [
//     { label: "Activity", value: "Activity" },
//     { label: "Project", value: "Project" },
//   ];

//   useEffect(() => {
//     if (getSpecificProjects.data) {
//       const specificProject = getSpecificProjects.data;
//       setFundingData({
//         ...fundingData,
//         project: specificProject.title ?? "",
//         hub: specificProject.hub ?? "",
//         category: specificProject.category ?? "",
//         beneficiaries: specificProject.beneficiaries ?? "",
//         type: specificProject.type ?? "",
//         image: specificProject.image ?? "",
//         title: specificProject.title ?? "",
//         description: specificProject.description ?? "",
//         // about: specificProject.about ?? "",
//       });
//       setImageUrl(specificProject.image ?? "");
//     }
//   }, [getSpecificProjects.data]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFundingData({ ...fundingData, [name]: value });
//   };

//   const [editorContent, setEditorContent] = useState("");
//   const handleImageUpload = (result: CldUploadWidgetResults) => {
//     console.log("result: ", result);
//     const info = result.info as object;

//     if ("secure_url" in info && "public_id" in info) {
//       const url = info.secure_url as string;
//       const public_id = info.public_id as string;
//       setImageUrl(url);
//       setPublicId(public_id);
//       console.log("url: ", url);
//       console.log("public_id: ", public_id);
//     }
//   };

//   const removeImage = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // logic for removing the image
//   };

//   const [milestoneData, setMilestoneData] = useState<TableRow[]>([
//     {
//       milestone: "1",
//       value: 0,
//       unit: "",
//       description: "",
//       id: undefined,
//       date: new Date(),
//       done: false,
//       created: new Date(),
//       updated: new Date(),
//       fundraiserId: ""
//     },
//   ]);

//   const handleMilestoneDataChange = (data: TableRow[]) => {
//     const updatedData = data.map((item) => ({
//       ...item,
//       value:
//         typeof item.value === "string" ? parseFloat(item.value) : item.value,
//     }));
//     setMilestoneData(updatedData);
//     console.log("updated data", updatedData);
//   };

//   const createFundRaiser = api.fundraiser.create.useMutation();
//   const [editorBlocks, setEditorBlocks] = useState([]);

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>,
//     publish: boolean,
//   ) => {
//     e.preventDefault();

//     try {
//       const fundraiserResult = await createFundRaiser.mutateAsync({
//         goal: parseFloat(fundingData.goal),
//         targetDate: new Date(fundingData.date),
//         projectId: getSpecificProjects.data?.id ?? "",
//         funds: 0,
//         donors: 0,
//         milestones: milestoneData,
//         published: publish,
//       });

//       setSuccessModalOpen(true);

//       setTimeout(() => {
//         router.push("/admin/funding");
//       }, 2000);

//       console.log("Project created:", fundraiserResult);
//     } catch (error) {
//       console.error("Error creating project:", error);
//     }
//   };

//   console.log({ milestone: "1", value: 0, unit: "", description: "" });
//   const { user, isLoaded } = useUser();
//   const user_role = user?.publicMetadata.admin;

//   useEffect(() => {}, [isLoaded, user_role]);
//   if (!isLoaded) {
//     return <Loading />;
//   }
//   if (user_role !== "admin") {
//     return <Unauthorized />;
//   }

//   return (
//     <div>
//       <Head>
//         <title>Create Funding | Global shapers</title>x``
//         <meta name="description" content="Generated by create-next-app" />
//         <link rel="icon" href="/gsi-logo.png" />
//       </Head>

//       <div className="flex">
//         <Sidebar />

//         <div className="mx-auto p-10">
//           <div className="mb-10 mt-16 border-b-2 border-black pb-4 text-2xl font-medium text-gray-800 md:text-3xl">
//             CREATE FUNDING
//           </div>

//           <form>
//             <div className="mb-4">
//               <label htmlFor="categories" className="font-medium text-gray-700">
//                 Select a Project
//               </label>

//               <Select
//                 options={transformedProjects}
//                 value={transformedProjects.find(
//                   (option) => option.value === fundingData.category,
//                 )}
//                 onChange={(selectedOption) => {
//                   setImageUrl(getSpecificProjects.data?.image ?? "");
//                   setFundingData({
//                     ...fundingData,
//                     project: selectedOption ? selectedOption.value : "",
//                     hub: getSpecificProjects.data?.hub ?? "",
//                     category: getSpecificProjects.data?.category ?? "",
//                     beneficiaries:
//                       getSpecificProjects.data?.beneficiaries ?? "",
//                     type: getSpecificProjects.data?.type ?? "",
//                     image: getSpecificProjects.data?.image ?? "",
//                     title: getSpecificProjects.data?.title ?? "",
//                     description: getSpecificProjects.data?.description ?? "",
//                     // about: getSpecificProjects.data?.about ?? "",
//                   });
//                   setProject(selectedOption ? selectedOption.value : "");
//                 }}
//                 className="z-20"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="title" className="font-medium text-gray-700">
//                 Fundraiser Title
//               </label>

//               <input
//                 type="text"
//                 id="titile"
//                 name="title"
//                 value={fundingData.title}
//                 onChange={handleChange}
//                 className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
//                 data-testid="project-select"
//                 readOnly
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="description"
//                 className="font-medium text-gray-700"
//               >
//                 Fundraiser Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={fundingData.description}
//                 onChange={handleChange}
//                 className="mt-1 h-56 w-full rounded-md border p-2 shadow-sm outline-none"
//                 readOnly
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="image" className="font-medium text-gray-700">
//                 Featured Image
//               </label>

//               <CldUploadButton
//                 uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
//                 className={`relative mt-4 grid h-72 w-72 place-items-center rounded-md border-2 border-dotted bg-slate-100 object-cover ${
//                   imageUrl && "pointer-events-none"
//                 }`}
//                 onUpload={handleImageUpload}
//               >
//                 <div>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="h-6 w-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
//                     />
//                   </svg>
//                 </div>

//                 {imageUrl && (
//                   <Image
//                     src={imageUrl}
//                     fill
//                     sizes="72"
//                     className="absolute inset-0 object-cover"
//                     alt={fundingData.title}
//                   />
//                 )}
//               </CldUploadButton>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="hub" className="block font-medium text-gray-700">
//                 Hub
//               </label>

//               <input
//                 type="text"
//                 id="hub"
//                 name="hub"
//                 value={fundingData.hub}
//                 onChange={handleChange}
//                 className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
//                 readOnly
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="categories" className="font-medium text-gray-700">
//                 Categories
//               </label>

//               <Select
//                 id="long-value-select"
//                 instanceId="long-value-select"
//                 options={categoriesOption}
//                 closeMenuOnSelect={false}
//                 components={animatedComponents}
//                 isMulti
//                 value={categoriesOption.filter((option) =>
//                   fundingData.category.split(",").includes(option.value),
//                 )}
//                 onChange={(selectedOption) => {
//                   const selectedValues = selectedOption
//                     ? selectedOption.map((option) => option.value)
//                     : [];
//                   setFundingData({
//                     ...fundingData,
//                     category: selectedValues.join(","),
//                   });
//                 }}
//                 className="z-20"
//                 isDisabled={true}
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="categories" className="font-medium text-gray-700">
//                 Type
//               </label>

//               <Select
//                 options={type}
//                 value={type.find((option) => option.value === fundingData.type)}
//                 onChange={(selectedOption) => {
//                   setFundingData({
//                     ...fundingData,
//                     type: selectedOption ? selectedOption.value : "",
//                   });
//                 }}
//                 className="z-10"
//                 isDisabled={true}
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="beneficiaries"
//                 className="font-medium text-gray-700"
//               >
//                 Beneficiaries
//               </label>

//               <input
//                 type="text"
//                 id="beneficiaries"
//                 name="beneficiaries"
//                 value={fundingData.beneficiaries}
//                 onChange={handleChange}
//                 className="mt-1 w-full rounded-md border p-2 shadow-sm outline-none"
//                 readOnly
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="milestones" className="font-medium text-gray-700">
//                 Milestones
//               </label>

//               <MileStoneTable
//                 onRowDataChange={handleMilestoneDataChange}
//                 existingMilestone={milestoneData}
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="funding" className="font-medium text-gray-700">
//                 Funding Goal
//               </label>

//               <input
//                 type="text"
//                 id="goal"
//                 name="goal"
//                 value={fundingData.goal}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (
//                     /^\d*$/.test(value) &&
//                     (value === "" || parseInt(value) >= 1)
//                   ) {
//                     setFundingData({ ...fundingData, goal: value });
//                   }
//                 }}
//                 className="mt-1 w-full rounded-md border p-2 shadow-sm"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="date" className="font-medium text-gray-700">
//                 Target Date
//               </label>

//               <input
//                 type="date"
//                 id="date"
//                 name="date"
//                 value={fundingData.date}
//                 onChange={handleChange}
//                 className="mt-1 w-full rounded-md border p-2 shadow-sm"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="about" className="font-medium text-gray-700">
//                 About
//               </label>
//             </div>

//             <NewEditor onChanges={() => {}} initialData={editorBlocks} />

//             <button
//               type="button"
//               className="mr-2 mt-4 rounded-lg bg-gray-600 px-2 py-2 font-medium text-white hover:bg-gray-800 md:mr-4 md:px-6"
//               onClick={(e) => handleSubmit(e as any, false)} // Save as Draft
//             >
//               Save as Draft
//             </button>

//             <button
//               type="button"
//               className="mt-4 rounded-lg bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 md:px-12"
//               onClick={(e) => handleSubmit(e as any, true)} // Publish
//             >
//               Publish
//             </button>
//           </form>
//         </div>
//       </div>
//       <Modal
//         isOpen={isSuccessModalOpen}
//         onClose={() => setSuccessModalOpen(false)}
//         message="Funding Created Successfully."
//         bgColor="bg-green-700"
//       />
//     </div>
//   );
// }

// export default CreateFunding;
