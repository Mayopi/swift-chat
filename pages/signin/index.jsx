import React from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3000";

Chart.register(...registerables);

const UserChart = ({ data }) => {
  // Mengurutkan data berdasarkan tanggal secara menaik
  const sortedData = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Memotong data menjadi 12 bulan terbaru
  const latestData = sortedData.slice(-18);

  // Menghitung jumlah user per bulan untuk data terbaru
  const userCountsByMonth = latestData.reduce((acc, user) => {
    const createdAt = new Date(user.createdAt);
    const month = createdAt.toLocaleString("default", { month: "long" });
    const year = createdAt.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;

    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(userCountsByMonth),
    datasets: [
      {
        label: "Details Per Month",
        data: Object.values(userCountsByMonth),
        fill: false,
        borderColor: "rgb(87, 108, 188)",
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  const options = {
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const LoginPage = ({ users }) => {
  const { data: session, status } = useSession();

  return (
    <main>
      <div className="container my-24 flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <form action="/login" method="POST">
            <h2 className="text-3xl font-bold text-primary uppercase tracking-wider">
              Welcome Back <i className="fa-solid fa-exclamation"></i>
            </h2>
            <p className="text-subtext text-lg">Start Your Conversation Secretly</p>
            <Link href={"/"} className="text-sky-500 hover:underline font-semibold">
              Home
            </Link>

            <label htmlFor="username">
              <p className="text-subtext text-lg mt-3">
                Your Username <span className="text-danger font-bold text-xl">*</span>
              </p>
              <input type="text" id="username" name="username" className="w-full lg:w-2/3 border border-accent rounded text-lg px-2 py-2 " placeholder="John Doe" />
            </label>

            <label htmlFor="email">
              <p className="text-subtext text-lg mt-3">
                Your Email <span className="text-danger font-bold text-xl">*</span>
              </p>
              <input type="email" id="email" name="email" className="w-full lg:w-2/3 border border-accent rounded text-lg px-2 py-2 " placeholder="johndoe@gmail.com" />
            </label>

            <label htmlFor="password">
              <p className="text-subtext text-lg mt-3">
                Your Password <span className="text-danger font-bold text-xl">*</span>
              </p>
              <input type="password" id="password" name="password" className="w-full lg:w-2/3 border border-accent rounded text-lg px-2 py-2 " placeholder="john doe secret" />
            </label>

            <hr className="boder-t border-accent lg:w-2/3 w-full mt-5 opacity-60" />

            {session ? (
              <>
                <p className="text-subtext font-bold">You are already Signed In as {session.user.name}</p>
                <p className="text-subtext">
                  You can access the dashboard{" "}
                  <Link className="text-accent" href="/dashboard">
                    here
                  </Link>
                </p>
                <button type="button" onClick={() => signOut()} className="mt-5 bg-accent text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Sign Out
                </button>
              </>
            ) : status === "loading" ? (
              <div className="w-full lg:w-2/3">
                <Skeleton count={2} />
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="mt-5 bg-white text-accent hover:bg-accent hover:text-white transition border border-accent font-bold py-2 px-4 rounded cursor-pointer w-full lg:w-2/3"
                >
                  <i className="fab fa-google fa-xl"></i> Sign In with Google
                </button>

                <button
                  type="button"
                  onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
                  className="mt-5 bg-accent text-white hover:bg-white hover:text-accent border border-accent transition font-bold py-2 px-4 rounded cursor-pointer w-full lg:w-2/3"
                >
                  <i className="fab fa-discord fa-xl"></i> Sign In with Discord
                </button>
              </>
            )}
          </form>
        </div>
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
          <UserChart data={users} />
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const response = await axios.get("/api/account");

  const modifiedUsers = response.data.users.map((user) => {
    return {
      username: user.username,
      createdAt: user.createdAt.toString(),
    };
  });

  if (!session) {
    return {
      props: {
        users: modifiedUsers,
      },
    };
  }

  return {
    redirect: {
      destination: "/dashboard",
    },
  };
}

export default LoginPage;
