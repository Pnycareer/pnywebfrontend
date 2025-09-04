import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import CoursesNav from "@/components/Navbar/CoursesNav";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Whatsapp from "@/components/whatsapp/Whatsapp";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />

        <meta
          name="google-site-verification"
          content="V1XnCS_3kKIZY1cTkolGmqLipxnJbx2GB7X4RMxRZkc"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual'",
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <CoursesNav />
        <Whatsapp/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
