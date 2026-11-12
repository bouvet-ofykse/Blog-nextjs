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
        <html lang="nb" suppressHydrationWarning>
        <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: `(() => {
                const theme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                document.documentElement.classList.toggle(
                    "dark",
                    theme === "dark" || ((!theme || theme === "system") && prefersDark)
                );
            })();` }} />
        </head>
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
