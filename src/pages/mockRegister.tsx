/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
 
export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  // start the sign up process.
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        emailAddress,
        password,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
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
 
  return (
    <div>
      {!pendingVerification && (
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" />
          </div>
          <button onClick={handleSubmit}>Sign up</button>
        </form>
      )}
      {pendingVerification && (
        <div>
          <form>
            <input
              value={code}
              placeholder="Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={onPressVerify}>
              Verify Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
}