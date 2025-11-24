import localFont from "next/font/local";
import "./globals.css";
import Header from "../Components/Header";
import { UserProvider } from "../context/UserConext";
import { TabsProvider } from "../context/TabContext";
import { HighlightsProvider } from "../context/Highlights";
import Footer from "../Components/Footer";

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
  title: "Instagram Profile Viewer | InsecView",
  description:
    "View Instagram stories and profiles anonymously using InsecView. No login required. Fast, secure and private.",
  keywords: [
    "Instagram viewer",
    "anonymous instagram viewer",
    "insta story viewer",
    "view instagram profiles",
    "public instagram viewer",
    "insecview",
    "iganony",
    "anonyig",
  ],
  robots: "index, follow",
  metadataBase: new URL("https://insecview.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "InsecView - Anonymous Instagram Profile Viewer",
    description: "View Instagram stories and profiles anonymously.",
    url: "https://insecview.vercel.app",
    siteName: "InsecView",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InsecView Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InsecView",
    description: "View Instagram stories and profiles anonymously.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col w-full overflow-x-hidden bg-gradient-to-br from-cyan-400 to-purple-600`}
      >
        <Header />

        <main className="flex-1 w-full pt-20 md:pt-28 px-4">
          <HighlightsProvider>
            <UserProvider>
              {/* Top Section */}
              <div className="flex flex-col md:flex-row gap-2 items-center justify-center mb-12">
                <img
                  src="/og-image.jpg"
                  className="w-20 h-20 rounded-xl shadow-lg"
                  alt="Insecview logo"
                />
                <h1 className="text-center text-2xl md:text-4xl text-white font-bold underline underline-offset-4">
                  Anonymous Instagram Profile Viewer
                </h1>
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
