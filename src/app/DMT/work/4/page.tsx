import styles from "./page.module.css";
import Section from "@/components/Section";
import CalculatorLab4 from "@/components/Calculators/DMT/CalculatorLab4";

export default function Lab1() {
    return (<>
        <h1 className={styles.h1}>
            Використання методу аналізу ієрархій для вирішення задач системного аналізу
        </h1>

        <Section title={"Мета"}><p>
            Сформувати навички розпізнавання типів задач
            системного аналізу, які можуть бути вирішені з використанням
            методу аналізу ієрархій, які мають один або кілька критеріальних
            рівні.
        </p></Section>

        <Section title={"Завдання"}><p>
            Побудувати програмний засіб (ПЗ) згідно варіанту (темі випускної роботи)
        </p></Section>

        <h1 className={styles.h1}>Калькулятор</h1>

        <CalculatorLab4/>
    </>);
}
