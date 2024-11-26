import {useEffect, useState} from "react";
import styles from "./index.module.css";

export default function CellValueTable({cell, setCell}: {
    cell: number,
    setCell?: (value: number) => void,
}) {
    const [change, setChange] = useState<boolean>(true);
    const [value, setValue] = useState<number>(cell);

    useEffect(() => {
        if (setCell) setCell(value);
    }, [setCell, value])

    return (<td className={styles.CellTable}>
        {change ? (
            <div
                onDoubleClick={() => {
                    if (setCell) setChange(false)
                }}
            >
                {value}
            </div>
        ) : (
            <input
                type={"number"}
                autoFocus={true}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                onBlur={() => {
                    if (setCell) setChange(true);
                }}
            />
        )}
    </td>);
}