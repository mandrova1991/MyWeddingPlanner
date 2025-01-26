import React, {useMemo} from "react";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";

/*
    The taskToolbar hold selected Task. It can do various things with them like deleting selected Task.
    There will be more features in the future to be used like update the status for all selected tasks.
 */


export type useTaskToolbarReturnType = {
    states: {
        toolBarOpened: boolean;
    },
    handlers: {
        setToolBarOpened: React.Dispatch<React.SetStateAction<boolean>>,
        handleDeleteTask: () => void;
        handleDuplicateTask: () => void;
        handleClearTasks: () => void;
    },
    actions: {
        addTask: (taskID: number, deleteHandler: () => void, unCheckFunction: () => void) => void
        removeTask: (taskID: number) => void
    },
    derived: {
        getNumberOfTasksSelected: () => number
    },
}

type TaskIDType = {
    taskID: number;
    deleteTaskFromCategoryHandler: (taskID: number) => void;
    uncheckCheckboxHandler: () => void;
}

export const useTaskToolbar = (): useTaskToolbarReturnType => {
    const [taskIDs, setTaskIDs] = React.useState<TaskIDType[]>([]);
    const [toolBarOpened, setToolBarOpened] = React.useState<boolean>(false);

    const taskDatabase = useTaskDatabase();

    // handlers below
    // This handle Deletes a task from the backend.
    const handleDeleteTask = () => {
        // check if there are any tasks selected
        if (!!taskIDs.length) {
            taskIDs.forEach((task: TaskIDType) => {
                task.deleteTaskFromCategoryHandler(task.taskID); // Delete task from the Category
                task.uncheckCheckboxHandler(); // Uncheck checkbox before deletion. Otherwise the checkbox will remain checked.
                taskDatabase.actions.deleteTask(task.taskID) // Delete task from the database
                removeTask(task.taskID);
            })
        }

        // close toolbar since all tasks are deleted from the backend.
        setToolBarOpened(false)
    }

    // This handle duplicates a task.
    // TODO: implement handleDuplicateTasks
    const handleDuplicateTask = () => {
        if (!!taskIDs.length) {
            // logic for duplicating task
        }
    }

    // This handle clears all tasks from the toolbar. It also uncheckes the checkboxes of the tasks that are being cleared.
    const handleClearTasks = () => {
        if (!!taskIDs.length) {
            taskIDs.forEach((task: TaskIDType) => {
                task.uncheckCheckboxHandler(); // uncheck Checkbox
            })
        }

        // close toolbar since all tasks are cleared.
        setToolBarOpened(false);
        setTaskIDs([]);
    }

    // actions below

    // Add a new task to the toolbar.
    // If not opened already open it.
    // Adds a new task with a deleteHandler from its context and an unCheckFunction from its component.
    const addTask = (taskID: number, deleteHandler: (taskID: number) => void, unCheckFunction: () => void) => {
        if (!toolBarOpened) {
            setToolBarOpened(true);
        }

        // prepare new task
        const newTaskToAdd: TaskIDType = {
            taskID,
            deleteTaskFromCategoryHandler: deleteHandler,
            uncheckCheckboxHandler: unCheckFunction
        }

        // add new task to toolbar
        setTaskIDs([...taskIDs, newTaskToAdd]);
    }

    // Remove a task from the toolbar.
    const removeTask = (taskID: number) => {
        if (taskIDs.length <= 1) {
            setToolBarOpened(false);
        }

        setTaskIDs((prevState) => {
            return prevState.filter((task) => task.taskID !== taskID);
        })
    }

    // derived below

    // get total number of tasks.
    const getNumberOfTasksSelected = () => {
        return taskIDs.length
    }

    return {
        states: {
            toolBarOpened,
        },
        handlers: {
            setToolBarOpened,
            handleDeleteTask,
            handleDuplicateTask,
            handleClearTasks
        },
        actions: {
            addTask,
            removeTask
        },
        derived: {
            getNumberOfTasksSelected,
        },
    }
}