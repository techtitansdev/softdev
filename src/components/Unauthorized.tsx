import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img
        src="/access-denied.jpg"
        alt="Unauthorized"
        className="max-h-1/2 mb-8 max-w-full"
      />
      <Link
        href="/home"
        className="w-[300px] rounded-lg bg-[#1e2b64] py-2 text-center  text-xl font-medium text-white hover:bg-[#0A133C]"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
