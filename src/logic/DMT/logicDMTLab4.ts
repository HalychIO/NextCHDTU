import {IOutput, ITableRows} from "@/interfaces";

export default function logicDMTLab4(Rows: ITableRows[], criterionCoefficients: ITableRows[]): IOutput {
    const result: IOutput = {tableRows: [], tableColumn: [], results: []};

    if (Rows.length < 1) return result;
    if (Rows[0].criterion.length < 1) return result;

    let bestStrategy: ITableRows = Rows[0];
    let bestValue: number = 0;

    const arrValues: Array<Array<number>> = Rows.map(strategy => strategy.criterion.map(el => el.value));
    const coefficients: Array<number> = criterionCoefficients[0].criterion.map(e => e.value);

    arrValues
        .map((strategy) => strategy.reduce((a, b, currentIndex) => a + (b * coefficients[currentIndex]), 0))
        .forEach((el, index) => {
            if (bestValue < el) [bestValue, bestStrategy] = [el, Rows[index]];

            result.results.push({title: "" + Rows[index].name, value: el});
        })

    result.results.push({title: "Краща стратегія - " + bestStrategy.name, value: bestValue});

    return result;
}