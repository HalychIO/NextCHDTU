"use client";
import styles from "@/components/Calculators/DMT/index.module.css"
import Table from "@/components/Table";
import React, {useMemo} from "react";
import {IOptions, IOutput, ITableColumnTitle, ITableRows} from "@/interfaces";
import {fieldProbabilitiesStates, fieldStrategy} from "@/logic/functions/field";
import ButtonCreate from "@/components/Buttons/ButtonCreate";
import {Select} from "@/components/Selects";
import ButtonStarts from "@/components/Buttons/ButtonStarts";
import {
    changeCriterionName,
    changeProbabilitiesStates,
    changeStrategyCriterionValues,
    changeStrategyName
} from "@/logic/functions/change";
import {createColumn, createRow} from "@/logic/functions/create";
import {getID} from "@/logic/functions/All";
import {deleteCriterion, deleteStrategy} from "@/logic/functions/delete";
import Result from "@/components/Result";
import {logicDMTLab2} from "@/logic/DMT/logicDMTLab2";
import Section from "@/components/Section";

export default function CalculatorLab2(): React.ReactElement {
    const [ID, setID] = React.useState<number>(0);
    const [typeAlgorithm, setTypeAlgorithm] = React.useState<string>("maximax");
    const [criterion, setCriterion] = React.useState<ITableColumnTitle[]>([]);
    const [strategy, setStrategy] = React.useState<ITableRows[]>([]);
    const [probabilitiesStates, setProbabilitiesStates] = React.useState<ITableRows>({
        id: -1,
        name: "ймовірність стану",
        criterion: [],
    });
    const [output, setOutput] = React.useState<IOutput>({
        tableRows: [],
        tableColumn: [],
        results: [],
    });

    const optionTypeAlgorithm: IOptions[] = [
        {text: "мінімаксного ризику Севіджа", value: "Sevidge"},
        {text: "очікуваного значення і дисперсії", value: "expectedValueAndVariance"},
        {text: "граничного рівня", value: "granychnogoRivnia"},
    ]

    useMemo(() => {
        setStrategy(fieldStrategy(strategy, criterion));
        setProbabilitiesStates(fieldProbabilitiesStates(probabilitiesStates, criterion));
    }, [criterion, criterion.length, strategy, strategy.length, probabilitiesStates])

    return (<>
        <Section title={"svs"}>
            <Select
                label={"Алгоритм: "}
                value={typeAlgorithm}
                selectionValue={(value: string) => setTypeAlgorithm(value)}
                options={optionTypeAlgorithm}
            />

            <div className={styles.ButtonsCreate}>
                <ButtonCreate
                    title={"add strategy"}
                    clickFunction={() => setStrategy(createRow(strategy, criterion, getID(ID, setID), "new Rows"))}
                />
                <ButtonStarts
                    title={"Start"}
                    clickFunction={() => setOutput(logicDMTLab2(
                        strategy,
                        criterion,
                        typeAlgorithm,
                        probabilitiesStates,
                    ))}
                />
                <ButtonCreate
                    title={"add criterion"}
                    clickFunction={() => setCriterion(createColumn(criterion, getID(ID, setID), "new Columns"))}
                />
            </div>
        </Section>

        <Section title={"Таблиці вхідних даних"}>
            <Table
                titleRows={"Рішення"}
                titleColumn={"Стани"}
                columns={criterion}
                deleteColumn={(ID: number): void => setCriterion(deleteCriterion(criterion, ID))}
                changeColumnName={(id: number, newValue: string): void => setCriterion(
                    changeCriterionName(criterion, id, newValue)
                )}

                rows={strategy}
                deleteRows={(ID: number): void => setStrategy(deleteStrategy(strategy, ID))}
                changeRowsName={(id: number, newValue: string): void => setStrategy(
                    changeStrategyName(strategy, id, newValue))}
                changeRowsColumnValue={(idRow: number, idColumn: number, newValue: number): void => setStrategy(
                    changeStrategyCriterionValues(strategy, idRow, idColumn, newValue)
                )}
            />

            {typeAlgorithm === "expectedValueAndVariance" && (
                <Table
                    titleColumn={"Стани"}
                    columns={criterion}

                    titleRows={""}
                    rows={[probabilitiesStates]}
                    changeRowsColumnValue={(idRow: number, idColumn: number, newValue: number): void => {
                        setProbabilitiesStates(changeProbabilitiesStates(probabilitiesStates, idColumn, newValue));
                    }}
                />
            )}
        </Section>
        <Section title={"Результат"}>
            <Result output={output}/>
        </Section>
    </>)
}


