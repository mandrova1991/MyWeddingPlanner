import React from 'react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import {usePage} from "@inertiajs/react";
import TaskListHeader from "@/Components/MyWedding/Tasks/TaskListHeader";
import {ColumnConfigMap} from "@/types/Table/Column";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import TaskToolbar from "@/Components/MyWedding/Tasks/Overlay/TaskToolbar";
import TaskListContent from "@/Components/MyWedding/TaskList";
import TaskListProviders from "@/Components/MyWedding/Tasks/Providers/TaskListProviders";

function TaskList() {
    const {tasks, task_categories} = usePage().props;
    const data = Object.values(task_categories).map((category: TaskCategoryType) => {
        return {
            ...category,
            tasks: tasks.filter((task) => task.category_id === category.id)
        }
    });

    const [columns, setColumns] = React.useState<ColumnConfigMap>({
        gripHandle: {
            minWidth: 30,
            currentWidth: 150,
            visible: true,
            dataKey: '',
            label: "",
            type: "gripIconField",
            isInputField: false,
            canBeHidden: false,
            canResize: false,
            sortable: false
        },
        checkBox: {
            minWidth: 30,
            currentWidth: 150,
            visible: true,
            dataKey: '',
            label: "",
            type: "checkboxField",
            isInputField: false,
            canBeHidden: false,
            canResize: false,
            sortable: false
        },
        taskTitle: {
            minWidth: 350,
            currentWidth: 150,
            visible: true,
            dataKey: 'title',
            label: "Task Title",
            type: "taskNameField",
            isInputField: true,
            canBeHidden: false,
            canResize: true,
            sortable: false
        },
        assignee: {
            minWidth: 120,
            currentWidth: 80,
            visible: true,
            dataKey: 'assignees',
            label: "Assignee",
            type: "assigneeField",
            isInputField: true,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        dueDate: {
            minWidth: 200,
            currentWidth: 270,
            visible: true,
            dataKey: 'due_date',
            label: "Due Date",
            type: "dateField",
            isInputField: true,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        status: {
            minWidth: 220,
            currentWidth: 130,
            visible: true,
            dataKey: 'status',
            label: "Status",
            type: "statusField",
            isInputField: true,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        priority: {
            minWidth: 180,
            currentWidth: 130,
            visible: true,
            dataKey: 'priority',
            label: "Priority",
            type: "priorityField",
            isInputField: true,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        progress: {
            minWidth: 120,
            currentWidth: 130,
            visible: true,
            dataKey: 'progress',
            label: "Progress",
            type: "progressField",
            isInputField: true,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        createdBy: {
            minWidth: 120,
            currentWidth: 130,
            visible: true,
            dataKey: 'created_by',
            label: "Created By",
            type: "createdByField",
            isInputField: false,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        updatedBy: {
            minWidth: 120,
            currentWidth: 130,
            visible: true,
            dataKey: 'updated_by',
            label: "Updated By",
            type: "updatedByField",
            isInputField: false,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        createdAt: {
            minWidth: 200,
            currentWidth: 130,
            visible: true,
            dataKey: 'created_at',
            label: "Created At",
            type: "createdAtField",
            isInputField: false,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
        updatedAt: {
            minWidth: 200,
            currentWidth: 130,
            visible: true,
            dataKey: 'updated_at',
            label: "Updated At",
            type: "updatedAtField",
            isInputField: false,
            canBeHidden: true,
            canResize: true,
            sortable: false
        },
    });

    const handleConfigChange = <
        T extends keyof ColumnConfigMap,
        K extends keyof ColumnConfigMap[T],
    >(
        field: T,
        configKey: K,
        value: ColumnConfigMap[T][K]
    ) => {
        setColumns((prevColumns) => ({
            ...prevColumns,
            [field]: {
                ...prevColumns[field],
                [configKey]: value
            }
        }))
    }

    return (
        <DashboardLayout>
            <TaskListProviders data={data}>
                        <div className={"Tasklist-header p-3 shadow-[0_5px_17px_-5px_rgba(0,0,0,0.2)]"}>
                            <TaskListHeader columns={columns} handleConfigChange={handleConfigChange}/>
                        </div>
                        <TaskListContent columns={columns} handleConfigChange={handleConfigChange}/>
                        <TaskToolbar/>
            </TaskListProviders>
        </DashboardLayout>
    );
}

export default TaskList;
