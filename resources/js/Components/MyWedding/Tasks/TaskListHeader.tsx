import React, {createContext} from 'react';
import ColumnVisibilityDropdown from "@/Components/MyWedding/Tasks/Dropdowns/ColumnVisibilityDropdown";
import {ColumnConfigMap} from "@/types/Table/Column";
import NewTaskCategory from "@/Components/MyWedding/Tasks/NewTaskCategory";
import {useTaskManagerContext} from "@/Components/MyWedding/Tasks/TaskListManager/TaskManager";

// This is the header which holds different buttons and dropdowns for the task list.

interface TaskListHeaderProps {
    columns: ColumnConfigMap;
    handleConfigChange: <
        T extends keyof ColumnConfigMap,
        K extends keyof ColumnConfigMap[T],
    >(column: T, configKey: K, visible: ColumnConfigMap[T][K]) => void;
}

function TaskListHeader({columns, handleConfigChange}: TaskListHeaderProps) {
    const taskListManager = useTaskManagerContext();

    // Handle the column visibility changes.
    const handleColumnVisibilityChange = <
        T extends keyof ColumnConfigMap,
        K extends keyof ColumnConfigMap[T]
    >(column: T, visible: ColumnConfigMap[T][K]) => {
        handleConfigChange(column, "visible" as K, visible);
    }

    return (
        <div className={'w-full flex gap-4'}>
            <div className={"ml-auto flex gap-4"}>
                {taskListManager.categories.length > 0 && (
                    <ColumnVisibilityDropdown columns={columns} onColumnVisibilityChange={handleColumnVisibilityChange} />
                )}
                <NewTaskCategory buttonClassName={'ml-auto bg-blue-700 hover:bg-blue-500 text-white'}/>
            </div>
        </div>
    );
}

export default TaskListHeader;
