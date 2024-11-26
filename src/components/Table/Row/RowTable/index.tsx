import styles from "./index.module.css";
import CellTitle from "../../Cell/CellTitle";
import React from "react";

export default function RowTable({title, row, setRow}: {
    title: string;
    row: Array<string>,
    setRow: (indexCell: number, value: string | number) => void,
}): React.ReactElement {
    return (
        <tr className={styles.Row}>
            <th className={styles.TitleRow}>{title}</th>
            {row.map((cell, index) => (
                <CellTitle cell={cell} setCell={(value) => setRow(index, value)} key={"CellTable_" + index}/>
            ))}
        </tr>
    );
}