import styles from "./index.module.css";

export default function ButtonDelete({deleteCell}: { deleteCell?: () => void }) {
    return (
        <button
            className={styles.button}
            onClick={() => !!deleteCell ? deleteCell() : () => {
            }}
        >
            X
        </button>
    );
}