import React from 'react';
import {TaskToolbarContextProvider} from "@/Contexts/Tasks/TaskToolbarContext";
import {FiltersContextProvider} from "@/Contexts/Tasks/FilterContext";
import {TaskManagerProvider} from "@/Components/MyWedding/Tasks/TaskListManager/TaskManager";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import {TaskManagerFunctionsProvider} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import TaskDialog from "@/Components/MyWedding/Tasks/Overlay/TaskDialog";
import {TaskDialogContextProvider} from "@/Contexts/Tasks/TaskDialogContext";

// This component add all providers for the tasklist that needs to be used by the tasklist.
// This is the main provider that wraps the whole tasklist.

function TaskListProviders({data, children}: { data: TaskCategoryType[], children: React.ReactNode }) {
    return (
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
    );
}

export default TaskListProviders;