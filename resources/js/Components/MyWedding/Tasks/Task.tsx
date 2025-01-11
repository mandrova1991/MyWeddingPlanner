import React, {createContext, useMemo, useState} from "react";
import {usePage} from "@inertiajs/react";
import TaskCell from "@/Components/MyWedding/Tasks/TaskCell";
import {TaskType} from "@/types/Tasks/Task";
import {TaskContextProvider, useTaskContext} from "@/Contexts/Tasks/TaskContext";
import TaskDialog from "@/Components/MyWedding/Tasks/Overlay/TaskDialog";
import {ColumnConfigMap} from "@/types/Table/Column";
import {log} from "node:util";
import TextComponent from "@/Components/MyWedding/Tasks/TextComponent";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";

/*
    Task component renders each task in the Tasklist.
    It gets its own context that we can work with.
    For the rendering of its fields the columnConfig is used.
    It loops trough the columns and renders a cell with its data.
 */

export interface TaskFieldProps {
    value?: any,
    onChange?: (datakey: string, value: any) => void
}

const Task = React.memo(({taskData, columns}: { taskData: TaskType, columns: ColumnConfigMap }) => {
    const memTask = useMemo(() => taskData, [taskData]);
    const {updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();

    const handleChange = (datakey: string, value: any) => {
        const updatedTask = { ...memTask, [datakey]: value };
        console.log(updatedTask);
        updateTask(updatedTask.category_id, updatedTask.id, datakey, value);
        taskDatabase.actions.updateTask(updatedTask);
    }

    return (
        <TaskContextProvider initialTask={memTask}>
            <div className=" group flex items-center border-b border-gray-200 w-fit hover:bg-gray-50">
                {Object.values(columns).map((column, index) => {
                    const DynamicComponent = column.component;

                    return (
                        <div key={index} className="task h-[35px]">
                            <TaskCell columnConfig={column}>
                                <DynamicComponent value={memTask[column.dataKey]} onChange={handleChange}/>
                            </TaskCell>
                        </div>
                    )

                })}
            </div>

            <TaskDialog/>
        </TaskContextProvider>
    )
})

export default Task;