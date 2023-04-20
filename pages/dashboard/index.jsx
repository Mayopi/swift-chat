import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
        <div className="container">
          <p>Dashboard</p>
          <div className="w-full my-5">
            <h1 className="text-xl text-primary font-medium">{session?.user?.name || "undefined"}</h1>
            <Image src={session?.user?.image || ""} width={100} height={100} className="rounded-full" alt="profile picture" />
            <p>{session?.provider?.name || "loading..."}</p>
          </div>

          <button className="text-white bg-danger px-2 py-2 min-w-[120px]" onClick={() => signOut()}>
            Sign Out as {session?.user?.email || "undefined"}
          </button>
        </div>
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

const saveUser = async (session, url = "http://localhost:3000") => {
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

const checkUser = async (email, url = "http://localhost:3000") => {
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
