import Link from "next/link";
import Image from "next/image";

interface FundingCardProps {
  fundingData?: {
    id: string;
    project: {
      image: string;
      title: string;
      description: string;
    };
    donors: number;
    funds: number;
    goal: number;
  };
}

const FundingCard: React.FC<FundingCardProps> = ({ fundingData }) => {
  if (!fundingData) {
    return null;
  }

  return (
    <div className="rounded-lg">
      <ul>
        <li
          key={fundingData.id}
          className="hover:scale-104 transform rounded-md transition duration-500 ease-in-out hover:-translate-y-1"
        >
          <Link href={`/funded-projects/${encodeURIComponent(fundingData.id)}`}>
            <div className="relative h-56 w-[360px] overflow-hidden rounded-2xl">
              <Image
                src={fundingData.project?.image || ""}
                alt="funding-image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Link>

          <div className="mx-2 my-2">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900">
              {fundingData.project?.title}
            </h5>

            <div className="max-w-[345px] items-center truncate text-xs font-light text-gray-800 dark:text-gray-800">
              {fundingData.project?.description}
            </div>
          </div>

          <hr className="mx-2 my-2 max-w-[345px] border-dashed border-gray-500" />

          <div className="mx-2 mt-2">
            <div className="flex items-center justify-center text-gray-700 dark:text-gray-500">
              <div className="text-center">
                <div className="text-base font-bold text-black">
                  {fundingData.donors}
                </div>
                <div className="text-xs font-normal">Donors</div>
              </div>
              <div className="mx-14 text-center md:mx-20">
                <div className="text-base font-bold text-black">
                  ₱{fundingData.funds}
                </div>
                <div className="text-xs font-normal">Raised</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-black">
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
