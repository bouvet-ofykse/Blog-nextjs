import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Olav Fykse",
    description: "A personal journey to learn React and Nexjs",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet"/>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-50 dark:bg-gray-900 text-blue-950 dark:text-white flex flex-col min-h-screen`} >
        <NavBar></NavBar>
        <div id='content' className='mx-16 my-12 flex-1'>
            {children}
        </div>
        <Footer />
        </body>
        </html>
    );
}
