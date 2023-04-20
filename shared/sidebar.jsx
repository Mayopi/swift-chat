import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DashboardSideBar = ({ session }) => {
  const [open, setOpen] = useState(true);

  const menus = [
    {
      title: "Messages",
      icon: "message",
      link: "/dashboard/message",
    },

    {
      title: session.user.name,
      icon: "user",
      link: `/dashboard/${session.user.email}`,
    },

    {
      title: "Settings",
      icon: "gear",
      link: "/dashboard/settings",
    },
  ];
  return (
    <div className="flex">
      <div className={`bg-primary h-screen p-5 py-8 ${open ? "w-72" : "w-20"}`}>
        <div className="p-3 hover:bg-subtext rounded">
          <Link href={"/"}>
            <div className="logo flex gap-2 items-center cursor-pointer">
              <Image src="/images/logo-transparent.png" width={40} height={40} />
              <h1 className="text-2xl semi-bold text-white">SwiftChat</h1>
            </div>
          </Link>
        </div>

        <div className="p-3 bg-subtext bg-opacity-50 text-white rounded flex gap-2 items-center mt-5">
          <button>
            <i className="fa-solid fa-search text-lg"></i>
          </button>
          <input type="text" name="" id="" className="bg-transparent focus:outline-none text-lg" />
        </div>

        <hr className="border-t-subtext my-5 opacity-70" />

        <div className="sidebar-item flex flex-col gap-3">
          {menus.map((menu, index) => (
            <Link href={menu.link} key={index}>
              <div className="items flex gap-2 text-white px-2 py-2 rounded hover:bg-subtext cursor-pointer hover:bg-opacity-50">
                <button>
                  <i className={`fa-solid fa-${menu.icon} text-lg`}></i>
                </button>
                <p className="text-lg">{menu.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <hr className="border-t-subtext my-5 opacity-70" />

        <div onClick={signOut} className="signout cursor-pointer hover:bg-subtext hover:bg-opacity-50 flex gap-2 text-white px-2 py-2 items-center rounded">
          <i className="fa-solid fa-right-to-bracket text-lg"></i>
          <p className="text-lg">Sign Out</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
