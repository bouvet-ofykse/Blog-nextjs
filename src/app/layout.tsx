import type {Metadata} from "next";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";


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

        </head>
        <body className='antialiased bg-amber-50 dark:bg-gray-900 text-blue-950 dark:text-white flex flex-col min-h-screen' >
        <NavBar></NavBar>
        <div id='content' className='mx-16 my-12 flex-1'>
            {children}
        </div>
        <Footer />
        </body>
        </html>
    );
}
