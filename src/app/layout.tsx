import type {Metadata} from "next";
import "./globals.css";
import NavBar from "@/components/nav-bar/nav-bar";
import Footer from "@/components/footer/footer";
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
    title: "Olav Fykse",
    description: "Prosjekter, notater og eksperimenter fra Olav Fykse.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nb">
        <body id='body'>
        <NavBar></NavBar>
        <div id='main-content'>
            {children}
        </div>
        <Footer />
        <Analytics />
        </body>
        </html>
    );
}
