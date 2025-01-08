import React, {useContext, useEffect} from 'react';
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import TaskStatus from "@/Components/MyWedding/Tasks/Models/TaskStatus";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import TaskStatusDropdownContent from "@/Components/MyWedding/Tasks/Dropdowns/TaskStatusDropdownContent";
import {TaskContext} from "@/Components/MyWedding/Tasks/Task";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";

function StatusField({status}: {status: object[]}) {
    const [selectedStatus, setSelectedStatus] = React.useState(status);
    const [shouldUpdateTask, setShouldUpdateTask] = React.useState(false);
    const [openStatusDropdown, setOpenStatusDropdown] = React.useState(false);
    const taskContext = useTaskContext();
    const {updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();

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

        const result = findByKey(statusses, 'name', status);
        setSelectedStatus(result);
    }, []);

    useEffect(() => {
        if (shouldUpdateTask){
            const updatedTask = {...taskContext.states.task, status: selectedStatus.name};
            updateTask(taskContext.states.task.category_id, taskContext.states.task.id, 'status', selectedStatus);
            taskDatabase.actions.updateTask(updatedTask);
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
