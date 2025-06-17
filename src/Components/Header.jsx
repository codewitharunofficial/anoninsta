import React from "react";
import Link from "next/link";
import icon from "../app/icon.png";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <nav
      className="bg-blue-500 dark:bg-blue-950 border-white-200 dark:bg-white-900"
      style={{
        position: "fixed",
        marginBottom: "5%",
        top: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-black">
            InsecView
          </span>
          <img src={icon.src} className="h-8 rounded-lg" alt="Logo" />
        </Link>
        <a
          className="text-black dark:text-white flex flex-row gap-3 hover:underline underline-offset-4"
          href={"https://github.com/codewitharunofficial"}
          target="_blank"
        >
          <FaGithub className="text-black dark:text-white underline underline-offset-auto" size={20} /> Github
        </a>
      </div>
    </nav>
  );
};

export default Header;
