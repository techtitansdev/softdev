import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GiImpactPoint } from "react-icons/gi";
import { BiLogoBlogger } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { FaPeopleCarry } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

const navigationLinks = [
  { path: "/", text: "HOME", icon: <AiOutlineHome size={22} /> },
  { path: "/about-us", text: "ABOUT US", icon: <FaUsers size={22} /> },
  { path: "/blogs", text: "BLOGS", icon: <BiLogoBlogger size={22} /> },
  { path: "/impact", text: "IMPACT", icon: <GiImpactPoint size={22} /> },
  { path: "/projects", text: "PROJECTS", icon: <GoProjectSymlink size={22} /> },
  { path: "/partners", text: "PARTNERS", icon: <FaPeopleCarry size={22} /> },
];

export const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navBackground = isScrolled ? "bg-white" : "bg-transparent";
  const { signOut } = useClerk();

  const handleNav = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const { user } = useUser();
  console.log(user);
  return (
    <nav
      className={`w-full pt-2 ${navBackground} ${
        isScrolled ? "rounded-b-3xl shadow" : ""
      } fixed top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-full w-full items-center justify-between px-4">
        <Link href="/home">
          <img
            src="gsi-logo2.png"
            height={90}
            width={90}
            alt="logo"
            className="cursor-pointer"
          />
        </Link>

        {/* Navigation for lg to xl view */}
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <ul className="lg:flex">
            {navigationLinks.map((link) => (
              <li key={link.path} className="text-md my-6 ml-10">
                <Link
                  href={link.path}
                  className={`font-semibold text-blue-600 ${
                    router.pathname === link.path
                      ? "border-b-4 border-blue-600 py-2"
                      : ""
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden justify-end lg:flex">
          {user && (
            <button
              className="mx-4 rounded bg-blue-700 px-6 py-2 font-bold text-white hover:bg-blue-800"
              onClick={() => signOut(() => router.push("/"))}
            >
              Sign out
            </button>
          )}
          {!user && (
            <Link
              href="/dashboard"
              className="mx-4 rounded bg-blue-700 px-6 py-2 font-bold text-white hover:bg-blue-800"
            >
              LOG IN
            </Link>
          )}
        </div>

        {/* Hamburger menu */}
        <div className="lg:hidden">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Dropdown menu for sm to md view */}
      <div
        className={`fixed left-0 top-0 h-screen w-full transform bg-white ${
          menuOpen
            ? "translate-y-0 transition-transform ease-in"
            : "-translate-y-full"
        } px-4 py-2 duration-500 lg:hidden`}
      >
        {/* Close button for sm to md view */}
        <div className="mb-4 flex items-center justify-between">
          <img
            src="gsi-logo2.png"
            height={90}
            width={90}
            alt="logo"
            className="cursor-pointer"
          />
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div>
        </div>

        {/* Navigation links for sm to md view */}
        <div className="flex-col px-4 py-4">
          <ul>
            {navigationLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div
                  className="flex items-center justify-between"
                  onClick={closeMenu}
                >
                  <li className="flex cursor-pointer items-center text-base text-gray-800">
                    <span className="ml-6">{link.icon}</span>
                    <span className="ml-6"> {link.text}</span>
                  </li>
                  <HiArrowNarrowRight
                    size={34}
                    className="mr-6 rounded-full bg-gray-100 px-2 py-1 transition-transform hover:scale-110"
                  />
                </div>
                <hr className="mx-3 my-5 border-t border-dashed border-gray-500"></hr>
              </Link>
            ))}
            <div className="absolute bottom-0 left-0 w-full py-8 shadow-inner">
              {user && (
                <button
                className="mx-16 rounded-lg bg-blue-700 py-3 text-center text-lg font-bold text-white shadow-md hover:bg-blue-800"
                  onClick={() => signOut(() => router.push("/"))}
                >
                  Sign out
                </button>
              )}
              {!user && (
                <Link href="/sign-in">
                  <li
                    onClick={closeMenu}
                    className="mx-16 rounded-lg bg-blue-700 py-3 text-center text-lg font-bold text-white shadow-md hover:bg-blue-800"
                    style={{ zIndex: 1 }}
                  >
                    LOGIN
                  </li>
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
