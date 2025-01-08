import React, {createContext, useMemo, useState} from "react";
import {usePage} from "@inertiajs/react";
import TaskCell from "@/Components/MyWedding/Tasks/TaskCell";
import {TaskType} from "@/types/Tasks/Task";
import {TaskContextProvider, useTaskContext} from "@/Contexts/Tasks/TaskContext";
import TaskDialog from "@/Components/MyWedding/Tasks/Overlay/TaskDialog";
import {ColumnConfigMap} from "@/types/Table/Column";
import {log} from "node:util";
import TextComponent from "@/Components/MyWedding/Tasks/TextComponent";

/*
    Task component renders each task in the Tasklist.
    It gets its own context that we can work with.
    For the rendering of its fields the columnConfig is used.
    It loops trough the columns and renders a cell with its data.
 */

const Task = React.memo(({taskData, columns}: { taskData: TaskType, columns: ColumnConfigMap }) => {
    const memorizedTaskData = useMemo(() => taskData, [taskData])

    return (
        <TaskContextProvider initialTask={memorizedTaskData}>
            <div className=" group flex items-center border-b border-gray-200 w-fit hover:bg-gray-50">
                {Object.values(columns).map((column, index) => (
                    <div key={index} className="task h-[35px]">
                        <TaskCell columnConfig={column} value={memorizedTaskData[column.dataKey as keyof TaskType]}/>
                    </div>
                ))}
            </div>

            <TaskDialog/>
        </TaskContextProvider>
    )
})

export default Task;