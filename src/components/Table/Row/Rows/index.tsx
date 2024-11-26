import CellTitle from "../../Cell/CellTitle";
import CellValueTable from "../../Cell/CellValue";
import {ITableColumnValue, ITableRows} from "@/interfaces";

export default function Rows(
    {
        rows,
        deleteRows,
        changeRowsName,
        changeRowsCell
    }: {
        rows: ITableRows[],
        deleteRows?: (id: number) => void,
        changeRowsName?: (id: number, newValue: string) => void,
        changeRowsCell?: (idRow: number, idColumn: number, newValue: number) => void,
    }
): React.ReactElement {
    return (<tbody>
    {rows.map((strategy: ITableRows, i: number) => (
        <tr key={i}>
            <CellTitle
                cell={strategy.name}
                deleteCell={deleteRows ? () => deleteRows(strategy.id) : undefined}
                setCell={changeRowsName ? (newValue: string) => changeRowsName(strategy.id, newValue) : undefined}
            />

            {strategy.criterion.map((criterion: ITableColumnValue, index) => (
                <CellValueTable
                    cell={criterion.value || 0}
                    setCell={changeRowsCell ? (newValue: number) => changeRowsCell(strategy.id, criterion.id, newValue) : undefined}
                    key={`${criterion.id}-${index}`}
                />
            ))}
        </tr>
    ))}
    </tbody>);
}