import { FooterItems } from "@/Utilities/footeritems";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen h-40 sm:h-24 bg-blue-500 dark:bg-blue-950 p-3 flex flex-col sm:flex-row md:flex-row gap-3 sm:justify-around sm:px-24 items-center">
      {FooterItems.map((link, index) =>
        link.type === "internal" ? (
          <a
            key={link.id}
            href={link.href}
            target={link.target}
            className="text-black dark:text-white hover:underline underline-offset-2"
          >
            {link.title}
          </a>
        ) : (
          <Link
            key={link.id}
            href={link.href}
            target={link.target}
            className="text-black dark:text-white hover:underline underline-offset-2"
          >
            {link.title}
          </Link>
        )
      )}
    </footer>
  );
};

export default Footer;
