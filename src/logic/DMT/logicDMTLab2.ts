import {IOutput, ITableColumnTitle, ITableColumnValue, ITableRows} from "@/interfaces";

export default function logicDMTLab2(
    Rows: ITableRows[],
    Columns: ITableColumnTitle[],
    typeAlgorithm: string,
    probabilitiesStates: ITableRows,
): IOutput {
    const result: IOutput = {tableRows: [], tableColumn: [], results: []};

    if (Rows.length < 1) return result;
    if (Rows[0].criterion.length < 1) return result;

    const bestStrategy: ITableRows = Rows[0];
    // const bestCriterionStrategy: ITableColumnValue = getBestValueFromArray(bestStrategy.criterion, typeTask);
    // const worstCriterionStrategy: ITableColumnValue = getWorstValueFromArray(bestStrategy.criterion, typeTask);
    // const sumValueWorstAndBest: number = 0;
    // let sumAllValuesInArray: number = 0;

    switch (typeAlgorithm) {
        case "Sevidge":

            const minValueArr: ITableColumnValue[] = [];

            Columns.forEach((column) => {

                const valueColumnArr: (ITableColumnValue | undefined)[] = Rows.map(
                    (strategy) => strategy.criterion.find((el) => el.id === column.id)
                );

                minValueArr.push(getWorstValueFromArray(valueColumnArr.length ? valueColumnArr : []));

            })


            break;
        case "expectedValueAndVariance":
            // Rows.forEach((strategy) => {
            //     const sumValue = sumValueWithCoefficientPessimism(
            //         getBestValueFromArray(strategy.criterion, typeTask),
            //         getWorstValueFromArray(strategy.criterion, typeTask),
            //         coefficientPessimism
            //     );
            //
            //     if (typeTask === "Max") {
            //         if (sumValueWorstAndBest < sumValue) { // if the meaning has changed, so has the strategy
            //             sumValueWorstAndBest = sumValue;
            //             bestStrategy = strategy;
            //         }
            //     } else if (typeTask === "Min") {
            //         if (sumValueWorstAndBest > sumValue) { // if the meaning has changed, so has the strategy
            //             sumValueWorstAndBest = sumValue;
            //             bestStrategy = strategy;
            //         }
            //     }
            // })
            break;
        case "granychnogoRivnia":
            // Rows.forEach((strategy, index) => {
            //     const sumValuesArray = sumValueArray(strategy.criterion, probabilitiesStates);
            //
            //     if (index === 0) sumAllValuesInArray = sumValuesArray;
            //
            //     if (sumAllValuesInArray < sumValuesArray) { // if the meaning has changed, so has the strategy
            //         sumAllValuesInArray = sumValuesArray;
            //         bestStrategy = strategy;
            //
            //     }
            //     console.log(sumAllValuesInArray, sumValuesArray)
            // })
            break;
    }

    result.results.push({title: "Краща стратегія це ", value: bestStrategy.name});

    return result;
}

function getBestValueFromArray(Arr: ITableColumnValue[], typeTask: string): ITableColumnValue {
    let resultValue: ITableColumnValue = Arr[0];

    Arr.forEach((criterion) => {
        if (typeTask === "Max") {
            if (criterion.value > resultValue.value) resultValue = criterion;
        } else if (criterion.value < resultValue.value) resultValue = criterion;

    })

    return resultValue;
}

function getWorstValueFromArray(Arr: (ITableColumnValue | undefined)[]): ITableColumnValue {
    let resultValue: ITableColumnValue = Arr[0];

    Arr.forEach((criterion) => {
        if (criterion.value <= resultValue.value) resultValue = criterion;
    })

    return resultValue;
}

const sumValueWithCoefficientPessimism = (
    maxValue: ITableColumnValue,
    minValue: ITableColumnValue,
    coefficientPessimism: number
): number => (minValue.value * coefficientPessimism) + (maxValue.value * (1 - coefficientPessimism))

function sumValueArray(ArrCriterions: ITableColumnValue[], probabilitiesStates: ITableRows): number {
    let value: number = 0;

    ArrCriterions.forEach(({id, value: valueCriterion}) => {
        value += (probabilitiesStates.criterion.find(
            (el) => el.id === id
        )?.value || 0) * valueCriterion;
    })

    return value;
}

const comparingMoreSign = (
    value1: ITableColumnValue,
    value2: ITableColumnValue
): ITableColumnValue => value1.value >= value2.value ? value1 : value2;

const comparingLessSign = (
    value1: ITableColumnValue,
    value2: ITableColumnValue
): ITableColumnValue => value1.value <= value2.value ? value1 : value2;

const getBestValue = (
    max: ITableColumnValue,
    min: ITableColumnValue,
    typeTask: string
): ITableColumnValue => typeTask === "Max" ? comparingMoreSign(max, min) : comparingLessSign(max, min);