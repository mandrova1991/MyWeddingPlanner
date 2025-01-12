import React, {useEffect} from 'react';
import {CalendarPlus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Calendar} from "@/Components/ui/calendar";
import {format} from "date-fns";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";

function DateField({value: date, onChange}: TaskFieldProps) {
    const handleChange = (newValue: Date) => {
        onChange('due_date', newValue);
    }

    return (
        <TableContentCell>
            <Popover>
                <PopoverTrigger className="h-full">
                    <div className="w-full h-full flex items-center cursor-pointer text-sm">
                        {/*{date && (*/}
                        {/*    <p className="text-sm">{date}</p>*/}
                        {/*)}*/}
                        {date ? format(date, "PPP") : <CalendarPlus strokeWidth={1.25} className="text-gray-300"/>}
                        {/*{!date && (*/}
                        {/*    <CalendarPlus className="text-gray-300"/>*/}
                        {/*)}*/}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </TableContentCell>
    );
}

export default DateField;
