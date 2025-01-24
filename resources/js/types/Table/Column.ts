import React, {FC, JSX} from "react";

type ColumnFieldType =
    | "gripIconField"
    | "checkboxField"
    | "taskNameField"
    | "assigneeField"
    | "dateField"
    | "statusField"
    | "priorityField"
    | "progressField"
    | "createdAtField"
    | "createdByField"
    | "updatedAtField"
    | "updatedByField"
    ;

export interface ColumnConfig {
    minWidth: number;
    currentWidth: number;
    visible: boolean;
    dataKey: string;
    label: string;
    type: ColumnFieldType;
    isInputField: boolean;
    canBeHidden: boolean;
    canResize: boolean;
    sortable: boolean;
    component: FC<any>;
}

export type ColumnConfigMap = {
    gripHandle: ColumnConfig;
    checkBox: ColumnConfig;
    taskTitle: ColumnConfig;
    assignee: ColumnConfig;
    dueDate: ColumnConfig;
    status: ColumnConfig;
    priority: ColumnConfig;
    progress: ColumnConfig;
    createdAt: ColumnConfig;
    createdBy: ColumnConfig;
    updatedAt: ColumnConfig;
    updatedBy: ColumnConfig;
}
