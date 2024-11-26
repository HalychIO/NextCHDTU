export interface ILink {
    href: string;
    text: string;
}

export interface IMatrix {
    criterion: Array<string | number>;

    [k: string]: Array<string | number>;
}

export interface ITableColumnTitle {
    id: number;
    name: string;
}

export interface ITableColumnValue {
    id: number;
    value: number;
}

export interface ITableRows {
    id: number;
    name: string;
    criterion: ITableColumnValue[];
}

export interface IOptions {
    value: string,
    text: string,
}

export interface IOutput {
    tableColumn: ITableColumnTitle[];
    tableRows: ITableRows[];
    results: {
        title: string;
        value: number | string;
    }[],

}