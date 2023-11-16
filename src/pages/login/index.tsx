import Head from "next/head";
import { LoginForm } from "./LoginForm";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsc-iloilo-logo.jpeg" />
      </Head>

      <LoginForm />
    </>
  );
};

export default Login;
