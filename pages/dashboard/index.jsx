import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

import DashboardSideBar from "@/shared/sidebar";

const Dashboard = ({ session }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const updatedSession = addProvider(session);
      if (updatedSession) {
        const result = await saveUser(updatedSession);
      }
    })();
  }, []);

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

const addProvider = (session) => {
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

const saveUser = async (session, url = process.env.NEXTAUTH_URL) => {
  try {
    const userExistence = await checkUser(session.user.email);
    if (userExistence.status === 404) {
      const user = await axios.post(`${url}/api/account`, {
        user: session.user,
        provider: session.provider,
      });

      console.log("response save user", user);

      if (user.data.ok) {
        return "Successfully saving User";
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const checkUser = async (email, url = process.env.NEXTAUTH_URL) => {
  try {
    const res = await axios.get(`${url}/api/account`, {
      params: {
        email,
      },
    });

    return res;
  } catch (error) {
    return error.response.data;
  }
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
