import styles from "./index.module.css"

export default function ColumTable({colum}: {
    colum: Array<string | number>,
}) {
    return (
        <td className={styles.columTable}>
            {colum.map((cell, index) => (
                <p key={"cellKay" + index}> {cell}</p>
            ))}
        </td>
    );
}