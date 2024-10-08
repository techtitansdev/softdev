import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineExclamationCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from "react-icons/ai";
import { Modal } from "~/components/Modal";
import { validateLogin } from "~/utils/validateLogin";

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalBgColor, setModalBgColor] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleValidate = () => {
    const validation = validateLogin(formValues);

    setFormErrors(validation);
    if (validation.state === "validated") {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleValidate();

    if (isValid) {
      try {
        const result = await signIn
          ?.create({
            identifier: formValues.email,
            password: formValues.password,
          })
          .then(async (result) => {
            if (result.status === "complete") {
              setModalOpen(true);
              setModalContent("Success");
              setModalBgColor("bg-green-700");

              await new Promise((resolve) => setTimeout(resolve, 3000));

              setModalOpen(false);

              setActive({ session: result.createdSessionId });

              return;
            } else {
              console.log(result);
            }
          });
      } catch (err: any) {
        console.error(err.errors[0].longMessage);

        setModalOpen(true);
        setModalContent("Make sure your email and password are correct.");
        setModalBgColor("bg-red-500");

        setTimeout(() => {
          setModalOpen(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex sm:flex-col md:flex-col lg:flex-row xl:h-screen xl:flex-row">
          <div className="relative z-10 mx-auto hidden w-1/2 sm:hidden md:hidden lg:flex">
            <div
              className="w-full"
              style={{
                backgroundImage: `url('https://a0.muscache.com/im/pictures/miso/Hosting-802555919348853702/original/59dcec71-d33e-4edc-af0f-3681e7e76feb.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="absolute left-2 top-2 z-30 block md:left-6 md:top-4 lg:left-2 lg:top-2">
            <Link href={"/home"}>
              <img
                src="gsi-logo2.png"
                height={90}
                width={90}
                alt="Logo"
                className="h-[55px] w-[55px] cursor-pointer md:h-[90px] md:w-[90px]"
              />
            </Link>
          </div>

          <div className="flex w-full flex-col sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
            <div className="ml-5 mt-28 flex flex-col text-3xl font-semibold md:ml-10 md:mt-40 lg:ml-16 lg:mt-36 xl:ml-24 xl:mt-40 xl:text-4xl">
              Login
            </div>
            <div className="mb-8 ml-5 mt-1 flex flex-col text-base md:ml-10 md:text-lg lg:ml-16 xl:ml-24">
              Welcome back! Please Enter your details
            </div>

            <div className="flex w-full flex-col px-5 md:px-10 lg:px-16 xl:px-24">
              <div className="relative mb-2">
                <div className="relative flex items-center">
                  <AiOutlineMail
                    size={20}
                    className="absolute left-0 top-1/2 -translate-y-1/2 transform text-gray-800"
                  />
                  <input
                    className="my-2 w-full border-b border-gray-800 py-2 pl-6 pr-3 text-black outline-none focus:outline-none"
                    type="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({ ...formValues, email: e.target.value })
                    }
                  />
                </div>
                {formErrors.emailError && (
                  <div className="flex items-center text-sm text-red-600">
                    <AiOutlineExclamationCircle className="mr-1" size={18} />
                    {formErrors.emailError}
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="relative flex items-center">
                  <AiOutlineLock
                    size={20}
                    className="absolute left-0 top-1/2 -translate-y-1/2 transform text-gray-800"
                  />
                  <input
                    className="my-2 w-full border-b border-gray-800 py-2 pl-6 pr-3 text-black outline-none focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formValues.password}
                    onChange={(e) =>
                      setFormValues({ ...formValues, password: e.target.value })
                    }
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
                {formErrors.passwordError && (
                  <div className="flex items-center text-sm text-red-600">
                    <AiOutlineExclamationCircle className="mr-1" size={18} />
                    {formErrors.passwordError}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-20 px-5 sm:px-8 md:px-36 lg:px-16 xl:px-24">
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

              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                message={modalContent}
                bgColor={modalBgColor}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
