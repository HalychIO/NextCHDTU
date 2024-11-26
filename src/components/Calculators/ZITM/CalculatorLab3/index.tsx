"use client";
import React, {useMemo} from "react";
import styles from "@/components/Calculators/DMT/index.module.css"
import Table from "@/components/Table";
import ButtonCreate from "@/components/Buttons/ButtonCreate";
import ButtonStarts from "@/components/Buttons/ButtonStarts";
import {IOutput, ITableColumnTitle, ITableRows} from "@/interfaces";
import {fieldStrategy} from "@/logic/functions/field";
import {changeCriterionName, changeStrategyCriterionValues, changeStrategyName} from "@/logic/functions/change";
import {createColumn, createRow} from "@/logic/functions/create";
import {getID} from "@/logic/functions/All";
import {deleteCriterion, deleteStrategy} from "@/logic/functions/delete";
import Result from "@/components/Result";
import Section from "@/components/Section";
import {logicZITMLab3} from "@/logic/ZITM/logicZITMLab3";

export default function CalculatorLab3(): React.ReactElement {
    const [ID, setID] = React.useState<number>(0);
    const [criterion, setCriterion] = React.useState<ITableColumnTitle[]>([]);
    const [strategy, setStrategy] = React.useState<ITableRows[]>([]);
    const [output, setOutput] = React.useState<IOutput>({
        tableRows: [],
        tableColumn: [],
        results: [],
    });

    useMemo(() => {
        setStrategy(fieldStrategy(strategy, criterion));
    }, [criterion, criterion.length, strategy, strategy.length])

    return (<>
        <Section title={"Налаштування"}>
            <div className={styles.ButtonsCreate}>
                <ButtonCreate
                    title={"add Y"}
                    clickFunction={() => setStrategy(createRow(strategy, criterion, getID(ID, setID), "Y" + (strategy.length + 1)))}
                />

                <ButtonCreate
                    title={"add X"}
                    clickFunction={() => setCriterion(createColumn(criterion, getID(ID, setID), "X" + (criterion.length + 1)))}
                />
            </div>
        </Section>

        <Section title={"Вхідні дані"}>
            <Table
                columns={criterion}
                deleteColumn={(ID: number): void => setCriterion(deleteCriterion(criterion, ID))}
                changeColumnName={(id: number, newValue: string): void => setCriterion(
                    changeCriterionName(criterion, id, newValue)
                )}

                rows={strategy}
                deleteRows={(ID: number): void => setStrategy(deleteStrategy(strategy, ID))}
                changeRowsName={(id: number, newValue: string): void => setStrategy(
                    changeStrategyName(strategy, id, Number(newValue)))}
                changeRowsColumnValue={(idRow: number, idColumn: number, newValue: number): void => setStrategy(
                    changeStrategyCriterionValues(strategy, idRow, idColumn, newValue)
                )}
            />
        </Section>

        <Section title={"Результат"}>
            <ButtonStarts
                title={"Start"}
                clickFunction={() => setOutput(logicZITMLab3(strategy))}
            />

            <Result output={output}/>
        </Section>
    </>)
}


