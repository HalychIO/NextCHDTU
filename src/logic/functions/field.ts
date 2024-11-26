import {ITableColumnTitle, ITableColumnValue, ITableRows} from "@/interfaces";

export function fieldStrategy(Rows: ITableRows[], ArrColumnTitle: ITableColumnTitle[]) {
    const newArrRows: ITableRows[] = Rows;

    newArrRows.forEach((strategy, index, array) => {
        const newArrCriterion: ITableColumnValue[] = [];

        ArrColumnTitle.forEach((criterion: ITableColumnTitle) => {
            newArrCriterion.push(
                strategy.criterion.find((el: ITableColumnValue) => el.id === criterion.id)
                || {id: criterion.id, value: 0}
            )
        });

        array[index].criterion = newArrCriterion;
    })

    return newArrRows;
}

export function fieldProbabilitiesStates(probabilitiesStates: ITableRows, ArrCriterion: ITableColumnTitle[]): ITableRows {
    const newProbabilitiesStates: ITableRows = probabilitiesStates;

    const newArrCriterion: ITableColumnValue[] = [];

    ArrCriterion.forEach((criterion: ITableColumnTitle) => {
        newArrCriterion.push(
            newProbabilitiesStates.criterion.find((el) => el.id === criterion.id)
            || {id: criterion.id, value: 0}
        )
    });

    newProbabilitiesStates.criterion = newArrCriterion;

    return newProbabilitiesStates;
}

