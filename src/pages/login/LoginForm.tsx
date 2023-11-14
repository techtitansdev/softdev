import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from "react-icons/ai";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex sm:flex-col md:flex-col lg:flex-row xl:h-screen xl:flex-row">
      <div className="relative z-10 mx-auto hidden w-1/2 sm:hidden md:hidden lg:flex">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://a0.muscache.com/im/pictures/miso/Hosting-802555919348853702/original/59dcec71-d33e-4edc-af0f-3681e7e76feb.jpeg')",
          }}
        ></div>
      </div>

      <div className="absolute left-2 top-2 z-30 block md:left-6 md:top-4 lg:left-2 lg:top-2">
        <img
          src="gsi-logo2.png"
          height={90}
          width={90}
          alt="Logo"
          className="cursor-pointer"
        />
      </div>

      <div className="flex w-full flex-col sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
        <div className="ml-5 mt-40 flex flex-col text-3xl font-semibold md:ml-10 lg:ml-16 lg:mt-36 xl:ml-24 xl:mt-40 xl:text-4xl">
          Login
        </div>
        <div className="mb-8 ml-5 mt-1 flex flex-col text-base md:ml-10 md:text-lg lg:ml-16 xl:ml-24">
          Welcome back! Please Enter your details
        </div>

        <div className="flex w-full flex-col px-5 md:px-10 lg:px-16 xl:px-24">
          <div className="relative mb-2">
            <AiOutlineMail
              size={20}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform text-gray-800"
            />
            <input
              className="my-2 w-full border-b border-gray-800 py-2 pl-6 pr-3 text-black outline-none focus:outline-none"
              type="email"
              placeholder="Email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <AiOutlineLock
              size={20}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform text-gray-800"
            />
            <input
              className="my-2 w-full border-b border-gray-800 py-2 pl-6 pr-3 text-black outline-none focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <AiOutlineEye
                size={20}
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-800"
              />
            ) : (
              <AiOutlineEyeInvisible
                size={20}
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-800"
              />
            )}
          </div>
          <div className="mt-2 flex justify-end text-sm font-semibold sm:text-base">
            <Link href="/otp-verification">Forgot Password?</Link>
          </div>
        </div>

        <div className="mt-16 px-5 sm:px-8 md:px-36 lg:px-16 xl:px-24">
          <button
            type="submit"
            className="block w-full rounded-lg bg-gray-600 px-4 py-3 font-bold text-white hover:bg-gray-800"
          >
            Sign In
          </button>

          <div className="mb-12 mt-4 flex items-center justify-center text-sm sm:text-lg">
            <div>
              Don't have an account? &nbsp;
              <Link
                href="/register"
                className="font-semibold text-blue-700 hover:underline"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
