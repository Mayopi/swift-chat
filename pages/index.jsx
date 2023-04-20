import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const FeatureItem = ({ icon, heading, content }) => {
  return (
    <div className="feature-item flex items-center gap-2 bg-white rounded px-2 py-2 min-w-[400px] hover:cursor-pointer">
      <i className={`fa-solid fa-${icon} text-5xl text-accent`}></i>
      <div className="description">
        <h1 className="text-primary text-lg">{heading}</h1>
        <p className="text-secondary opacity-80">{content}</p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Head>
        <title>Swift Chat</title>
      </Head>
      <section className="hero my-10 bg-white">
        <div className="container flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <h1 className="text-primary font-bold text-4xl">Simple Realtime Chat App</h1>
            <p className="text-accent font-bold my-2">This is a Project Based Learning building Realtime Chat Application for Nextjs</p>
            <p className="text-primary opacity-80">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit ipsa voluptate saepe quis minus sapiente, ducimus deserunt in eaque totam odio numquam blanditiis. Totam dolorum reiciendis dolor inventore placeat sed.
            </p>

            <div className="button-container flex gap-3 my-5">
              <Link href={"/signin"}>
                <button className="text-white bg-accent text-lg rounded px-2 py-2 min-w-[120px] font-bold">Get Started</button>
              </Link>

              <Link href={"/demo"}>
                <button className="text-secondary bg-inherit px-2 py-2 rounded min-w-[120px] font-bold text-lg border border-accent">Demo</button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center flex-col">
            <Image src={"/images/chat-flat.jpg"} width={350} height={350} alt="chat illustration" />
            <p className="text-secondary opacity-80">
              <a target="__blank" href="https://www.freepik.com/free-vector/people-talking-dating-app-concept-illustration_5453421.htm#query=chat%20flat%20illustrator&position=25&from_view=search&track=ais">
                Image by pikisuperstar
              </a>{" "}
              on Freepik
            </p>
          </div>
        </div>
      </section>

      <section className="feature mt-10 bg-background">
        <div className="container flex flex-wrap py-5">
          <div className="w-full lg:w-1/3">
            <div className="card-feature-image rounded-lg overflow-hidden flex flex-col gap-2 justify-center items-center bg-white">
              <Image src={"/images/feature-flat.jpg"} className="w-full h-full" width={500} height={500} alt="feature illustration" />
              <p className="text-secondary opacity-80">
                <a target="__blank" href="https://www.freepik.com/free-vector/storyboard-illustration-concept_10623584.htm#query=feature%20flat%20illustrator&position=9&from_view=search&track=ais">
                  Image by pikisuperstar
                </a>{" "}
                on Freepik
              </p>
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex flex-wrap gap-2 justify-center mt-5">
            <FeatureItem icon={"stopwatch"} heading={"Low Latency"} content={"Provides Low Latency on your Message each !"} />
            <FeatureItem icon={"bolt"} heading={"Blazingly Fast"} content={"Rendering you Content in Server Side Rendering"} />
            <FeatureItem icon={"bell-concierge"} heading={"Served Thousand"} content={"Serving Thousand of User every month !"} />
            <FeatureItem icon={"lock"} heading={"Privacy Lover"} content={"We Respect your Privacy"} />
          </div>

          <p className="text-secondary opacity-80 mt-5">
            Learn more about Our{" "}
            <Link href={"/policy"} className="text-sky-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </section>

      <footer className="bg-accent py-6">
        <div className="container mx-auto px-4 flex gap-2 flex-wrap justify-between items-center">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <p className="text-white font-bold">SwiftChat</p>
            <p className="text-gray-400 text-sm">A simple and secure chat application built with Next.js, Socket.io, and MongoDB.</p>
          </div>
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <p className="text-white font-bold mb-2">Contact Us</p>
            <ul className="text-gray-400 text-sm">
              <li>Email: support@realtimechatapp.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Main Street, Anytown, USA</li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <p className="text-white font-bold mb-2">Follow Us</p>
            <div className="flex items-center">
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-4 text-center">
          <p className="text-gray-400 text-sm">© 2023 SwiftChat. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
