import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillProject, AiOutlineComment } from "react-icons/ai";
import { BiLogoBlogger, BiMoney, BiSolidDashboard } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";

export const Sidebar = () => {
  const Menus = [
    {
      title: "Dashboard",
      icon: <BiSolidDashboard size={25} />,
      link: "/admin",
    },
    {
      title: "Funding",
      icon: <BiMoney size={25} />,
      link: "/admin/funding",
    },
    {
      title: "Projects",
      icon: <AiFillProject size={25} />,
      link: "/admin/projects",
    },
    { title: "Blogs", icon: <BiLogoBlogger size={25} />, link: "/admin/blogs" },
    { title: "Donors", icon: <FaDonate size={25} />, link: "/admin/donors" },
    {
      title: "Comments",
      icon: <AiOutlineComment size={25} />,
      link: "/admin/comments",
    },
  ];
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-52" : "w-20"
        } relative h-screen bg-white p-5 pt-8 text-gray-700 shadow duration-300`}
      >
        <img
          src="https://static.thenounproject.com/png/1535376-200.png"
          className={`absolute -right-4 top-9 w-7 cursor-pointer rounded-full border-2 bg-white ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center gap-x-4">
          <img
            src="/gsi-logo.png"
            className={`cursor-pointer duration-500 ${
              open && "h-16 w-16 rotate-[360deg]"
            }`}
          />
          <h1
            className={`origin-left text-xl font-semibold text-gray-800 duration-200 ${
              !open && "scale-0"
            }`}
          >
            ADMIN
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link key={index} href={Menu.link}>
              <li
                className={`text-medium my-6 flex cursor-pointer items-center gap-x-4 rounded-md p-2 ${
                  Menu.link === router.pathname
                    ? "bg-blue-800 text-white"
                    : "hover:bg-blue-800 hover:text-white"
                }`}
              >
                {Menu.icon}
                <span
                  className={`ml-2 ${
                    !open && "hidden"
                  } origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
