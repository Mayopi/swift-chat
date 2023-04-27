import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3000";
import { useRouter } from "next/router";

import DashboardSideBar from "@/shared/sidebar";

const HeaderCard = ({ header, body, footer, icon }) => {
  return (
    <div className="card-items w-full lg:w-[30%] border-subtext border-dashed border-2 rounded px-2 py-2 shadow cursor-pointer">
      <div className="card-header flex flex-wrap">
        <h1 className="text-primary font-semibold text-xl">{header}</h1>
      </div>

      <div className="card-body">
        <h1 className="font-bold text-accent text-2xl uppercase tracking-wider">
          <i className={`fa-solid ${icon}`}></i> {body}
        </h1>
      </div>

      <div className="card-footer">{footer}</div>
    </div>
  );
};

const CloseFriendItem = ({ session }) => {
  return (
    <div className="close-friend-item flex-shrink-0 cursor-pointer w-[120px] rounded border border-subtext border-dashed px-2 py-2 flex flex-col items-center">
      <div className="profile w-full rounded-full overflow-hidden aspect-square relative">
        <Image src={session.user.image} fill />
      </div>
      <p className="font-semibold text-lg">{session.user.name}</p>
    </div>
  );
};

const Dashboard = ({ session, data, totalUser }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return (
      <main>
        <div className="flex">
          <DashboardSideBar session={session} />

          <div className="container pl-[150px]">
            <section className="header mt-5 px-2 py-2">
              <div className="w-full flex gap-2 flex-wrap items-center">
                <h1 className="text-primary font-semibold text-2xl">
                  Welcome to Dashboard <span className="text-accent">{session.user.name}</span>
                </h1>

                <div className="badge font-semibold bg-subtext rounded-full py-1 px-2 text-white shadow">Statistic</div>

                <Link href={"/dashboard/messages"} className="self-end ml-auto">
                  <button className="px-2 py-2 text-white font-semibold rounded-full bg-accent">
                    <i className="fa-solid fa-paw"></i> Start Chatting
                  </button>
                </Link>
              </div>

              <form action="/api/account/add" method="POST" className="w-full lg:w-1/3 text-xl flex gap-2 items-center mt-5 border border-subtext px-3 rounded">
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass text-subtext"></i>
                </button>
                <input type="text" className="border h-full w-full focus:outline-none py-1 px-1" placeholder="Find People" name="email" />
              </form>
            </section>

            <hr className="border-t-primary border-opacity-20 my-5" />

            <section className="card flex flex-wrap w-full gap-2">
              <HeaderCard header={"Total User"} icon={"fa-user"} body={totalUser} footer={""} />
              <HeaderCard header={"Activity"} body={"10 Hours"} icon={"fa-atom"} footer={""} />
              <HeaderCard header={"Notification"} body={"10 Notification"} icon={"fa-bell"} footer={""} />
            </section>

            <section className="recent-conversation mt-10">
              <h1 className="font-bold text-xl text-primary mb-2">Recent Conversations</h1>

              <div className="cards flex-wrap flex w-full gap-2">
                <div className="conversation-card w-full lg:w-[45%] border border-subtext border-dashed px-2 py-2 rounded flex gap-2">
                  <div className="profile h-full aspect-square rounded border border-subtext border-dashed relative">
                    <Image src={session.user.image} fill />
                  </div>

                  <div className="description">
                    <div className="username">
                      <h3 className="font-semibold text-xl">{session.user.name}</h3>
                    </div>
                    <div className="date">
                      <p className="text-subtext">27 April, 2023</p>
                    </div>
                  </div>

                  <button className="mark-as-read">
                    <p className="text-white text-xs bg-subtext px-2 py-2 rounded-full h-[30px]">Mark as Read</p>
                  </button>

                  <div className="notif rounded-full bg-danger aspect-square w-3 h-3"></div>
                </div>

                <div className="conversation-card w-full lg:w-[45%] border border-subtext border-dashed px-2 py-2 rounded flex gap-2">
                  <div className="profile h-full aspect-square rounded border border-subtext border-dashed relative">
                    <Image src={session.user.image} fill />
                  </div>

                  <div className="description">
                    <div className="username">
                      <h3 className="font-semibold text-xl">{session.user.name}</h3>
                    </div>
                    <div className="date">
                      <p className="text-subtext">27 April, 2023</p>
                    </div>
                  </div>

                  <button className="mark-as-read">
                    <p className="text-white text-xs bg-subtext px-2 py-2 rounded-full h-[30px]">Mark as Read</p>
                  </button>

                  <div className="notif rounded-full bg-danger aspect-square w-3 h-3"></div>
                </div>
              </div>
            </section>

            <section className="close-friend mt-10">
              <h1 className="font-bold text-xl text-primary mb-2">Close Friend</h1>

              <div className="w-full overflow-x-scroll border rounded shadow-lg px-4 py-4 flex gap-3 overflow-y-hidden">
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
                <CloseFriendItem session={session} />
              </div>
            </section>
          </div>
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

  let totalUser = (await axios.get("/api/account")).data.users.length;

  return {
    props: {
      session,
      data: response.data,
      totalUser,
    },
  };
}

export default Dashboard;
