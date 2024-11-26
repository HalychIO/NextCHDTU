import {IOutput, ITableColumnTitle, ITableRows} from "@/interfaces";

export function logicZITMLab2(
    Rows: ITableRows[],
    Columns: ITableColumnTitle[],
): IOutput {
    const result: IOutput = {tableRows: [], tableColumn: [], results: []};

    if (Columns.length < 3) return result; // запобіжник

    const arrValues: Array<number> = Rows[0].criterion.map(el => el.value);

    const MODEL = getModel(arrValues); // навчання моделі

    let SKV: number = 0;

    for (let i = 0; i < arrValues.length - 2; i++) {
        SKV += arrValues[i + 2] - getNextValue(MODEL, arrValues[i], arrValues[i + 1]);
    }

    SKV = Math.sqrt((SKV ** 2) / (arrValues.length - 2));

    result.results.push({
        title: "Y",
        value: getNextValue(MODEL, arrValues[arrValues.length - 1], arrValues[arrValues.length - 2])
    }, {
        title: "Середне квадратичне відхилення",
        value: SKV,
    })

    MODEL.forEach((el, i) => {
        result.results.push({title: "A" + (i + 1), value: el})
    })

    return result;
}

function getNextValue(MODEL: Array<number>, X1: number, X2: number): number {
    return (
        MODEL[0]
        + MODEL[1] * X1
        + MODEL[2] * X2
        + MODEL[3] * X1 * X2
        + MODEL[4] * X1 * X1
        + MODEL[5] * X2 * X2
        + MODEL[6] * X1 * X1 * X2
        + MODEL[7] * X1 * X2 * X2
        + MODEL[8] * X1 * X1 * X2 * X2
    );
}

function getModel(arrayValues: Array<number>): Array<number> {
    const matrix: Array<Array<number>> = [];

    for (let i = 0; i < arrayValues.length - 2; i++) {
        const x1 = arrayValues[i];
        const x2 = arrayValues[i + 1];
        const x3 = arrayValues[i + 2];

        matrix.push([1, x2, x1, x2 * x1, x2 * x2, x1 * x1, x2 * x2 * x1, x2 * x1 * x1, x2 * x2 * x1 * x1, x3]);
    }

    return obtainingValuesByTheGaussianMethod(normalizationMatrix(matrix));
}

function normalizationMatrix(matrix: Array<Array<number>>): Array<Array<number>> {
    const newMatrix: Array<Array<number>> = [];

    for (let i = 0; i < matrix[0].length - 1; i++) {
        const arrNElement: Array<number> = [];

        for (let j = 0; j < matrix[0].length; j++) {
            arrNElement.push(matrix.reduce((a, c) => a + (c[j] * c[i]), 0));
        }

        newMatrix.push(arrNElement);
    }

    return newMatrix;
}

function obtainingValuesByTheGaussianMethod(matrix: Array<Array<number>>): Array<number> {
    const normalizedMatrix: Array<Array<number>> = [...matrix];

    for (let i = 0; i < normalizedMatrix.length; i++) {

        const nElement: number = normalizedMatrix[i].shift() || 0;


        for (let s = 0; s < normalizedMatrix[i].length; s++) {
            normalizedMatrix[i] = normalizedMatrix[i].map(el => el / nElement);
        }

        for (let j = 0; j < normalizedMatrix.length; j++) {
            if (i !== j) {
                const nElement2: number = normalizedMatrix[j].shift() || 0;

                normalizedMatrix[j] = normalizedMatrix[j].map((el, index) => el - normalizedMatrix[i][index] * nElement2);
            }
        }
    }

    return arrayToLowerLevel(normalizedMatrix);
}

function arrayToLowerLevel(Arr: Array<Array<number>>): Array<number> {
    const resultArr: Array<number> = [];

    Arr.forEach(e => {
        resultArr.push(...e);
    });

    return resultArr;
}