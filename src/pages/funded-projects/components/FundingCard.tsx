import Link from "next/link";

interface FundingCardProps {
  fundingData: any;
}

const FundingCard: React.FC<FundingCardProps> = ({ fundingData }) => {
  return (
    <div className="rounded-lg">
      <ul>
        <li
          key={fundingData.id}
          className="hover:scale-104 transform rounded-md pb-6 transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link href={`/funded-projects/${encodeURIComponent(fundingData.id)}`}>
            <img
              className="object-obtain h-56 w-[358px] rounded-md"
              src={fundingData.project.image}
              alt="funding-image"
            />
          </Link>

          <div className="mx-2 my-2">
            <h5 className="text-lg font-medium tracking-tight text-gray-900">
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
        </li>
      </ul>
    </div>
  );
};

export default FundingCard;
