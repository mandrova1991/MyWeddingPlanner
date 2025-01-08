import React, {useContext} from 'react';
import {useTaskToolbar, useTaskToolbarReturnType} from "@/hooks/use-task-toolbar";

export const TaskToolbarContext = React.createContext<useTaskToolbarReturnType | null>(null);

export const useTaskToolbarContext = (): useTaskToolbarReturnType => {
    const context = useContext(TaskToolbarContext);
    if (context === undefined) {
        throw new Error('useTaskToolbarContext must be used within a TaskCategoryProvider');
    }
    return context as useTaskToolbarReturnType;
}

export const TaskToolbarContextProvider = ({children}: { children: React.ReactNode }) => {
    const taskToolbar = useTaskToolbar();
    return (
        <TaskToolbarContext.Provider value={taskToolbar}>
            {children}
        </TaskToolbarContext.Provider>
    )
}
