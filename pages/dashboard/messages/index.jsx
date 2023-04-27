import DashboardSideBar from "@/shared/sidebar";
import { getSession } from "next-auth/react";

const MessagesPage = ({ session }) => {
  return (
    <main>
      <div className="container">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero doloremque iusto dicta, sequi, molestiae sapiente ut debitis nulla ab deleniti accusantium numquam iste nihil animi temporibus recusandae dolores ullam hic.</p>
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
