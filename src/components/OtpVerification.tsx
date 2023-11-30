
import { useSignUp } from "@clerk/nextjs";
import router from "next/router";
import React, { useState } from "react";

 
 export const OtpVerification = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
   
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /* investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
   };
  

  const handleChange = (el: EventTarget & HTMLInputElement, index: number) => {
    const inputValue = el.value;

    // Check if the input is a numeric digit (0-9) or an empty string
    if (!/^\d*$/.test(inputValue)) return false;

    const newOtp = [...otp];
    newOtp[index] = inputValue;
    setOtp(newOtp);

    // Manage focus to the next input field
    if (el.nextSibling && inputValue !== "" && index < otp.length - 1) {
      const nextInput = el.nextSibling as HTMLInputElement;
      nextInput.focus();
    }
  };

  // Submit OTP handler
 

  return (
    <div className=" m-auto flex min-h-screen items-center justify-center">
      <div className="md: mx-2 rounded-xl border-2 py-5 md:px-8">
        <div className="text:xl mb-2 text-center font-semibold md:text-2xl">
          Verify your Email
        </div>
        <div className="mb-8 px-3 text-center text-sm font-normal md:text-base">
          Please enter the verification code we sent to your email
        </div>
        <div className="m-auto flex flex-row gap-1 sm:gap-2 md:gap-6">
          {otp.map((data, i) => {
            return (
              <input
                type="text"
                name="otp"
                className="m-auto h-12 w-12 border-b-2 border-gray-600 text-center text-2xl"
                maxLength={1}
                key={i}
                value={data}
                onChange={(e) => handleChange(e.target, i)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <div className="m-auto my-5 flex w-[80%] flex-row justify-center gap-2">
          <button
            onClick={() => {
              const enteredOtp = otp.join("");
              console.log(otp.join(""))
              setCode(otp.join(""));
              setTimeout(() => {
                onPressVerify();
              }, 200);
            }}
            className="mt-6 block w-80 rounded-2xl bg-blue-800 py-2 text-lg font-semibold text-white hover:bg-blue-900 md:py-3 xl:mb-6"
          >
            VERIFY & PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};
