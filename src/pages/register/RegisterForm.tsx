import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineExclamationCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Register } from "~/types/register";
import validateRegistration from "~/utils/validateRegistration";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const RegisterForm = () => {
  const initialValues: Register = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState<Register>(initialValues);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateRegistration(formValues);
    setFormErrors(formErrors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form values submitted:", formValues);
    } else {
      console.log("Form submission conditions not met");
    }
  }, [formErrors, isSubmit]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row">
        <div className="relative z-10 mx-auto hidden w-1/2 sm:hidden md:hidden lg:flex">
          <div
            className="w-full xl:min-h-screen"
            style={{
              backgroundImage: `url('https://a0.muscache.com/im/pictures/miso/Hosting-802555919348853702/original/59dcec71-d33e-4edc-af0f-3681e7e76feb.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="absolute left-2 top-2 z-30">
          <img
            src="gsi-logo2.png"
            height={90}
            width={90}
            alt="Logo"
            className="cursor-pointer"
          />
        </div>

        <div className="flex w-full flex-col sm:w-full md:w-full  lg:w-1/2 xl:min-h-screen xl:w-1/2">
          <div className="ml-5 mt-28 flex flex-col text-3xl font-semibold md:ml-10 lg:ml-16 xl:ml-24 xl:text-4xl">
            Register
          </div>
          <div className="mb-8 ml-5 mt-1 flex flex-col text-base md:ml-10 lg:ml-16 xl:ml-24 xl:text-lg">
            Create New Account! Please Enter your details
          </div>

          <div className="flex w-full flex-col px-5 md:px-10 lg:px-16 xl:px-24">
            <div className="flex">
              <div className="relative mb-2 flex-1">
                <input
                  className="my-2 w-11/12 border-b border-gray-800 py-2 pr-3 text-black outline-none focus:outline-none"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
                {formErrors.firstName && (
                  <div className="flex items-center text-sm text-red-600">
                    <AiOutlineExclamationCircle className="mr-1" size={18} />
                    {formErrors.firstName}
                  </div>
                )}
              </div>
              <div className="relative mb-2 flex-1">
                <input
                  className="my-2 w-full border-b border-gray-800 py-2 pr-3 text-black outline-none focus:outline-none"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
                {formErrors.lastName && (
                  <div className="flex items-center text-sm text-red-600">
                    <AiOutlineExclamationCircle className="mr-1" size={18} />
                    {formErrors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="relative mb-2">
              <input
                className="my-2 w-full border-b border-gray-800 py-2 pr-3 text-black outline-none focus:outline-none"
                type="email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <div className="flex items-center text-sm text-red-600">
                  <AiOutlineExclamationCircle className="mr-1" size={18} />
                  {formErrors.email}
                </div>
              )}
            </div>

            <div className="relative mb-2">
              <input
                className="my-2 w-full border-b border-gray-800 py-2 pr-3 text-black outline-none focus:outline-none"
                type="text"
                placeholder="Address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
              />
              {formErrors.address && (
                <div className="mb-2 flex items-center text-sm text-red-600">
                  <AiOutlineExclamationCircle className="mr-1" size={18} />
                  {formErrors.address}
                </div>
              )}
            </div>

            <div className="relative mb-2">
              <PhoneInput
                inputProps={{
                  className:
                    "pl-12 w-full border-b border-gray-800 py-2 pr-3 text-black outline-none focus:outline-none",
                  type: "tel",
                }}
                placeholder="Phone Number"
                country="ph"
                value={formValues.phone}
                onChange={(value) => {
                  handleInputChange({
                    target: {
                      name: "phone",
                      value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
              />

              {formErrors.phone && (
                <div className="flex items-center text-sm text-red-600">
                  <AiOutlineExclamationCircle className="mr-1" size={18} />
                  {formErrors.phone}
                </div>
              )}
            </div>

            <div className="relative mb-2">
              <div className="relative">
                <input
                  className="my-2 w-full border-b border-gray-800 py-2 pr-3 text-black outline-none focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {showPassword ? (
                  <AiOutlineEye
                    size={20}
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-700"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-700"
                  />
                )}
              </div>
              {formErrors.password && (
                <div className="flex-col text-red-600">
                  <div className="text-xs">
                    <span className="text-gray-700">At least</span> 6
                    characters, a capital letter, a special character
                    <span className="text-gray-700"> and</span> a number.
                  </div>
                  <div className="mt-1 flex items-center text-sm">
                    <AiOutlineExclamationCircle className="mr-1" size={18} />
                    {formErrors.password}
                  </div>
                </div>
              )}
            </div>

            <div className="relative mb-2">
              <div className="relative">
                <input
                  className="my-2 w-full border-b border-gray-800 py-2 pr-3 text-black outline-none focus:outline-none"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
                {showConfirmPassword ? (
                  <AiOutlineEye
                    size={20}
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-700"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-700"
                  />
                )}
              </div>
              {formErrors.confirmPassword && (
                <div className="flex items-center text-sm text-red-600">
                  <AiOutlineExclamationCircle className="mr-1" size={18} />
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>

            <div className="mb-12 mt-4 px-10 md:px-24 lg:w-full lg:px-0">
              <button
                type="submit"
                className="block w-full rounded-lg bg-gray-600 px-4 py-3 font-bold text-white hover:bg-gray-800"
              >
                Sign Up
              </button>

              <div className="col text-medium mt-4 flex items-center justify-center">
                <div>
                  Already have an account? &nbsp;
                  <Link href="/login">
                    <span className="font-semibold text-blue-700 hover:underline">
                      Sign In
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
