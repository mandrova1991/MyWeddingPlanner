import React, {useContext, useEffect} from 'react';
import {TaskType} from "@/types/Tasks/Task";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";

interface useTaskDialogReturnType{
    task: TaskType;
    setTask: (task: TaskType) => void;
    setTaskId: (taskId: number) => void;
    openTaskDialog: boolean;
    setOpenTaskDialog: (openTaskDialog: boolean) => void;
}

export const TaskDialogContext = React.createContext<useTaskDialogReturnType | null>(null);

export const useTaskDialogContext = (): useTaskDialogReturnType => {
    const context = useContext(TaskDialogContext);
    if (context === undefined) {
        throw new Error('useTaskDialogContext must be used within a TaskCategoryProvider');
    }
    return context as useTaskDialogReturnType;
}

export const TaskDialogContextProvider = React.memo(({children}: { children: React.ReactNode}) => {
    const [task, setTask] = React.useState<TaskType>();
    const [taskId, setTaskId] = React.useState<number>();
    const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
    const taskDatabase = useTaskDatabase();

    console.log(task)

    useEffect(() => {
        const fetchTask = async () => {
            if (taskId !== undefined){
                const task = await taskDatabase.actions.getTask(taskId);

                setTask(task);
            }
        }

        fetchTask();


    }, [taskId]);

    const value = React.useMemo(() => ({ task, setTask, openTaskDialog, setOpenTaskDialog, setTaskId }), [task, openTaskDialog]);

    return (
        <TaskDialogContext.Provider value={value}>
            {children}
        </TaskDialogContext.Provider>
    )
});
