import React, {useEffect} from 'react';
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {Progress} from "@/Components/ui/progress";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Slider} from "@/Components/ui/slider";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";

// TODO Implement update task functions.
function ProgressField({value, onChange}: TaskFieldProps) {
    const [progress, setProgress] = React.useState(value);
    const [openPopover, setOpenPopover] = React.useState(false);

    return (
        <TableContentCell>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger className="h-full w-full" >
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