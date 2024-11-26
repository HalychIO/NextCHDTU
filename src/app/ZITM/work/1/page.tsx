import styles from "./page.module.css";
import CalculatorLab1 from "../../../../components/Calculators/ZITM/CalculatorLab1";
import Section from "@/components/Section";

export default function Lab1() {


    return (<>
        <h1 className={styles.h1}>Формування первинного опису об’єкта спостереження за технологією
            машинного навчання. Формалізація умови задачі.</h1>

        <Section title={"Мета"}><p>
            Закріплення навичок формалізації умови задачі при формуванні первинного
            опису об’єкта спостереження за технологією машинного навчання.
        </p></Section>

        <Section title={"Завдання"}><p>
            За індивідуальним завданням використати табличний метод для
            формалізації умови задачі системного аналізу та розв’язати цю задачу графічним методом.
        </p></Section>

        <h2 className={styles.h1}>Результат проведеної роботи</h2>

        <CalculatorLab1/>
    </>);
}
