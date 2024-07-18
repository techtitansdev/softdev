import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const publicUrl = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  if (publicUrl) {
    console.log("Publishable key is set:", publicUrl);
  } else {
    console.log("Publishable key is missing or not set correctly.");
  }

  return (
    <ClerkProvider publishableKey={publicUrl} {...pageProps}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
