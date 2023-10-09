"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";

export default function RootLayout({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`flex justify-center items-center flex-col relative w-full h-full bg-primary-grey dark:bg-secondary-white-97  viewHeight`}
      >
        <ThemeProvider attribute="class">
          <Header />
          <NavMenu />
          <div
            className={` 2xl:max-w-[1440px] w-full mt-[10vh] text-secondary-white dark:text-primary-grey px-5 sm:px-7`}
          >
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
