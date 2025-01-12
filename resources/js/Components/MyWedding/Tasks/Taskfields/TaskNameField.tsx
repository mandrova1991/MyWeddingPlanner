import React, {useContext} from 'react';
import EditableTextField from "@/Components/Fields/EditableTextField";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {useTaskDialogContext} from "@/Contexts/Tasks/TaskDialogContext";

const TaskNameField = ({value, onChange, onTitleClick}: TaskFieldProps & { onTitleClick?: () => void }) => {

    const handleSave = (newValue: string) => {
        onChange('title', newValue);
    }

    const handleClick = () => {
        if (onTitleClick){
            onTitleClick();
        }
    }


    return (
        <TableContentCell>
            <EditableTextField value={value} onSave={handleSave} onClick={handleClick} clickable={true}/>
        </TableContentCell>
    );
}

export default TaskNameField;
