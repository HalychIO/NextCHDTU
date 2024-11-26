"use client";
import styles from "@/components/Calculators/DMT/index.module.css"
import Table from "@/components/Table";
import React, {useMemo} from "react";
import {IOptions, IOutput, ITableColumnTitle, ITableRows} from "@/interfaces";
import {fieldProbabilitiesStates, fieldStrategy} from "@/logic/functions/field";
import ButtonCreate from "@/components/Buttons/ButtonCreate";
import {Select} from "@/components/Selects";
import {logicDMTLab1} from "@/logic/DMT/logicDMTLab1";
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

export default function CalculatorLab1(): React.ReactElement {
    const [ID, setID] = React.useState<number>(0);
    const [typeTask, setTypeTask] = React.useState<string>("Max");
    const [typeAlgorithm, setTypeAlgorithm] = React.useState<string>("maximax");
    const [criterion, setCriterion] = React.useState<ITableColumnTitle[]>([]);
    const [strategy, setStrategy] = React.useState<ITableRows[]>([]);
    const [probabilitiesStates, setProbabilitiesStates] = React.useState<ITableRows>({
        id: -1,
        name: "ймовірність наявності станів природи",
        criterion: [],
    });
    const [coefficientPessimism, setCoefficientPessimism] = React.useState<number>(0.5);
    const [output, setOutput] = React.useState<IOutput>({
        tableRows: [],
        tableColumn: [],
        results: [],
    });

    const optionMinMax: IOptions[] = [
        {text: "Максимум", value: "Max"},
        {text: "Мінімум", value: "Min"},
    ]
    const optionTypeAlgorithm: IOptions[] = [
        {text: "Максимаксу", value: "maximax"},
        {text: "Вальда", value: "minimax"},
        {text: "Гурвіца", value: "pessimism"},
        {text: "Байєса-Лапласа", value: "probabilitiesStates"},
    ]

    useMemo(() => {
        setStrategy(fieldStrategy(strategy, criterion));
        setProbabilitiesStates(fieldProbabilitiesStates(probabilitiesStates, criterion));
    }, [criterion, criterion.length, strategy, strategy.length, probabilitiesStates])

    return (<>
        <div className={styles.Settings}>
            <Select
                label={"Задача на: "}
                value={typeTask}
                selectionValue={(value: string) => setTypeTask(value)}
                options={optionMinMax}
            />

            <Select
                label={"Алгоритм: "}
                value={typeAlgorithm}
                selectionValue={(value: string) => setTypeAlgorithm(value)}
                options={optionTypeAlgorithm}
            />
        </div>

        {typeAlgorithm === "pessimism" && (
            <label className={styles.QInputTitle}>
                Критерій песимізму Q :
                <input
                    className={styles.QInput}
                    max={1}
                    min={0}
                    step={0.01}
                    type={"range"}
                    value={coefficientPessimism}
                    onChange={event => setCoefficientPessimism(Number(event.target.value))}
                />
                {Math.floor(coefficientPessimism * 100)}%
            </label>

        )}
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

        {typeAlgorithm === "probabilitiesStates" && (
            <Table
                titleColumn={"Критерії"}
                columns={criterion}

                titleRows={""}
                rows={[probabilitiesStates]}
                changeRowsColumnValue={(idRow: number, idColumn: number, newValue: number): void => {
                    setProbabilitiesStates(changeProbabilitiesStates(probabilitiesStates, idColumn, newValue));
                }}
            />
        )}

        <ButtonStarts
            title={"Start"}
            clickFunction={() => setOutput(logicDMTLab1(
                strategy,
                typeTask,
                typeAlgorithm,
                probabilitiesStates,
                coefficientPessimism
            ))}
        />

        <Result output={output}/>
    </>)
}


