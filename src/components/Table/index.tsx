import styles from "./index.module.css";
import React from "react";
import RowTitleColumns from "@/components/Table/Row/RowTitleColumns/index";
import Rows from "@/components/Table/Row/Rows/index";
import {ITableColumnTitle, ITableRows} from "@/interfaces";

export default function Table(
    {
        title,

        rows,
        titleRows,
        deleteRows,
        changeRowsName,
        changeRowsColumnValue,

        columns,
        titleColumn,
        deleteColumn,
        changeColumnName,
    }: {
        title?: string,

        rows: ITableRows[],
        titleRows?: string,
        deleteRows?: (ID: number) => void,
        changeRowsName?: (id: number, newValue: string) => void,
        changeRowsColumnValue?: (idRow: number, idColumn: number, newValue: number) => void,

        columns: ITableColumnTitle[],
        titleColumn?: string,
        deleteColumn?: (ID: number) => void,
        changeColumnName?: (id: number, newValue: string) => void,
    }): React.ReactElement {
    return (<table className={styles.Table}>
        {!!title && (<caption className={styles.Caption}><h3> {title} </h3></caption>)}

        <colgroup>
            <col span={1} className={styles.FirstColum}/>
        </colgroup>

        <RowTitleColumns
            titleRows={titleRows}
            titleColumn={titleColumn}
            columns={columns}
            deleteColumns={deleteColumn ? (ID: number): void => deleteColumn(ID) : undefined}
            changeColumns={changeColumnName ? (id: number, newValue: string) => changeColumnName(id, newValue) : undefined}
        />

        <Rows
            rows={rows}
            deleteRows={deleteRows ? (ID: number): void => deleteRows(ID) : undefined}
            changeRowsName={changeRowsName}
            changeRowsCell={changeRowsColumnValue ? (idRow: number, idColumn: number, newValue: number) => changeRowsColumnValue(idRow, idColumn, newValue) : undefined}
        />
    </table>);
}