import {IOutput, ITableRows} from "@/interfaces";

export function logicZITMLab3(
    Rows: ITableRows[],
): IOutput {
    const result: IOutput = {tableRows: [], tableColumn: [], results: []};

    if (Rows.length < 1) return result;
    if (Rows[0].criterion.length < 1) return result;


    return result;
}