import {IOptions} from "@/interfaces";
import styles from "./index.module.css"

export function Select(
    {
        label,
        value,
        options,
        selectionValue
    }: {
        label: string,
        value: string,
        options: IOptions[],
        selectionValue: (value: string) => void
    }) {

    return (
        <label className={styles.SelectTitle}>
            {label}
            <select
                className={styles.Select}
                value={value}
                onChange={(e) => selectionValue(e.target.value)}
            >
                {options.map((el, index) => (
                    <option key={'option' + index} value={el.value}>{el.text}</option>
                ))}
            </select>
        </label>

    );
}