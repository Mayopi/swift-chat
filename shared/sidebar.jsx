import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DashboardSideBar = ({ session }) => {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredMenu = menus.filter((menu) => menu.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex">
      <div className={`bg-primary h-screen ${open ? "py-5" : "py-2.5"} py-8 ${open ? "w-72" : "w-20"} duration-300`}>
        {/* Logo  */}
        <div className="p-3 hover:bg-subtext rounded cursor-pointer flex gap-2 relative">
          <Link href={"/"}>
            <div className="logo flex gap-2 items-center">
              <Image src="/images/logo-transparent.png" className="duration-300" width={open ? 40 : 60} height={open ? 40 : 60} />
              <h1 className={`text-2xl semi-bold text-white ${open ? "" : "scale-0"} duration-300`}>SwiftChat</h1>
            </div>
          </Link>
          <button className="text-white bg-accent rounded-full min-w-[40px] min-h-[40px] py-2 px-2 absolute -right-12" onClick={() => setOpen(!open)}>
            <i className={`fa-solid fa-arrow-left text-xl ${!open && "rotate-180"} duration-300`}></i>
          </button>
        </div>

        {/* Profile */}

        <div className="p-3 text-white rounded flex gap-2 items-center">
          <Image src={session.user.image} alt="profile" className="rounded-full duration-300" width={open ? 40 : 50} height={open ? 40 : 50} />
          <h1 className={`text-semibold text-2xl ${open ? "" : "scale-0"} duration-300`}>{session.user.name}</h1>
        </div>

        {/* Search Box */}

        <div className={`p-3 m-2 ${open ? "bg-subtext" : "bg-inherit m-0"} bg-opacity-50 text-white rounded-full flex gap-2 items-center mt-5`}>
          <button onClick={() => document.getElementById("searchInput").focus()} className={`${open ? "" : "hover:bg-subtext px-3 py-3 rounded"} duration-300`}>
            <i className={`fa-solid fa-search ${open ? "texl-lg" : "text-2xl"}`}></i>
          </button>
          <input
            type="text"
            name=""
            id="searchInput"
            className={`bg-transparent focus:outline-none text-lg ${open ? "" : "scale-0"} duration-300`}
            placeholder={open ? "Search" : ""}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpen(true)}
          />
        </div>

        <hr className="border-t-subtext my-5 opacity-70" />

        {/* Sidebar Item */}

        <div className="sidebar-item flex flex-col justify-center gap-3">
          {filteredMenu !== ""
            ? filteredMenu.map((item, index) => (
                <Link href={item.link} key={index}>
                  <div className={`items flex gap-2 text-white ${open ? "px-2.5 py-2" : "px-5 py-4"} rounded hover:bg-subtext cursor-pointer hover:bg-opacity-50`}>
                    <button>
                      <i className={`fa-solid fa-${item.icon} ${open ? "text-lg" : "text-2xl"} duration-300`}></i>
                    </button>
                    <p className={`text-lg ${open ? "" : "hidden"} duration-300`}>{item.title}</p>
                  </div>
                </Link>
              ))
            : menus.map((menu, index) => (
                <Link href={menu.link} key={index}>
                  <div className={`items flex gap-2 text-white ${open ? "px-2.5 py-2" : "px-5 py-4"} rounded hover:bg-subtext cursor-pointer hover:bg-opacity-50`}>
                    <button>
                      <i className={`fa-solid fa-${menu.icon} ${open ? "text-lg" : "text-2xl"} duration-300`}></i>
                    </button>
                    <p className={`text-lg ${open ? "" : "hidden"} duration-300`}>{menu.title}</p>
                  </div>
                </Link>
              ))}
        </div>

        <hr className="border-t-subtext my-5 opacity-70" />

        <div onClick={signOut} className={`signout cursor-pointer hover:bg-subtext hover:bg-opacity-50 flex gap-2 text-white ${open ? "px-2.5 py-2" : "px-5 py-4"} items-center rounded`}>
          <i className={`fa-solid fa-right-to-bracket ${open ? "text-lg" : "text-2xl"} duration-300`}></i>
          <p className={`text-lg ${open ? "" : "hidden"}`}>Sign Out</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
