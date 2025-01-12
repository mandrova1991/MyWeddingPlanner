import React, {useContext, useMemo} from 'react';
import {TaskManagerFunctions, useTaskManagerContext} from "@/Components/MyWedding/Tasks/TaskListManager/TaskManager";



export const TaskManagerFunctionContext = React.createContext<TaskManagerFunctions | undefined>(undefined);

export const useTaskManagerFunctionContext = ():TaskManagerFunctions => {
    const context = useContext(TaskManagerFunctionContext);
    if (context === undefined) {
        throw new Error('useTaskManagerFunctionContext must be used within a TaskCategoryProvider');
    }
    return context;
}

export const TaskManagerFunctionContextProvider = ({children, actions}: { children: React.ReactNode, actions: TaskManagerFunctions }) => {

    const memo = useMemo(() => {
        return actions
    }, []);

    return (
        <TaskManagerFunctionContext.Provider value={memo}>
            {children}
        </TaskManagerFunctionContext.Provider>
    )
}


export const TaskManagerFunctionsProvider = ({children}: { children: React.ReactNode }) => {
    const {actions} = useTaskManagerContext()
    return (
        <TaskManagerFunctionContextProvider actions={actions}>
            {children}
        </TaskManagerFunctionContextProvider>
    )
}