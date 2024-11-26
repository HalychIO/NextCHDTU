"use client";
import React, {useMemo} from "react";
import styles from "@/components/Calculators/DMT/index.module.css"
import Table from "@/components/Table";
import ButtonCreate from "@/components/Buttons/ButtonCreate";
import ButtonStarts from "@/components/Buttons/ButtonStarts";
import {IOutput, ITableColumnTitle, ITableRows} from "@/interfaces";
import {fieldStrategy} from "@/logic/functions/field";
import {changeStrategyCriterionValues} from "@/logic/functions/change";
import {createColumn} from "@/logic/functions/create";
import {getID} from "@/logic/functions/All";
import {deleteCriterion} from "@/logic/functions/delete";
import Result from "@/components/Result";
import Section from "@/components/Section";
import {logicZITMLab2} from "@/logic/ZITM/logicZITMLab2";

export default function CalculatorLab2(): React.ReactElement {
    const [ID, setID] = React.useState<number>(0);
    const [criterion, setCriterion] = React.useState<ITableColumnTitle[]>([]);
    const [strategy, setStrategy] = React.useState<ITableRows[]>([
        {id: 0, name: "Data row:", criterion: []},
    ]);
    const [output, setOutput] = React.useState<IOutput>({
        tableRows: [],
        tableColumn: [],
        results: [],
    });


    useMemo(() => {
        setStrategy(fieldStrategy(strategy, criterion));
    }, [criterion.length, strategy.length])

    return (<>
        <Section title={"Налаштування"}>
            <div className={styles.ButtonsCreate}>
                <ButtonCreate
                    title={"add Column"}
                    clickFunction={() => setCriterion(createColumn(criterion, getID(ID, setID), "F" + (criterion.length + 1)))}
                />
            </div>
        </Section>

        <Section title={"Вхідні дані"}>
            <Table
                columns={criterion}
                deleteColumn={(ID: number): void => setCriterion(deleteCriterion(criterion, ID))}

                rows={strategy}
                changeRowsColumnValue={(idRow: number, idColumn: number, newValue: number): void => setStrategy(
                    changeStrategyCriterionValues(strategy, idRow, idColumn, newValue)
                )}
            />
        </Section>

        <Section title={"Результат"}>
            <ButtonStarts
                title={"Start"}
                clickFunction={() => setOutput(logicZITMLab2(strategy, criterion))}
            />

            <Result output={output}/>
        </Section>

    </>)
}


