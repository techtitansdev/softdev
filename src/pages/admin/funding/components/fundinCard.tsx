import { useState } from "react";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import DeleteModal from "~/components/DeleteModal";

interface ProjectCardProps {
  fundingData: any;
  handleDelete: () => void;
}

const FundingCard: React.FC<ProjectCardProps> = ({
  fundingData,
  handleDelete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="rounded-lg">
      <ul>
        <li
          key={fundingData.id}
          className="hover:scale-104 transform rounded-lg pb-6 shadow-lg transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link href={`/projects/${encodeURIComponent(fundingData.title)}`}>
            <img
              className="h-64 w-[560px] rounded lg:w-[700px]"
              src={fundingData.image}
              alt="project-image"
            />
          </Link>

          <div className="my-2 ml-2">
            <h5 className="text-medium text-lg font-semibold tracking-tight text-gray-900">
              {fundingData.title}
            </h5>
          
              <div className=" h-7 truncate text-start font-normal text-gray-600 ">
            

                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ante ac nisi rutrum viverra at eget ligula. Duis egestas condimentum nunc ut egestas. Integer venenatis gravida nibh eget dapibus. Etiam malesuada, orci quis condimentum pharetra, massa odio pharetra odio, auctor lobortis lectus sem ac felis. Nam metus erat, placerat eu mattis a, lacinia ac lacus. Phasellus venenatis diam in sodales pellentesque. Aliquam lacinia, arcu id lacinia vehicula, felis augue scelerisque ex, et viverra nulla ex sit amet mi. Ut auctor interdum gravida. Vestibulum porta eros id dolor dictum tempus."}
          
              </div>
            <p className="flex flex-row items-center font-normal text-gray-700 dark:text-gray-500">
              <IoLocationSharp size={15} /> {fundingData.hub}
            </p>
            <hr className="border-t-1 mx-2 my-2 border-dashed border-gray-500"></hr>
            <div className="grid grid-cols-3 justify-center gap-4">
              <div className="grid-rows-2 justify-center text-center">
                <div className="justify-center text-center font-bold text-black ">
                  {fundingData.donors}
                </div>
                <div className="justify-center text-center text-xs font-bold text-gray-500">
                  Donors
                </div>
              </div>
              <div className="grid-rows-2 justify-center text-center">
                <div className="justify-center text-center font-bold text-black">
                ₱{fundingData.raised}
                </div>
                <div className="justify-center text-center text-xs font-bold text-gray-500">
                  Raised
                </div>
              </div>
              <div className="grid-rows-2 justify-center text-center ">
                <div className="... justify-center overflow-hidden text-ellipsis text-center font-bold text-black ">
                ₱{fundingData.goal}
                </div>
                <div className="justify-center text-center text-xs  font-bold text-gray-500">
                  Goal
                </div>
              </div>
            </div>
          </div>

          <Link href={`/admin/funding/edit`}>
            <button className="ml-2 mt-2 border border-gray-500 px-8 py-1 text-gray-800 shadow-md hover:bg-gray-200">
              Edit
            </button>
          </Link>

          <button
            className="ml-2 mt-2 border bg-red-800 px-8 py-1 text-white shadow-md hover:bg-red-600"
            onClick={openModal}
          >
            Delete
          </button>
        </li>
      </ul>

      {isModalOpen && (
        <DeleteModal
          subject={fundingData.title}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default FundingCard;
