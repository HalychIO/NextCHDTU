import CellTitle from "../../Cell/CellTitle";
import {ITableColumnTitle} from "@/interfaces";

export default function RowTitleColumns(
    {
        titleColumn,
        titleRows,
        columns,
        changeColumns,
        deleteColumns
    }: {
        titleColumn?: string,
        titleRows?: string,
        columns: ITableColumnTitle[],
        deleteColumns?: (id: number) => void,
        changeColumns?: (id: number, newValue: string) => void,
    }) {

    return (
        <thead>
        {titleRows && titleColumn && <tr>
            <th rowSpan={2}>{titleRows}</th>
            <th colSpan={columns.length}>{titleColumn}</th>
        </tr>}
        <tr>
            {!!titleRows || <td></td>}
            {columns.map((el, i) => <CellTitle
                    cell={el.name || ""}
                    deleteCell={deleteColumns ? () => deleteColumns(el.id) : undefined}
                    setCell={changeColumns ? (value: string) => changeColumns(el.id, value) : undefined}
                    key={`${el.id}-${i}`}
                />
            )}
        </tr>
        </thead>
    );
}