import React from 'react';
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {format} from "date-fns";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";

function CreatedAtField({value}: TaskFieldProps) {
    const date = new Date(value);

    return (
        <TableContentCell>
            <p className="text-sm">{format(date, "PPP")}</p>
        </TableContentCell>
    );
}

export default CreatedAtField;