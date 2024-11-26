"use client";
import React, {useMemo} from "react";
import styles from "@/components/Calculators/DMT/index.module.css"
import Table from "@/components/Table";
import ButtonCreate from "@/components/Buttons/ButtonCreate";
import ButtonStarts from "@/components/Buttons/ButtonStarts";
import {IOptions, IOutput, ITableColumnTitle, ITableRows} from "@/interfaces";
import {fieldProbabilitiesStates, fieldStrategy} from "@/logic/functions/field";
import {Select} from "@/components/Selects";
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
import Section from "@/components/Section";
import {logicZITMLab3} from "@/logic/ZITM/logicZITMLab3";

export default function CalculatorLab3(): React.ReactElement {
    const [ID, setID] = React.useState<number>(0);
    const [typeTask, setTypeTask] = React.useState<string>("Max");
    const [criterion, setCriterion] = React.useState<ITableColumnTitle[]>([]);
    const [strategy, setStrategy] = React.useState<ITableRows[]>([
        {id: 0, name: "model 1", criterion: []},
        {id: 0, name: "model 2", criterion: []},
    ]);
    const [probabilitiesStates, setProbabilitiesStates] = React.useState<ITableRows>({
        id: -1,
        name: "максимальне значення властивості об'єкта",
        criterion: [],
    });
    const [output, setOutput] = React.useState<IOutput>({
        tableRows: [],
        tableColumn: [],
        results: [],
    });

    const optionMinMax: IOptions[] = [
        {text: "Максимум", value: "Max"},
        {text: "Мінімум", value: "Min"},
    ]

    useMemo(() => {
        setStrategy(fieldStrategy(strategy, criterion));
        setProbabilitiesStates(fieldProbabilitiesStates(probabilitiesStates, criterion));
    }, [criterion, criterion.length, strategy, strategy.length, probabilitiesStates])

    return (<>
        <Section title={"Налаштування"}>
            <Select
                label={"Задача на: "}
                value={typeTask}
                selectionValue={(value: string) => setTypeTask(value)}
                options={optionMinMax}
            />
            <div className={styles.ButtonsCreate}>
                <ButtonCreate
                    title={"add strategy"}
                    clickFunction={() => setStrategy(createRow(strategy, criterion, getID(ID, setID), "new Rows"))}
                />

                <ButtonCreate
                    title={"add criterion"}
                    clickFunction={() => setCriterion(createColumn(criterion, getID(ID, setID), "new Columns"))}
                />
            </div>
        </Section>

        <Section title={"Вхідні дані"}>
            <Table
                titleRows={"Стратегії"}
                titleColumn={"Критерії"}
                title={"Таблиці вхідних даних"}
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

            <Table
                titleColumn={"Критерії"}
                columns={criterion}

                titleRows={""}
                rows={[probabilitiesStates]}
                changeRowsColumnValue={(idRow: number, idColumn: number, newValue: number): void => {
                    setProbabilitiesStates(changeProbabilitiesStates(probabilitiesStates, idColumn, newValue));
                }}
            />
        </Section>

        <Section title={"Результат"}>
            <ButtonStarts
                title={"Start"}
                clickFunction={() => setOutput(logicZITMLab3(
                    strategy,
                    typeTask,
                    probabilitiesStates,
                ))}
            />

            <Result output={output}/>
        </Section>
    </>)
}


