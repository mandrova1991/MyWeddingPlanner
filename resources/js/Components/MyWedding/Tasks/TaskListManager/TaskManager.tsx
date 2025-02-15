import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import {createContext, useCallback, useContext, useMemo, useReducer} from "react";
import {TaskType} from "@/types/Tasks/Task";
import useTaskBroadcastListener from "@/hooks/Tasks/use-task-broadcast-listener";

/*
    The TaskManager is an important part of the taskList.
    It hold all the information for taskCategories and Task.
    The functions of the TaskManager are used troughout the TaskList.
    These functions are only used to update the UI.
 */


interface TaskManagerContextProps {
    categories: TaskCategoryType[];
    actions: TaskManagerFunctions;
}

export type TaskManagerFunctions = {
    addTask: (categoryId: number, task: TaskType) => void;
    updateTask: (categoryId: number, taskId: number, columnKey: keyof TaskType, value: any) => void;
    deleteTask: (categoryId: number, taskId: number) => void;
    addCategory: (newCategory: TaskCategoryType) => void;
    updateCategory: (categoryId: number, columnKey: keyof TaskCategoryType, value: any) => void;
    deleteCategory: (categoryId: number) => void;
    getNewCategoryOrderPosition:() => number;
}

export interface taskListManagerActionInterface {
    type: string,
    payload: any
}

const TaskManagerContext = createContext<TaskManagerContextProps | undefined>(undefined);

function taskManagerReducer(state: TaskCategoryType[], action: taskListManagerActionInterface): TaskCategoryType[] {
    switch (action.type) {
        case 'ADD_TASK': {
            const { categoryId, task } = action.payload;
            const newState = state.map((category) =>
                categoryId === category.id
                    ? { ...category, tasks: [...category.tasks, task] }
                    : category
            );
            return newState;
        }

        case 'UPDATE_TASK': {
            const { categoryId, taskId, columnKey, value } = action.payload;
            return state.map((category) =>
                categoryId === category.id
                    ? {
                        ...category,
                        tasks: category.tasks.map((task) =>
                            task.id === taskId
                                ? {...task, [columnKey]: value}
                                : task
                        )
                    }
                    : category
            )
        }

        case 'UPDATE_TASK_WITH_TASK': {
            const {categoryId, task} = action.payload;
            const newState = state.map((category) =>
                categoryId === category.id
                    ? {
                        ...category,
                        tasks: category.tasks.map((catTask ) =>
                            catTask.id === task.id
                                ? task
                                : catTask
                        )
                    }
                    : category
            );
            return newState;
        }

        case 'DELETE_TASK': {
            const { categoryId, taskId } = action.payload;
            return state.map((category) =>
                categoryId === category.id
                    ? {...category, tasks: category.tasks.filter((task) => task.id !== taskId)}
                    : category
            )
        }

        case 'ADD_CATEGORY': {
            const { newCategory } = action.payload;
            return [...state, newCategory];
        }

        case 'UPDATE_CATEGORY': {
            const { categoryId, columnKey, value } = action.payload;
            return state.map((category) =>
                categoryId === category.id
                    ? {...category, [columnKey]: value}
                    : category
            )
        }

        case 'DELETE_CATEGORY': {
            const { categoryId } = action.payload;
            return state.filter((category) => category.id !== categoryId);
        }

        default:
            return state;
    }
}

function TaskManagerProvider({children, initialState}: {children: React.ReactNode, initialState: TaskCategoryType[]}) {
    const [state, dispatch] = useReducer(taskManagerReducer, initialState);
    useTaskBroadcastListener({dispatch});

    const addTask = useCallback((categoryId: number, task: TaskType) => {
        dispatch({ type: 'ADD_TASK', payload: { categoryId, task } });
    }, []);

    const updateTask = useCallback((categoryId: number, taskId: number, columnKey: keyof TaskType, value: any) => {
        dispatch({ type: 'UPDATE_TASK', payload: { categoryId, taskId, columnKey, value } });
    }, []);

    const deleteTask = useCallback((categoryId: number, taskId: number) => {
        dispatch({ type: 'DELETE_TASK', payload: { categoryId,  taskId } });
    }, []);

    const addCategory = useCallback((newCategory: TaskCategoryType) => {
        dispatch({ type: 'ADD_CATEGORY', payload: { newCategory } });
    }, []);

    const updateCategory = useCallback((categoryId: number, columnKey: string, value: any) => {
        dispatch({ type: 'UPDATE_CATEGORY', payload: { categoryId, columnKey, value } });
    }, []);

    const deleteCategory = useCallback((categoryId: number) => {
        dispatch({ type: 'DELETE_CATEGORY', payload: { categoryId } });
    }, []);

    // This function calculated the new order value.
    // The order value is a way to sort the categories.
    const getNewCategoryOrderPosition = () => {
        return state.reduce(
            (max, category) => (category.order > max ? category.order : max),
            0
        );
    }

    const value = useMemo(() => ({
        categories: state,
        actions: {
            addTask,
            updateTask,
            deleteTask,
            addCategory,
            updateCategory,
            deleteCategory,
            getNewCategoryOrderPosition,
        }
    }), [state]);

    return (
        <TaskManagerContext.Provider value={value}>
            {children}
        </TaskManagerContext.Provider>
    )
}

function useTaskManagerContext() {
    const context = useContext(TaskManagerContext);
    if (!context) {
        throw new Error('useTaskManagerContext must be used within a TaskManagerProvider');
    }
    return context;
}


export { TaskManagerProvider, useTaskManagerContext };