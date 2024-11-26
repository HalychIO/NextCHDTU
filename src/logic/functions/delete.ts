import {ITableColumnTitle, ITableRows} from "@/interfaces";

export function deleteStrategy(Arr: ITableRows[], ID: number) {
    return Arr.filter((strategy) => strategy.id !== ID);
}

export function deleteCriterion(Arr: ITableColumnTitle[], ID: number) {
    return Arr.filter((criterion) => criterion.id !== ID);
}