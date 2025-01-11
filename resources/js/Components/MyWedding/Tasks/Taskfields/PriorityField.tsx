import React from 'react';
import {twMerge} from "tailwind-merge";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";

const priorities = [
    {flag: "none", bgColor: "bg-gray-200"},
    {flag: "low", bgColor: "bg-yellow-500"},
    {flag: "medium", bgColor: "bg-orange-500"},
    {flag: "high", bgColor: "bg-red-500"},
];

function PriorityField({value, onChange}: TaskFieldProps) {
    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    const handlePriorityChange = (newValue: string) => {
        setOpenPopover(false);
        onChange('priority', newValue);
    }

    return (
        <div className="">
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild={true} >
                    <div>
                        <TableContentCell>
                            <PriorityFlag flag={value} />
                        </TableContentCell>
                    </div>
                </PopoverTrigger>
                <PopoverContent className={'w-52'}>
                    <>
                        <p className="text-sm mb-3">Select a priority</p>
                        {priorities && Object.values(priorities).map((priority, index) => (
                            <div key={index} onClick={() => handlePriorityChange(priority.flag)}>
                                <PriorityFlag key={index} flag={priority.flag} />
                            </div>
                        ))}
                    </>
                </PopoverContent>
            </Popover>


        </div>
    );
}

export default PriorityField;

function PriorityFlag({flag}: {flag: string | null}) {


    const bgColor = priorities.find(item => item.flag === flag)?.bgColor;

    return(
        <div className="py-0.5 w-full h-full">
            <div className={twMerge("priority-flag px-3 py-1 rounded", bgColor)}>
                <p className="text-sm">{flag}</p>
            </div>
        </div>
    )
}