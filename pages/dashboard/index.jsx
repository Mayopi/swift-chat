import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3000";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardSideBar from "@/shared/sidebar";
import { useState } from "react";

import HeaderCard from "@/shared/headerCard";
import CloseFriendItem from "@/shared/closeFriendCard";

const FriendModal = ({ username, image, email, error, isOpen, closeModal, sender }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%", // contoh pengaturan lebar
      height: "auto", // contoh pengaturan tinggi
    },
  };

  return (
    <Modal contentLabel="Example Modal" isOpen={isOpen} style={customStyles}>
      <div className="flex flex-col gap-3 ">
        {error ? (
          <>
            <p className="text-danger font-semibold text-center text-xl">{error}</p>
            <button onClick={closeModal} className="text-white bg-danger px-2 py-2 rounded font-bold text-xl">
              Close
            </button>
          </>
        ) : (
          <>
            <div className="profile flex justify-center">
              <Image alt="profile" src={image} className="rounded-full" width={100} height={100}></Image>
            </div>
            <div className="detail">
              <h1 className="font-semibold text-2xl text-center uppercase tracking-wider">{username}</h1>
              <p className="text-subtext text-center">{email}</p>
            </div>
            <button
              className="bg-accent text-white px-2 py-2 rounded font-semibold text-xl"
              onClick={async () => {
                const { result, error } = await addFriend(sender.user.email, email);
                toast.promise(addFriend(sender.user.email, email), {
                  error: error,
                  success: result,
                  pending: "Sending Request...",
                });
              }}
            >
              Add Friend <i className="fa-solid fa-plus"></i>
            </button>
            <button onClick={closeModal} className="text-white bg-danger px-2 py-2 rounded font-bold text-xl">
              Close
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

const Dashboard = ({ session, data, totalUser }) => {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [friendData, setFriendData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const searchFriend = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/account/search", {
        email,
        sender: session,
      });

      const { data } = res.data;
      setFriendData(data);
      openModal();
    } catch (error) {
      setFriendData(error.response.data);
      openModal();
    }
  };

  if (status === "authenticated") {
    return (
      <main id="root">
        <ToastContainer />

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
              <form className="w-full lg:w-1/3 text-xl flex gap-2 items-center mt-5 border border-subtext px-3 rounded">
                <button
                  type="submit"
                  onClick={(e) => {
                    searchFriend(e);
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass text-subtext"></i>
                </button>
                <input type="email" className="border h-full w-full focus:outline-none py-1 px-1" placeholder="Find People" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </form>

              {friendData ? (
                friendData.error ? (
                  <FriendModal error={friendData.error} isOpen={modalIsOpen} closeModal={closeModal} sender={session} />
                ) : (
                  <FriendModal username={friendData.username} email={friendData.email} image={friendData.images?.profile?.url || friendData.images?.profile?.buffer} isOpen={modalIsOpen} closeModal={closeModal} sender={session} />
                )
              ) : (
                <></>
              )}
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

const addFriend = async (senderEmail, recipientEmail) => {
  try {
    const res = await axios.post("/api/account/add", {
      sender: senderEmail,
      recipient: recipientEmail,
    });

    console.log(res.data);

    return res.data;
  } catch (error) {
    return error.message;
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
