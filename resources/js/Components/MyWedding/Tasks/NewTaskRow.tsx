import React from "react";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {PlusCircle} from "lucide-react";
import EditableTextField from "@/Components/Fields/EditableTextField";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {useTask} from "@/hooks/Tasks/use-task";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";
import {ColumnConfig, ColumnConfigMap} from "@/types/Table/Column";


/*
    NewTaskRow is a component that is alwasy last in en list of tasks in categories lists.
    It can create a new task withing the taskmanager and also stores a new task into the database.
 */


function NewTaskRow({columns}: { columns: ColumnConfigMap }) {
    const [creatingNewTask, setCreatingNewTask] = React.useState(false);
    const taskContext = useTask();
    const taskCategoryContext = useTaskCategoryContext();
    const {addTask, updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();

    const handleAddTaskClick = () => {
        if (!creatingNewTask) {
            setCreatingNewTask(true);
        }
    }

    const handleOnSave = async (value: string) => {
        if (value !== "") {
            const newTask = taskContext.handlers.createNewTask(value);
            const tempId = -Math.random();
            const tempTask = {...newTask, id: tempId, category_id: taskCategoryContext.state.id};
            addTask(taskCategoryContext.state.id, tempTask);
            try {
                const storedTask = await taskDatabase.actions.createTask(tempTask);
                updateTask(taskCategoryContext.state.id, tempId, "id", storedTask.id);
            } catch (error) {
                console.error(error);
            }
        }

        setCreatingNewTask(false);
    }

    return (
        <div className={'new-task-row flex items-center h-8 hover:bg-gray-50'}>
            {columns && Object.entries(columns).map((column, index) => (
                <div key={index} className={''} style={{width: `${column[1].minWidth}px`}}>
                    {column[0] == 'taskTitle' && (
                        <>
                            {!creatingNewTask && (
                                <div className={'w-fit flex items-center cursor-pointer font-medium text-sm text-gray-400'}
                                     onClick={handleAddTaskClick}>
                                    <TableContentCell>
                                        <PlusCircle strokeWidth={1.25}/>
                                        <span className={"ml-2"}>Add Task</span>
                                    </TableContentCell>
                                </div>
                            )}

                            {creatingNewTask && (
                                <TableContentCell>
                                    <EditableTextField value={""} directFocus={true} onSave={handleOnSave}/>
                                </TableContentCell>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default NewTaskRow;
