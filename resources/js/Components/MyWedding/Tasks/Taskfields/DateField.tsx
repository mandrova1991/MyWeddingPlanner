import React, {useEffect} from 'react';
import {CalendarPlus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Calendar} from "@/Components/ui/calendar";
import {format} from "date-fns";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";

function DateField({value, onChange}: TaskFieldProps) {
    const [date, setDate] = React.useState<Date>(value);
    const [shouldUpdateTask, setShouldUpdateTask] = React.useState(false);


    const handleChange = (newValue: Date) => {
        setShouldUpdateTask(true);
        setDate(newValue);
    }

    useEffect(() => {
        if (shouldUpdateTask) {
            onChange('due_date', date);
            setShouldUpdateTask(false);
        }

    }, [date]);


    return (
        <TableContentCell>
            <Popover>
                <PopoverTrigger asChild>
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
