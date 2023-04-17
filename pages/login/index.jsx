"use client";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "../shared/login-btn";

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

            {/* {status === "authenticated" && (
              <div>
                <p>Signed in as {session.user.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
              </div>
            )}
            {status === "unauthenticated" && (
              <button onClick={() => signIn("google")} className="w-full lg:w-2/3 font-bold text-white bg-subtext rounded px-2 py-2">
                <i className="fab fa-google fa-lg"></i> Sign In With Google
              </button>
            )} */}

            <Login />

            {/* <div className="lg:w-2/3 mt-5">
              <button className="text-white bg-accent w-full min-h-[40px] rounded py-2 px-2 font-bold uppercase tracker-wider text-xl">
                Sign In <i className="fa-solid fa-right-to-bracket"></i>
              </button>
            </div> */}
          </form>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mt-10 lg:mt-0">
          <h1 className="text-primary text-xl">Total User</h1>
          <UserChart />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
