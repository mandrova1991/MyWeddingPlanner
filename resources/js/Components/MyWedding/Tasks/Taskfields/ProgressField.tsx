import React, {useEffect} from 'react';
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {format} from "date-fns";
import {Progress} from "@/Components/ui/progress";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Input} from "@/Components/ui/input";
import {Slider} from "@/Components/ui/slider";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";

// TODO Implement update task functions.
function ProgressField() {
    const taskContext = useTaskContext();
    const {updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();
    const [progress, setProgress] = React.useState(taskContext.states.task.progress);
    const [openPopover, setOpenPopover] = React.useState(false);


    const handleEnterPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter"){
            setOpenPopover(false);
        }
    }


    return (
        <TableContentCell>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild={true} >
                    <Progress value={progress} className='[&>*]:bg-blue-700 border'/>
                </PopoverTrigger>
                <PopoverContent className={'w-52'}>
                    <p className="text-sm mb-4">Please provide a percentage</p>
                    <p className={'text-sm mb-2'}>{progress}%</p>
                    <Slider defaultValue={[progress]} onValueChange={(e) => setProgress(e[0])} min={0} max={100} step={5}/>
                </PopoverContent>
            </Popover>
        </TableContentCell>
    );
}

export default ProgressField;