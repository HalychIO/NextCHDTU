import React, {ReactNode} from "react";
import styles from "./index.module.css";

export default function Section({children, title}: { children: ReactNode, title: string }): React.ReactElement {
    return (
        <section className={styles.Section}>
            <h2 className={styles.Title}>{title}</h2>
            {children}
        </section>
    );
}