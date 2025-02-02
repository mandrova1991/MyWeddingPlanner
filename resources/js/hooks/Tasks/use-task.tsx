import React, {useContext, useMemo, useState} from 'react';
import {TaskType} from "@/types/Tasks/Task";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useAuthContext} from "@/Contexts/AuthContext";
import {useWeddingContext} from "@/Contexts/Wedding/WeddingContext";

/**
 * This component is still used in the current codebase. But the plan is to remove this because its better to
 * move towards component that have a value input. Which is already implemented.
 *
 * Most code is not used anymore.
 * TODO Remove this so less code is needed.
 */

export type useTaskReturnType = {
    states: {
        task: TaskType;
        openTask: boolean,
    },
    handlers: {
        setTask: React.Dispatch<React.SetStateAction<TaskType>>,
        // updateTaskField: (columnKey: keyof TaskType, value: any) => void;
        setOpenTask: React.Dispatch<React.SetStateAction<boolean>>;
        createNewTask: (title: string) => TaskType;
    }

}



// Empty task
const emptyTask: TaskType = {
    id: 0,
    title: '',
    description: null,
    status: '',
    order: 0,
    due_date: null,
    priority: null,
    progress: 0,
    category_id: 0,
    parent_task: null,
    wedding_id: 0,
    assignees: [],
    created_by: null,
    updated_by: null,
    created_at: null,
    updated_at: null,
};






export const useTask = (initialTask?: TaskType): useTaskReturnType => {
    const [task, setTask] = React.useState<TaskType>(initialTask || emptyTask);
    const [openTask, setOpenTask] = useState(false);
    // const taskCategoryContext = useTaskCategoryContext();
    const taskDatabase = useTaskDatabase();
    const {updateTask } = useTaskManagerFunctionContext();
    const {user: authUser} = useAuthContext();
    const {wedding} = useWeddingContext();


    // Update the task. It needs a key and a value.
    // const updateTaskField = (columnKey: keyof TaskType, value: any) => {
    //     // check if given key exists in task.
    //     // if it not exists end the function
    //     if (!task.hasOwnProperty(columnKey)) {
    //         console.error("columnKey not found.");
    //         return;
    //     }
    //
    //     // check if the value is the same as the current value. If it is then do not do anything else.
    //     if (task[columnKey] === value) {
    //         console.log("No change detected. Nothing to do.");
    //         return;
    //     }
    //
    //     // create a new object with the updated value.
    //     const updatedTask: TaskType = {...task, [columnKey]: value};
    //     setTask(updatedTask);
    //     taskDatabase.actions.updateTask(updatedTask);
    // }

    // Initialise a new task
    const createNewTask = (title: string) => {
        // const tempId = -1 * taskCategoryContext.states.taskCategory.tasks.length + 1;
        const newTask:TaskType = {
            assignees: [],
            // category_id: taskCategoryContext.states.taskCategory.id || 0,
            category_id: 1,
            created_by: authUser.id,
            description: null,
            due_date: null,
            id: 0,
            // order: taskCategoryContext.states.taskCategory.tasks.length + 1 || 0,
            order: 0,
            parent_task: null,
            priority: "none",
            progress: 0,
            status: "todo",
            title: title,
            updated_by: null,
            wedding_id: wedding.id,
            created_at: new Date(),
            updated_at: new Date(),
        }

        // console.log('before addTask, categoryState: ', taskCategoryContext.states.taskCategory)
        // Add newTask to the ui
        // taskCategoryContext.handlers.addNewTask(newTask);
        // console.log('after addTask, categoryState: ', taskCategoryContext.states.taskCategory)

        return newTask;
    }


    return {
        states:{
            task,
            openTask
        },
        handlers: {
            setTask,
            // updateTaskField,
            setOpenTask,
            createNewTask,
        }
    }
};











