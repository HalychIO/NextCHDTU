import styles from "./page.module.css";
import Section from "@/components/Section";
import CalculatorLab2 from "@/components/Calculators/ZITM/CalculatorLab2";

export default function Lab1() {


    return (<>
        <h1 className={styles.h1}>Машинне навчання прогнозних моделей</h1>

        <Section title={"Мета"}><p>
            Закріплення навичок програмної реалізації агентного синтезатора
            прогнозних моделей на основі фільтра Колмогорова-Габора
        </p></Section>

        <Section title={"Завдання"}><p>
            Програмно реалізувати прогнозуючий агент на основі поліному Колмогорова-Габора.
            Дослідити можливість створення прогнозуючої моделі визначного індивідуально реального
            об’єкта за допомогою фільтру Колмогорова–Габора. Визначити порівняльні характеристики
            результатів моделювання, отриманих на основі опорних моделей різного вигляду.
        </p></Section>

        <h2 className={styles.h1}>Результат проведеної роботи</h2>
        
        <CalculatorLab2/>
    </>);
}
