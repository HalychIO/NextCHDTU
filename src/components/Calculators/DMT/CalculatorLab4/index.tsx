"use client";
import styles from "@/components/Calculators/DMT/index.module.css"
import Table from "@/components/Table";
import React, {useMemo} from "react";
import {IOutput, ITableColumnTitle, ITableRows} from "@/interfaces";
import {fieldStrategy} from "@/logic/functions/field";
import ButtonCreate from "@/components/Buttons/ButtonCreate";
import ButtonStarts from "@/components/Buttons/ButtonStarts";
import {changeCriterionName, changeStrategyCriterionValues, changeStrategyName} from "@/logic/functions/change";
import {createColumn, createRow} from "@/logic/functions/create";
import {getID} from "@/logic/functions/All";
import {deleteCriterion, deleteStrategy} from "@/logic/functions/delete";
import Result from "@/components/Result";
import Section from "@/components/Section";
import logicDMTLab4 from "@/logic/DMT/logicDMTLab4";

export default function CalculatorLab4(): React.ReactElement {
    const [ID, setID] = React.useState<number>(0);
    const [criterion, setCriterion] = React.useState<ITableColumnTitle[]>([]);
    const [strategy, setStrategy] = React.useState<ITableRows[]>([]);
    const [criterionCoefficients, setCriterionCoefficients] = React.useState<ITableRows[]>([
        {id: -1, name: 'Коефіцієнти', criterion: []}
    ]);
    const [output, setOutput] = React.useState<IOutput>({
        tableRows: [],
        tableColumn: [],
        results: [],
    });

    useMemo(() => {
        setStrategy(fieldStrategy(strategy, criterion));
        setCriterionCoefficients(fieldStrategy(criterionCoefficients, criterion));
    }, [criterion, criterion.length, strategy, strategy.length])

    return (<>
        <Section title={"svs"}>
            <div className={styles.ButtonsCreate}>
                <ButtonCreate
                    title={"add strategy"}
                    clickFunction={() => setStrategy(createRow(strategy, criterion, getID(ID, setID), "new Row"))}
                />
                <ButtonCreate
                    title={"add criterion"}
                    clickFunction={() => setCriterion(createColumn(criterion, getID(ID, setID), "new Column"))}
                />
            </div>
        </Section>

        <Section title={"Таблиці вхідних даних"}>
            <Table
                titleRows={"Стратегії"}
                titleColumn={"Критерії"}
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
                titleRows={" "}
                titleColumn={"Коефіцієнти критеріїв"}
                columns={criterion}

                rows={criterionCoefficients}
                changeRowsColumnValue={(idRow: number, idColumn: number, newValue: number): void => setCriterionCoefficients(
                    changeStrategyCriterionValues(criterionCoefficients, idRow, idColumn, newValue)
                )}
            />
        </Section>
        <Section title={"Результат"}>
            <ButtonStarts
                title={"Start"}
                clickFunction={() => setOutput(logicDMTLab4(
                    strategy,
                    criterionCoefficients,
                ))}
            />
            <Result output={output}/>
        </Section>
    </>)
}


