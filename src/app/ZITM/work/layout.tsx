import {ILink} from "@/interfaces";
import styles from "@/app/ZITM/work/page.module.css";
import SubNavLab from "@/components/Navigate/SubNavLab";

export default function WorkLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

    const ArrLinks: ILink[] = [
        {href: "/ZITM/work/1", text: "LW1",},
        {href: "/ZITM/work/2", text: "LW2",},
        {href: "/ZITM/work/3", text: "LW3",},
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