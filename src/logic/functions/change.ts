import {ITableColumnTitle, ITableRows} from "@/interfaces";

export function changeCriterionName(Arr: ITableColumnTitle[], idCriterion: number, newValue: string) {
    const newArr: ITableColumnTitle[] = Arr;

    newArr.forEach((criterion) => {
        if (criterion.id === idCriterion) criterion.name = newValue;
    })

    return newArr;
}

export function changeStrategyName(Arr: ITableRows[], idStrategy: number, newValue: string) {
    const newArr: ITableRows[] = Arr;

    newArr.forEach((strategy) => {
        if (strategy.id === idStrategy) strategy.name = newValue;
    })

    return newArr;
}

export function changeStrategyCriterionValues(Rows: ITableRows[], idRow: number, idColumn: number, newValue: number) {
    const newRows: ITableRows[] = Rows;

    newRows.forEach((row) => {
        if (idRow == row.id) row.criterion.map((criterion) => {
            if (criterion.id === idColumn) {
                criterion.value = newValue;
            }
        });
    })

    return newRows;
}

export function changeProbabilitiesStates(Row: ITableRows, idCriterion: number, newValue: number) {
    const newRow: ITableRows = Row;

    newRow.criterion.map((criterion, index, array) => {
        if (criterion.id === idCriterion) {
            array[index].value = newValue;
        }
    })

    return newRow;
}