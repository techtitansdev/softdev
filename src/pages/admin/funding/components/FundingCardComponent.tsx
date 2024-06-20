import { useState } from "react";
import Link from "next/link";
import DeleteModal from "~/components/DeleteModal";

interface FundingCardProps {
  fundingData: any;
  handleDelete: () => void;
}

const FundingCard: React.FC<FundingCardProps> = ({
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

  const cardClassName = fundingData.published
    ? "bg-gray-100" 
    : "";

  return (
    <div className={`rounded-lg ${cardClassName}`}>
      <ul>
        <li
          key={fundingData.id}
          className="hover:scale-104 transform rounded-md pb-6 shadow transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link href={`/admin/funding/${encodeURIComponent(fundingData.id)}`}>
            <img
              className="object-obtain h-56 w-[358px] rounded-md"
              src={fundingData.project.image}
              alt="funding-image"
            />
          </Link>

          <div className="mx-2 my-2">
            <h5 className="truncate text-lg font-medium tracking-tight text-gray-900">
              {fundingData.project.title}
            </h5>

            <div className="max-w-[330px] items-center truncate text-xs font-light text-gray-700 dark:text-gray-500">
              {fundingData.project.description}
            </div>
          </div>

          <hr className="border-t-1 mx-2 my-2 max-w-[330px] border-dashed border-gray-500"></hr>

          <div className="mx-2 mt-2">
            <div className="flex items-center justify-center text-gray-700 dark:text-gray-500">
              <div className="text-center">
                <div className="text-sm font-bold text-black">
                  {fundingData.donors}
                </div>
                <div className="text-xs font-normal">Donors</div>
              </div>
              <div className="mx-14 text-center md:mx-20">
                <div className="text-sm font-bold text-black">
                  ₱{fundingData.funds}
                </div>
                <div className="text-xs font-normal">Raised</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-black">
                  ₱{fundingData.goal}
                </div>
                <div className="text-xs font-normal">Goal</div>
              </div>
            </div>
          </div>

          <Link href={`/admin/funding/edit/${fundingData.id}`}>
            <button className="ml-2 mt-3 rounded-md border border-gray-500 px-8 py-1 text-gray-800 shadow-md hover:bg-gray-200">
              Edit
            </button>
          </Link>

          <button
            className="ml-2 mt-3 rounded-md border bg-red-600 px-8 py-1 text-white shadow-md hover:bg-red-700"
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
