"use client";
import styles from "./index.module.css"
import Table from "@/components/Table";
import React from "react";
import {IOutput} from "@/interfaces";

export default function Result(
    {
        output
    }: {
        output: IOutput,
    }): React.JSX.Element | string {

    return output.results.length ? <output className={styles.Output}>
        <h3 className={styles.OutputTitle}>Результат обчислень</h3>

        <div>
            {!!output.tableRows.length ? (
                <Table
                    columns={output.tableColumn}
                    rows={output.tableRows}
                />
            ) : ''}

            {output.results.map((el, index) => (<h4 key={index}> {el.title} : {el.value} </h4>))}
        </div>
    </output> : '';
}