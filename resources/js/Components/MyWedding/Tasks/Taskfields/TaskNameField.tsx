import React, {useContext} from 'react';
import EditableTextField from "@/Components/Fields/EditableTextField";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {TaskContext} from "@/Components/MyWedding/Tasks/Task";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";

const TaskNameField = React.memo(() => {
    const taskContext = useTaskContext();
    const {updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();
    const handleSave = (newValue: string) => {
        const updatedTask = {...taskContext.states.task, title: newValue};
        updateTask(taskContext.states.task.category_id, taskContext.states.task.id, 'title', newValue);
        taskDatabase.actions.updateTask(updatedTask);
    }

    const handleClick = () => {
        taskContext.handlers.setOpenTask(true);
    }

    return (
        <TableContentCell>
            <EditableTextField value={taskContext.states.task.title} onSave={handleSave} onClick={handleClick} clickable={true}/>
        </TableContentCell>
    );
})

export default TaskNameField;
