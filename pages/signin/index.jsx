import React from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

Chart.register(...registerables);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Details Per Month",
      data: [65, 59, 80, 81, 56, 55, 40],
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

const UserChart = () => {
  return <Line data={data} options={options} />;
};

const LoginPage = () => {
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
              <p>Loading...</p>
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
          <UserChart />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
