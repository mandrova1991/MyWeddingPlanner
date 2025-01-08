import React, {useContext, useEffect} from 'react';
import {CalendarPlus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Calendar} from "@/Components/ui/calendar";
import {format} from "date-fns";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {TaskContext} from "@/Components/MyWedding/Tasks/Task";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";

function DateField({value}: { value: string | null }) {
    const taskContext = useTaskContext();
    const [date, setDate] = React.useState<Date>(taskContext.states.task.due_date);
    const [shouldUpdateTask, setShouldUpdateTask] = React.useState(false);
    const {updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();


    const handleChange = (newValue: Date) => {
        setShouldUpdateTask(true);
        setDate(newValue);
    }

    useEffect(() => {
        if (shouldUpdateTask) {
            // taskContext.handlers.updateTaskField('due_date', date);
            const updatedTask = {...taskContext.states.task, due_date: date};
            updateTask(taskContext.states.task.category_id, taskContext.states.task.id, 'due_date', date);
            taskDatabase.actions.updateTask(updatedTask);

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
