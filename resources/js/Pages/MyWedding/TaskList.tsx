import React, {useEffect, useState} from 'react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import {usePage} from "@inertiajs/react";
import TaskListHeader from "@/Components/MyWedding/Tasks/TaskListHeader";
import {ColumnConfigMap} from "@/types/Table/Column";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import TaskToolbar from "@/Components/MyWedding/Tasks/Overlay/TaskToolbar";
import TaskListContent from "@/Components/MyWedding/Tasks/TaskList";
import TaskListProviders from "@/Components/MyWedding/Tasks/Providers/TaskListProviders";
import GripIconField from "@/Components/MyWedding/Tasks/Taskfields/GripIconField";
import CheckboxField from "@/Components/MyWedding/Tasks/Taskfields/CheckboxField";
import TaskNameField from "@/Components/MyWedding/Tasks/Taskfields/TaskNameField";
import AssigneeField from "@/Components/MyWedding/Tasks/Taskfields/AssigneeField";
import DateField from "@/Components/MyWedding/Tasks/Taskfields/DateField";
import StatusField from "@/Components/MyWedding/Tasks/Taskfields/StatusField";
import PriorityField from "@/Components/MyWedding/Tasks/Taskfields/PriorityField";
import ProgressField from "@/Components/MyWedding/Tasks/Taskfields/ProgressField";
import CreatedByField from "@/Components/MyWedding/Tasks/Taskfields/CreatedByField";
import UpdatedByField from "@/Components/MyWedding/Tasks/Taskfields/UpdatedByField";
import createdAtField from "@/Components/MyWedding/Tasks/Taskfields/CreatedAtField";
import UpdatedAtField from "@/Components/MyWedding/Tasks/Taskfields/UpdatedAtField";
import {TaskType} from "@/types/Tasks/Task";
import api from "@/axios";
import {UseWeddingContext} from "@/Contexts/Wedding/WeddingContext";

function TaskList() {
    const {wedding} = UseWeddingContext();
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [taskCategories, setTaskCategories] = useState<TaskCategoryType[] | never[]>([]);


    useEffect(() => {
        const fetchTaskCategories = async () => {
            const response  = await api.get(route("api.taskcategory.index", {wedding: wedding.id}));
            setTaskCategories(response.data.objectData || [])
        }

        const fetchTasks = async () => {
            const response  = await api.get(route("api.tasks.index", {wedding: wedding.id}));
            setTasks(response.data.objectData || [])
        }

        fetchTasks();
        fetchTaskCategories();
    }, []);

    const data = Object.values(taskCategories).map((category: TaskCategoryType) => {
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
            sortable: false,
            component: GripIconField,
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
            sortable: false,
            component: CheckboxField,

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
            sortable: false,
            component: TaskNameField,

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
            sortable: false,
            component: AssigneeField,

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
            sortable: false,
            component: DateField,
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
            sortable: false,
            component: StatusField,
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
            sortable: false,
            component: PriorityField,
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
            sortable: false,
            component: ProgressField,
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
            sortable: false,
            component: CreatedByField,
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
            sortable: false,
            component: UpdatedByField,
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
            sortable: false,
            component: createdAtField,
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
            sortable: false,
            component: UpdatedAtField,
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

    // @ts-ignore
    return (
            <TaskListProviders data={data}>
                        <div className={"Tasklist-header p-3 shadow-[0_5px_17px_-5px_rgba(0,0,0,0.2)]"}>
                            <TaskListHeader columns={columns} handleConfigChange={handleConfigChange}/>
                        </div>
                        <TaskListContent columns={columns} handleConfigChange={handleConfigChange}/>
                        <TaskToolbar/>
            </TaskListProviders>
    );
}

export default TaskList;
