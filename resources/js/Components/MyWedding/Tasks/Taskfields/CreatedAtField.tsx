import React from 'react';
import {useTask} from "@/hooks/use-task";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {format} from "date-fns";

function CreatedAtField() {
    const taskContext = useTaskContext();
    const date = new Date(taskContext.states.task.created_at);

    return (
        <TableContentCell>
            <p className="text-sm">{format(date, "PPP")}</p>
        </TableContentCell>
    );
}

export default CreatedAtField;