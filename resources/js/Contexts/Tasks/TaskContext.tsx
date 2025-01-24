import React, {useContext, useEffect} from 'react';
import {useTask, useTaskReturnType} from "@/hooks/use-task";
import {TaskType} from "@/types/Tasks/Task";


export const TaskContext = React.createContext<useTaskReturnType | null>(null);
export const useTaskContext = ():useTaskReturnType  => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskContextProvider');
    }
    return context as useTaskReturnType;
};

export const TaskContextProvider = React.memo(({children, initialTask}: { children: React.ReactNode, initialTask: TaskType }) => {
    const memoizedInitialTask = React.useMemo(() => {
        return initialTask
    }, [initialTask]);
    const task = useTask(memoizedInitialTask);

    useEffect(() => {
        if (JSON.stringify(task.states.task) !== JSON.stringify(initialTask)) {
            task.handlers.setTask(memoizedInitialTask);
        }
    }, [memoizedInitialTask]);


    return (
        <TaskContext.Provider value={task}>
            {children}
        </TaskContext.Provider>
    );
});
