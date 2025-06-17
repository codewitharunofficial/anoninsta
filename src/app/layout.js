import localFont from "next/font/local";
import "./globals.css";
import Header from "@/Components/Header";
import { UserProvider } from "@/context/UserConext";
import { TabsProvider } from "@/context/TabContext";
import logo from "./logo.webp";
import { HighlightsProvider } from "@/context/Highlights";
import Footer from "@/Components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "An Anonymous Instagram Profile Viewer",
  description:
    "It's an Anonymous Instagram Story Viewer App where user can watch instgram stories of any public user with letting knowing them by searching the username on the app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main
          className="h-screen sm:flex-1 md:flex-1 w-screen items-center overflow-auto scroll-pb-4"
          style={{
            paddingTop: "20%",
            background:
              "linear-gradient(10deg, rgba(0,212,255,1) 0%, rgba(188,18,223,1) 69%)",
          }}
        >
          <HighlightsProvider>
            <UserProvider>
              <div className="flex flex-col md:flex-row gap-1 w-full items-center justify-center mb-3 md:mb-10">
                <img src={logo?.src} className="w-20 h-20 md:h-20 rounded-xl" />
                <h3 className="text-center md:text-3xl text-xl m-5 text-white font-bold underline underline-offset-4">
                  Anonymous Instagram Viewer
                </h3>
              </div>
              <TabsProvider>{children}</TabsProvider>
            </UserProvider>
          </HighlightsProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
