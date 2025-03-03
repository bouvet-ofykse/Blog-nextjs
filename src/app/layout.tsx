import type {Metadata} from "next";
import "./globals.css";
import NavBar from "@/components/nav-bar/nav-bar";
import Footer from "@/components/footer/footer";


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
        <head title='Olav Fykse'>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body id='body'>
        <NavBar></NavBar>
        <div id='main-content'>
            {children}
        </div>
        <Footer />
        </body>
        </html>
    );
}
