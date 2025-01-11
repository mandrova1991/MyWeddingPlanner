import React, {useContext} from 'react';
import EditableTextField from "@/Components/Fields/EditableTextField";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";

const TaskNameField = ({value, onChange}: TaskFieldProps) => {
    const taskContext = useTaskContext();

    const handleSave = (newValue: string) => {
        onChange('title', newValue);
    }

    const handleClick = () => {
        taskContext.handlers.setOpenTask(true);
    }

    return (
        <TableContentCell>
            <EditableTextField value={value} onSave={handleSave} onClick={handleClick} clickable={true}/>
        </TableContentCell>
    );
}

export default TaskNameField;
