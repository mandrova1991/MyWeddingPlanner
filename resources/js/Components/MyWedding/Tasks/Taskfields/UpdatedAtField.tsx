import React from 'react';
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {format} from "date-fns";

function UpdatedAtField() {
    const taskContext = useTaskContext();
    const date = new Date(taskContext.states.task.updated_at);

    return (
        <TableContentCell>
            <p className="text-sm">{format(date, "PPP")}</p>
        </TableContentCell>
    );
}

export default UpdatedAtField;