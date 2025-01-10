import React, {useMemo, useState} from 'react';
import {TaskContext, TaskContextProvider, useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {Dialog, DialogContent} from "@/Components/ui/dialog";
import TaskNameField from "@/Components/MyWedding/Tasks/Taskfields/TaskNameField";
import AssigneeField from "@/Components/MyWedding/Tasks/Taskfields/AssigneeField";
import DateField from "@/Components/MyWedding/Tasks/Taskfields/DateField";
import StatusField from "@/Components/MyWedding/Tasks/Taskfields/StatusField";
import {Label} from "@/Components/ui/label";
import {twMerge} from "tailwind-merge";
import {useTaskDialogContext} from "@/Contexts/Tasks/TaskDialogContext";

function TaskDialog() {
    const {task, openTaskDialog, setOpenTaskDialog} = useTaskDialogContext();
    const memorizedTask = useMemo(() => task, [task]);
    const rowClassName = 'h-8 grid grid-cols-2 grid-cols-[130px_1fr] items-center auto-cols-auto';
    const lableClassName = 'mr-2 w-20';
    // const [openTaskDialog, setOpenTaskDialog] = useState(false);

    // console.log(task)
    console.log('taskDialog')

    return (
        <>
            {memorizedTask && Object.keys(memorizedTask).length > 0 && (
                <TaskContextProvider initialTask={memorizedTask}>
                    <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog} modal={false}>
                        {openTaskDialog && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" aria-hidden="true"></div>
                        )}
                        <DialogContent className="min-w-[1000px]" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
                            <p>{memorizedTask.title}</p>
                            <div className={'w-[500px] grid gap-2 z-50'}>
                                <div className={twMerge(rowClassName)}>
                                    <Label className={lableClassName}>TaskName:</Label>
                                    <TaskNameField/>
                                </div>
                                <div className={rowClassName}>
                                    <Label className={lableClassName}>Assignees:</Label>
                                    <AssigneeField assignees={memorizedTask.assignees}/>
                                </div>
                                <div className={rowClassName}>
                                    <Label className={lableClassName}>Due Date:</Label>
                                    <DateField value={memorizedTask.due_date}/>
                                </div>
                                <div className={rowClassName}>
                                    <Label className={lableClassName}>Status:</Label>
                                    <StatusField status={memorizedTask.status}/>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </TaskContextProvider>
            )}
        </>
    );
}

export default React.memo(TaskDialog);
