import React, {useContext, useEffect} from 'react';
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import TaskStatus from "@/Components/MyWedding/Tasks/Models/TaskStatus";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import TaskStatusDropdownContent from "@/Components/MyWedding/Tasks/Dropdowns/TaskStatusDropdownContent";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";

function StatusField({value, onChange}: TaskFieldProps) {
    const [selectedStatus, setSelectedStatus] = React.useState(value);
    const [shouldUpdateTask, setShouldUpdateTask] = React.useState(false);
    const [openStatusDropdown, setOpenStatusDropdown] = React.useState(false);

    const statusses = [
        {name: 'todo', title:'To Do', color: "red"},
        {name: 'planned', title:'Planned', color: "yellow"},
        {name: 'wait_on_review', title:'Wait on review', color: "purple"},
        {name: 'completed', title:'Completed', color: "green"},
    ];

    useEffect(() => {
        const findByKey = (array: any, key: string, value: any) => {
            return array.find((item: any) => item[key] === value);
        }

        const result = findByKey(statusses, 'name', value);
        setSelectedStatus(result);
    }, []);

    useEffect(() => {
        if (shouldUpdateTask){
            onChange('status', selectedStatus.name ?? 'todo');
            setShouldUpdateTask(false);
        }
    }, [selectedStatus]);


    const handleClick = (status) => {
        setShouldUpdateTask(true);
        setOpenStatusDropdown(false);
        setSelectedStatus(status);
    }



    return (
        <Popover open={openStatusDropdown} onOpenChange={setOpenStatusDropdown}>
            <PopoverTrigger asChild>

                <div className="w-full h-full py-0.5 flex items-center cursor-pointer">
                    <TableContentCell>
                        <TaskStatus status={selectedStatus}/>
                    </TableContentCell>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-5 shadow-xl">
                <TaskStatusDropdownContent statussen={statusses} onClick={handleClick} />
            </PopoverContent>
        </Popover>

    );
}

export default StatusField;
