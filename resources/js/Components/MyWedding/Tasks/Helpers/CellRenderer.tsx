import React, {useContext} from 'react';
import GripIconField from "@/Components/MyWedding/Tasks/Taskfields/GripIconField";
import TaskNameField from "@/Components/MyWedding/Tasks/Taskfields/TaskNameField";
import AssigneeField from "@/Components/MyWedding/Tasks/Taskfields/AssigneeField";
import DateField from "@/Components/MyWedding/Tasks/Taskfields/DateField";
import StatusField from "@/Components/MyWedding/Tasks/Taskfields/StatusField";
import CheckboxField from "@/Components/MyWedding/Tasks/Taskfields/CheckboxField";
import PriorityField from "@/Components/MyWedding/Tasks/Taskfields/PriorityField";
import TextField from "@/Components/MyWedding/Tasks/Taskfields/TextField";
import CreatedAtField from "@/Components/MyWedding/Tasks/Taskfields/CreatedAtField";
import CreatedByField from "@/Components/MyWedding/Tasks/Taskfields/CreatedByField";
import UpdatedByField from "@/Components/MyWedding/Tasks/Taskfields/UpdatedByField";
import UpdatedAtField from "@/Components/MyWedding/Tasks/Taskfields/UpdatedAtField";
import ProgressField from "@/Components/MyWedding/Tasks/Taskfields/ProgressField";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";

/*
    The cellRenderer is a component that translates the column settings to an actual component.
    TODO should be part of the columnSettings. In that way this should not be necessarily anymore
 */

interface CellRendererProps {
    type: string
    value?: string | object
    onChange?: (value: string) => void
}
const CellRenderer = React.memo(({ type, value, onChange} : CellRendererProps) => {

    switch (type)
    {
        case 'gripIconField':
            return <GripIconField />
        case 'taskNameField':
            return <TaskNameField />
        case 'assigneeField':
            return <AssigneeField assignees={value}/>
        case 'dateField':
            return <DateField value={value}/>
        case 'statusField':
            return <StatusField status={value} />
        case 'checkboxField':
            return <CheckboxField />
        case 'priorityField':
            return <PriorityField />
        case 'progressField':
            return <ProgressField />
        case 'createdAtField':
            return <CreatedAtField />
        case 'createdByField':
            return <CreatedByField />
        case 'updatedAtField':
            return <UpdatedAtField />
        case 'updatedByField':
            return <UpdatedByField />
    }
})

export default CellRenderer;
