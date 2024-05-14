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
  { path: "/home", text: "HOME", icon: <AiOutlineHome size={22} /> },
  { path: "/about-us", text: "ABOUT US", icon: <FaUsers size={22} /> },
  { path: "/blogs", text: "BLOGS", icon: <BiLogoBlogger size={22} /> },
  { path: "/impact", text: "IMPACT", icon: <GiImpactPoint size={22} /> },
  { path: "/projects", text: "PROJECTS", icon: <GoProjectSymlink size={22} /> },
  { path: "/partners", text: "PARTNERS", icon: <FaPeopleCarry size={22} /> },
];

export const Navbar = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const navBackground = isScrolled ? "bg-white" : "bg-transparent";

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

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial check for mobile view on mount
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const { user } = useUser();

  return (
    <nav
      className={`w-full pt-2 ${navBackground} ${
        isScrolled ? "rounded-b-2xl shadow" : ""
      } fixed top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-full w-full items-center justify-between px-4">
        {isMobileView ? (
          <Link href="/">
            <img
              src="/gsi-logo2.png"
              height={55}
              width={55}
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
        ) : (
          <Link href="/">
            <img
              src="/gsi-logo2.png"
              height={90}
              width={90}
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
        )}
        {/* Navigation for lg to xl view */}
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <ul className="lg:flex">
            {navigationLinks.map((link) => (
              <li key={link.path} className="text-md my-6 ml-10">
                <Link
                  href={link.path}
                  className={`font-semibold text-[#0053F1] ${
                    router.pathname === link.path
                      ? "border-b-4 border-[#0053F1] py-2"
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
          <div className="mr-4">
            {user && <UserButton afterSignOutUrl="/home" />}
          </div>

          {!user && (
            <Link
              href="/login"
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
            src="/gsi-logo2.png"
            height={55}
            width={55}
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
                  <li className="flex cursor-pointer items-center text-base font-medium text-[#07549C]">
                    <span className="ml-6">{link.icon}</span>
                    <span className="ml-6"> {link.text}</span>
                  </li>
                  <HiArrowNarrowRight
                    size={34}
                    className="mr-6 rounded-full bg-gray-100 px-2 py-1 text-[#07549C] transition-transform hover:scale-110"
                  />
                </div>
                <hr className="mx-3 my-5 border-t border-dashed border-gray-500"></hr>
              </Link>
            ))}

            <div className="absolute bottom-0 left-0 w-full py-8 shadow-inner">
              <div className="flex items-center justify-center">
                {user && (
                  <button
                    className="mx-16 w-full min-w-[400px] rounded-lg bg-blue-700 py-3 text-center text-lg font-bold text-white shadow-md hover:bg-blue-800"
                    onClick={() => signOut(() => router.push("/"))}
                    //data-testid="sign-out"
                  >
                    Sign out
                  </button>
                )}
              </div>
              {!user && (
                <Link href="/login">
                  <li
                    onClick={closeMenu}
                    className="mx-16 min-w-[400px] rounded-lg bg-blue-700 py-3 text-center text-lg font-bold text-white shadow-md hover:bg-blue-800"
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