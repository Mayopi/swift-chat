import DashboardSideBar from "@/shared/sidebar";
import { getSession } from "next-auth/react";

const MessagesPage = ({ session }) => {
  return (
    <main>
      <div className="flex">
        <DashboardSideBar session={session} />

        <div className="container">
          <h1>Welcome to message</h1>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default MessagesPage;