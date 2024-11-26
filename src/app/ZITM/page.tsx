import styles from "./page.module.css";
import LabLink from "@/components/Link/LabLink";

export default function ZITM() { // AIMLT
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1> Application of inductive machine learning technologies </h1>
                <h2> Застосування індуктивних технологій машинного навчання </h2>
                <LabLink link={"/ZITM/work/1"} title={"Лабораторна робота 1"} subtitle={"ttt"}/>
                <LabLink link={"/ZITM/work/2"} title={"Лабораторна робота 2"} subtitle={"ttt"}/>
                <LabLink link={"/ZITM/work/3"} title={"Лабораторна робота 3"} subtitle={"ttt"}/>
            </main>
        </div>
    );
}
