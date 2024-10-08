import Head from "next/head";

import { Footer } from "~/components/Footer";
import LoginForm from "./LoginForm";


const Login = () => {
  return (
    <>
      <Head>
        <title> Login </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <LoginForm />
      <Footer />
    </>
  );
};

export default Login;
