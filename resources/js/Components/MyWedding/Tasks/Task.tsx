import React, {useMemo, useState} from "react";
import TaskCell from "@/Components/MyWedding/Tasks/TaskCell";
import {TaskType} from "@/types/Tasks/Task";
import TaskDialog from "@/Components/MyWedding/Tasks/Overlay/TaskDialog";
import {ColumnConfigMap} from "@/types/Table/Column";
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
    const [taskOpened, setTaskOpened] = useState(false);
    const memTask = useMemo(() => taskData, [taskData]);
    const {updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();

    const handleChange = (datakey: string, value: any) => {
        const updatedTask = { ...memTask, [datakey]: value };
        updateTask(updatedTask.category_id, updatedTask.id, datakey, value);
        taskDatabase.actions.updateTask(updatedTask);
    }

    const handleTitleClick = () => {
        setTaskOpened(true);
    }

    console.log('task', taskData)

    return (
        <>
            <div className=" group flex items-center border-b border-gray-200 w-fit hover:bg-gray-50">
                {Object.values(columns).map((column) => {
                    const DynamicComponent = column.component;
                    const key = "cat" + memTask.category_id + memTask.id + '_' + column.type;

                    return (
                        <div key={key} className="task h-[35px]">
                            <TaskCell columnConfig={column}>
                                <DynamicComponent
                                    value={memTask[column.dataKey]}
                                    onChange={handleChange}
                                    onTitleClick={handleTitleClick}
                                    taskId={taskData.id}
                                />
                            </TaskCell>
                        </div>
                    )

                })}
            </div>

            {taskOpened && (
                <TaskDialog task={memTask} taskOpened={taskOpened} setTaskOpened={setTaskOpened}/>
            )}
        </>
    )
});

export default Task;