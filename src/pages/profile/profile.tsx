import { clerkClient } from "@clerk/nextjs";
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";

const ProfilePage: React.FC<{ user: any }> = ({ user }) => {
  // Render user data
  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>User ID: {user.id}</p>
          <p>Email: {user.primaryEmailAddress}</p>
          {/* Render other user data as needed */}
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;

  return { props: { ...buildClerkProps(ctx.req, { user }) } };
};

export default ProfilePage;
