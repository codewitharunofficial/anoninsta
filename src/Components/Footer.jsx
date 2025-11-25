import { FooterItems } from "../Utilities/footeritems";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen bg-blue-500 dark:bg-blue-600 py-6 px-5 
      flex flex-col sm:flex-row flex-wrap justify-center sm:justify-around 
      items-center gap-4">

      {FooterItems.map((link) =>
        link.type === "internal" ? (
          <Link
            key={link.id}
            href={link.href}
            className="text-black dark:text-white hover:underline underline-offset-2 
              hover:text-white transition-all"
          >
            {link.title}
          </Link>
        ) : (
          <a
            key={link.id}
            href={link.href}
            target={link.target}
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:underline underline-offset-2 
              hover:text-white transition-all"
          >
            {link.title}
          </a>
        )
      )}
    </footer>
  );
};

export default Footer;
