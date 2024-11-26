import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Теорія прийняття рішень: калькулятори</h1>
                <p>
                    Даний сайт є курсовим проектом для здачі
                    лабораторних робіт з предмету Теорія прийняття рішень.
                </p>
                <p>
                    Тут викладені калькулятори для прийняття рішень та пояснення
                    до логіки їх роботи.
                </p>
            </main>
        </div>
    );
}
