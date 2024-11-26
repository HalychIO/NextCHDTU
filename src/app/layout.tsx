import type {Metadata} from "next";
import "./globals.css";
import Header from "@/components/Header";
import {ILink} from "@/interfaces";

export const metadata: Metadata = {
    title: "LC",
    description: "Library calculators",
};

const ArrLinks: ILink[] = [
    {href: "/", text: "Home",},
    {href: "/DMT", text: "DMT",},
    {href: "/ZITM", text: "AIMLT",},
    {href: "/Contact", text: "Contact",},
]

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <Header Links={ArrLinks}/>
        {children}
        </body>
        </html>
    );
}
