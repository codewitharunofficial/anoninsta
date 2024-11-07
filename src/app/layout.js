import localFont from "next/font/local";
import "./globals.css";
import Header from "@/Components/Header";
import { UserProvider } from "@/context/UserConext";
import { TabsProvider } from "@/context/TabContext";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="w-screen h-screen items-center overflow-scroll" style={{paddingTop: "10%", background: "linear-gradient(10deg, rgba(0,212,255,1) 0%, rgba(188,18,223,1) 69%)"}}>
          <UserProvider>
            <TabsProvider>{children}</TabsProvider>
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
