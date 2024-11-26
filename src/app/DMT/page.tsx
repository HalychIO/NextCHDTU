import styles from "./page.module.css";
import LabLink from "@/components/Link/LabLink";

export default function DMT() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1> Decision making theory </h1>
                <h2> Теорія прийняття рішень </h2>
                <LabLink link={"/DMT/work/1"} title={"Лабораторна робота 1"} subtitle={"ttt"}/>
                <LabLink link={"/DMT/work/2"} title={"Лабораторна робота 2"} subtitle={"ttt"}/>
                <LabLink link={"/DMT/work/3"} title={"Лабораторна робота 3"} subtitle={"ttt"}/>
                <LabLink link={"/DMT/work/4"} title={"Лабораторна робота 4"} subtitle={"ttt"}/>
                <LabLink link={"/DMT/work/5"} title={"Лабораторна робота 5"} subtitle={"ttt"}/>
                <LabLink link={"/DMT/work/6"} title={"Лабораторна робота 6"} subtitle={"ttt"}/>
                <LabLink link={"/DMT/work/7"} title={"Лабораторна робота 7"} subtitle={"ttt"}/>
            </main>
        </div>
    );
}
