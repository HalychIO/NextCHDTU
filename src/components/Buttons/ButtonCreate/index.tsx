import styles from "./index.module.css";

export default function ButtonCreate({clickFunction, title}: { clickFunction: () => void, title: string }) {
    return (
        <button
            className={styles.button}
            onClick={clickFunction}
        >
            {title}
        </button>
    );
}