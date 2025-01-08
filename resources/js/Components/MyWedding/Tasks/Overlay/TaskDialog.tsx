import React from 'react';
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {Dialog, DialogContent, DialogTitle} from "@/Components/ui/dialog";
import TaskNameField from "@/Components/MyWedding/Tasks/Taskfields/TaskNameField";
import AssigneeField from "@/Components/MyWedding/Tasks/Taskfields/AssigneeField";
import DateField from "@/Components/MyWedding/Tasks/Taskfields/DateField";
import StatusField from "@/Components/MyWedding/Tasks/Taskfields/StatusField";
import {Label} from "@/Components/ui/label";
import {twMerge} from "tailwind-merge";

function TaskDialog() {
    const task = useTaskContext();
    const rowClassName = 'h-8 inline-grid grid-cols-2 auto-cols-auto';

    return (
        <Dialog open={task.states.openTask} onOpenChange={task.handlers.setOpenTask}>
            <DialogContent className="min-w-[1000px]">
                <p>{task.states.task.title}</p>
                <div className={'w-96'}>
                    <div className={twMerge(rowClassName)}>
                        <Label className={'mr-2 inline'}>TaskName:</Label>
                        <TaskNameField />
                    </div>
                    <div className={rowClassName}>
                        <Label className={'mr-2'}>Assignees:</Label>
                        <AssigneeField assignees={task.states.task.assignees}/>
                    </div>
                    <div className={rowClassName}>
                        <Label className={'mr-2'}>Due Date:</Label>
                        <DateField value={task.states.task.due_date}/>
                    </div>
                    <div className={rowClassName}>
                        <Label className={'mr-2'}>Status:</Label>
                        <StatusField status={task.states.task.status}/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TaskDialog;
