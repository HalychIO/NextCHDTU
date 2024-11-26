import styles from "./page.module.css";
import Section from "@/components/Section";
import CalculatorLab3 from "@/components/Calculators/ZITM/CalculatorLab3";

export default function Lab1() {


    return (<>
        <h1 className={styles.h1}>Індуктивний метод машинного навчання. Розробка аналітичної моделі системи
            методом групового обліку аргументів</h1>

        <Section title={"Мета"}><p>
            Закріпити навички машинного навчання моделей за багаторядним алгоритмом МГУА (GMDH).
        </p></Section>

        <Section title={"Завдання"}><p>
            Розробити програмний комплекс для створення інформаційних алгебраїчних
            моделей складних систем із визначенням точності моделі. Протестувати комплекс на
            прикладі відповідно свого варіанту Комплекс повинен містити індивідуальні особливості,
            що характеризують розробника для доведення індивідуальності виконаної роботи.
        </p></Section>

        <h2 className={styles.h1}>Результат проведеної роботи</h2>

        <CalculatorLab3/>
    </>);
}
