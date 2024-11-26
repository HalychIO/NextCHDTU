import {ILink} from "@/interfaces";
import styles from "@/app/DMT/work/page.module.css";
import SubNavLab from "@/components/Navigate/SubNavLab";

export default function WorkLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

    const ArrLinks: ILink[] = [
        {href: "/DMT/work/1", text: "LW1",},
        {href: "/DMT/work/2", text: "LW2",},
        {href: "/DMT/work/3", text: "LW3",},
        {href: "/DMT/work/4", text: "LW4",},
        {href: "/DMT/work/5", text: "LW5",},
        {href: "/DMT/work/6", text: "LW6",},
        {href: "/DMT/work/7", text: "LW7",},
    ];

    return (<div className={styles.page}>
            <SubNavLab Links={ArrLinks}/>
            <main className={styles.main}>
                <div className={styles.Content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
