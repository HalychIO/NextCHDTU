import {IOutput, ITableColumnValue, ITableRows} from "@/interfaces";

export function logicZITMLab1(
    Rows: ITableRows[],
    typeTask: string,
    typeAlgorithm: string,
    probabilitiesStates: ITableRows,
    coefficientPessimism: number
): IOutput {
    const result: IOutput = {tableRows: [], tableColumn: [], results: []};

    if (Rows.length < 1) return result;
    if (Rows[0].criterion.length < 1) return result;

    let bestStrategy: ITableRows = Rows[0];
    let bestCriterionStrategy: ITableColumnValue = getBestValueFromArray(bestStrategy.criterion, typeTask);
    let worstCriterionStrategy: ITableColumnValue = getWorstValueFromArray(bestStrategy.criterion, typeTask);
    let sumValueWorstAndBest: number = 0;
    let sumAllValuesInArray: number = 0;

    switch (typeAlgorithm) {
        case "maximax":
            Rows.forEach((strategy) => {
                const criterionStrategy: ITableColumnValue = getBestValueFromArray(strategy.criterion, typeTask)

                bestCriterionStrategy = getBestValue(bestCriterionStrategy, criterionStrategy, typeTask);

                if (bestCriterionStrategy.value === criterionStrategy.value) bestStrategy = strategy; // if the meaning has changed, so has the strategy
            })
            break;
        case "minimax":
            Rows.forEach((strategy) => {
                const criterionStrategy: ITableColumnValue = getWorstValueFromArray(strategy.criterion, typeTask)

                worstCriterionStrategy = getBestValue(worstCriterionStrategy, criterionStrategy, typeTask);

                if (
                    worstCriterionStrategy.value === criterionStrategy.value &&
                    worstCriterionStrategy.id === criterionStrategy.id
                ) bestStrategy = strategy; // if the meaning has changed, so has the strategy
            })
            break;
        case "pessimism":
            Rows.forEach((strategy) => {
                const sumValue = sumValueWithCoefficientPessimism(
                    getBestValueFromArray(strategy.criterion, typeTask),
                    getWorstValueFromArray(strategy.criterion, typeTask),
                    coefficientPessimism
                );

                if (typeTask === "Max") {
                    if (sumValueWorstAndBest < sumValue) { // if the meaning has changed, so has the strategy
                        sumValueWorstAndBest = sumValue;
                        bestStrategy = strategy;
                    }
                } else if (typeTask === "Min") {
                    if (sumValueWorstAndBest > sumValue) { // if the meaning has changed, so has the strategy
                        sumValueWorstAndBest = sumValue;
                        bestStrategy = strategy;
                    }
                }
            })
            break;
        case "probabilitiesStates":
            Rows.forEach((strategy, index) => {
                const sumValuesArray = sumValueArray(strategy.criterion, probabilitiesStates);

                if (index === 0) sumAllValuesInArray = sumValuesArray;

                if (typeTask === "Max") {
                    if (sumAllValuesInArray < sumValuesArray) { // if the meaning has changed, so has the strategy
                        sumAllValuesInArray = sumValuesArray;
                        bestStrategy = strategy;
                    }
                } else if (typeTask === "Min") {
                    if (sumAllValuesInArray > sumValuesArray) { // if the meaning has changed, so has the strategy
                        sumAllValuesInArray = sumValuesArray;
                        bestStrategy = strategy;
                    }
                }
                console.log(sumAllValuesInArray, sumValuesArray)
            })
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

function getWorstValueFromArray(Arr: ITableColumnValue[], typeTask: string): ITableColumnValue {
    let resultValue: ITableColumnValue = Arr[0];

    Arr.forEach((criterion) => {
        if (typeTask === "Max") {
            if (criterion.value <= resultValue.value) resultValue = criterion;
        } else if (typeTask === "Min") {
            if (criterion.value >= resultValue.value) resultValue = criterion;
        }
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