import React, {useContext, useMemo} from 'react';
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";



type TaskCategoryContextType = {
    state: TaskCategoryType;
}

export const TaskCategoryContext = React.createContext<TaskCategoryContextType | undefined>(undefined);

export const useTaskCategoryContext = () => {
    const context = useContext(TaskCategoryContext);
    if (context === undefined){
        throw new Error('useTaskCategoryContext must be used within a TaskCategoryProvider');
    }
    return context;
}

export const TaskCategoryContextProvider = React.memo(({ children, initialTaskCategory }: { children: React.ReactNode, initialTaskCategory: TaskCategoryType }) => {    // Memoize the initial task category so it's not recreated unless it changes
    const [taskCategory, setTaskCategory] = React.useState<TaskCategoryType>(initialTaskCategory || {
        id: 0,
        name: '',
        order: 0,
        wedding_id: 0,
        created_by: 0,
        tasks: [],
    })

    const value = useMemo(() => ({
        state: taskCategory
    }), [taskCategory]);

    return (
        <TaskCategoryContext.Provider value={value}>
            {children}
        </TaskCategoryContext.Provider>
    )
})