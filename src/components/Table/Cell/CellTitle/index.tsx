import {useEffect, useState} from "react";
import styles from "./index.module.css";
import ButtonDelete from "@/components/Buttons/ButtonDelete";

export default function CellTitle({cell, setCell, deleteCell}: {
    cell: string,
    setCell?: (value: string) => void,
    deleteCell?: () => void,
}) {
    const [change, setChange] = useState<boolean>(true);
    const [value, setValue] = useState<string>(cell);

    useEffect(() => {
        if (!!setCell) setCell(value);
    }, [setCell, value])

    return (<th
        className={styles.CellTable}
    >
        <div>
            {change ? (
                <div
                    onDoubleClick={() => {
                        if (!!setCell) setChange(false);
                    }}
                >{!!setCell ? value : cell}</div>
            ) : (
                <input
                    autoFocus={true}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={() => {
                        if (!!setCell) setChange(true);
                    }}
                />
            )}
            {deleteCell && <ButtonDelete deleteCell={deleteCell}/>}
        </div>

    </th>);
}