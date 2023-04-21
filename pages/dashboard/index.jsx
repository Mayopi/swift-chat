import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3000";
import { useRouter } from "next/router";

import DashboardSideBar from "@/shared/sidebar";

const Dashboard = ({ session }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return (
      <main>
        <DashboardSideBar session={session} />
      </main>
    );
  } else if (status === "loading") {
    return <div>Loading...</div>;
  } else {
    router.push("/signin");
    return;
  }
};

const addProvider = async (session) => {
  if (session && session.user && session.user.image) {
    if (!session.provider) {
      session.provider = {};
    }

    if (session.user.image.includes("google")) {
      session.provider.name = "Google";
      session.provider.id = "google";
    } else if (session.user.image.includes("discord")) {
      session.provider.name = "Discord";
      session.provider.id = "discord";
    }

    return session;
  } else {
    return session;
  }
};
export async function getServerSideProps({ req }) {
  const rawSession = await getSession({ req });

  if (!rawSession) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const session = await addProvider(rawSession);

  const response = await axios.post("/api/account", {
    provider: session.provider,
    user: session.user,
  });

  return {
    props: {
      session,
      data: response.data,
    },
  };
}

export default Dashboard;
