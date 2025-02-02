import React, {useMemo} from 'react';
import {TaskContextProvider} from "@/Contexts/Tasks/TaskContext";
import {Dialog, DialogContent} from "@/Components/ui/dialog";
import TaskNameField from "@/Components/MyWedding/Tasks/Taskfields/TaskNameField";
import AssigneeField from "@/Components/MyWedding/Tasks/Taskfields/AssigneeField";
import DateField from "@/Components/MyWedding/Tasks/Taskfields/DateField";
import StatusField from "@/Components/MyWedding/Tasks/Taskfields/StatusField";
import {Label} from "@/Components/ui/label";
import {TaskType} from "@/types/Tasks/Task";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";
import TaskMessagesComponent from "@/Components/MyWedding/Tasks/Features/TaskMessages/TaskMessagesComponent";

function TaskDialog({task, taskOpened, setTaskOpened}: {
    task: TaskType,
    taskOpened: boolean,
    setTaskOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void
}) {
    const {updateTask} = useTaskManagerFunctionContext();
    const taskDatabase = useTaskDatabase();
    const memorizedTask = useMemo(() => task, [task]);
    const rowClassName = 'h-8 grid grid-cols-2 grid-cols-[130px_1fr] items-center auto-cols-auto';
    const lableClassName = 'mr-2 w-20';

    const handleTaskChange = (datakey: keyof TaskType, value: any) => {
        const updatedTask = {...memorizedTask, [datakey]: value};
        updateTask(memorizedTask.category_id, memorizedTask.id, datakey, value);
        taskDatabase.actions.updateTask(updatedTask);
    }

    return (
        <>
            {memorizedTask && Object.keys(memorizedTask).length > 0 && (
                <TaskContextProvider initialTask={memorizedTask}>
                    <Dialog open={taskOpened} onOpenChange={setTaskOpened} modal={false}>
                        {taskOpened && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" aria-hidden="true"></div>
                        )}
                        <DialogContent className="p-10 min-w-[1000px] min-h-[700px] max-h-[700px]"
                                       onInteractOutside={(e) => e.preventDefault()}
                                       onOpenAutoFocus={(e) => e.preventDefault()}>
                            <div className="w-full flex gap-4 justify-between">
                                <div className="w-full flex flex-col gap-4">
                                    <p>{memorizedTask.title}</p>

                                    <div className={'w-full grid gap-2 z-50'}>
                                        <div className={rowClassName}>
                                            <Label className={lableClassName}>TaskName:</Label>
                                            <TaskNameField value={memorizedTask.title} onChange={handleTaskChange}/>
                                        </div>
                                        <div className={rowClassName}>
                                            <Label className={lableClassName}>Assignees:</Label>
                                            <AssigneeField value={memorizedTask.assignees} onChange={handleTaskChange}
                                                           taskId={memorizedTask.id}/>
                                        </div>
                                        <div className={rowClassName}>
                                            <Label className={lableClassName}>Due Date:</Label>
                                            <DateField value={memorizedTask.due_date} onChange={handleTaskChange}/>
                                        </div>
                                        <div className={rowClassName}>
                                            <Label className={lableClassName}>Status:</Label>
                                            <StatusField value={memorizedTask.status} onChange={handleTaskChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[32rem] h-full justify-self-end">
                                    <TaskMessagesComponent/>
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
