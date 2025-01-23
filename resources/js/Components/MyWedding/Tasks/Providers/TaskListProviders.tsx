import React from 'react';
import {TaskToolbarContextProvider} from "@/Contexts/Tasks/TaskToolbarContext";
import {FiltersContextProvider} from "@/Contexts/Tasks/FilterContext";
import {TaskManagerProvider} from "@/Components/MyWedding/Tasks/TaskListManager/TaskManager";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import {TaskManagerFunctionsProvider} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {WeddingUserContextProvider} from "@/Contexts/Wedding/WeddingUserContext";

// This component add all providers for the tasklist that needs to be used by the tasklist.
// This is the main provider that wraps the whole tasklist.

function TaskListProviders({data, children}: { data: TaskCategoryType[], children: React.ReactNode }) {

    if (!data || data.length === 0) {
        return <p>Loading Task Manager...</p>;
    }

    return (
        <WeddingUserContextProvider>
            <FiltersContextProvider>
                <TaskManagerProvider initialState={data}>
                    <TaskToolbarContextProvider>
                        <TaskManagerFunctionsProvider>
                            {/*<TaskDialogContextProvider>*/}
                            {children}
                            {/*</TaskDialogContextProvider>*/}
                        </TaskManagerFunctionsProvider>
                    </TaskToolbarContextProvider>
                </TaskManagerProvider>
            </FiltersContextProvider>
        </WeddingUserContextProvider>
    );
}

export default TaskListProviders;