import {ITableColumnTitle, ITableColumnValue, ITableRows} from "@/interfaces";

export function createRow(Arr: ITableRows[], ArrCriterion: ITableColumnTitle[], ID: number, name: string) {
    const newArr: ITableRows[] = Arr;

    const newObjStrategy: ITableRows = {
        id: ID,
        name: name,
        criterion: ArrCriterion.map((criterion): ITableColumnValue => ({id: criterion.id, value: 0}),),
    }

    newArr.push(newObjStrategy);

    return newArr;
}

export function createColumn(Arr: ITableColumnTitle[], ID: number, name: string) {
    const newArr: ITableColumnTitle[] = Arr;

    const newObjCriterion: ITableColumnTitle = {
        id: ID,
        name: name,
    }

    newArr.push(newObjCriterion);

    return newArr;
}