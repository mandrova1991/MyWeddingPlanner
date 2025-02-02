import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import api from "@/axios";
import {usePage} from "@inertiajs/react";
import {useWeddingContext} from "@/Contexts/Wedding/WeddingContext";

/*
    This hook is created to handle all the api interactions regarding the database for TaskCategories
    It can create, update and delete them.
 */

export type useReturnType = {
    actions: {
        addNewTaskCategory: (category: TaskCategoryType) => TaskCategoryType;
        updateTaskCategory: (category: TaskCategoryType) => void;
        deleteTaskCategory: (categoryID: number) => void;
    },
}

export const useTaskCategoryDatabase = (): {
    actions: {
        addNewTaskCategory: (category: TaskCategoryType) => Promise<TaskCategoryType>;
        deleteTaskCategory: (categoryID: number) => Promise<void>;
        updateTaskCategory: (category: TaskCategoryType) => Promise<void>
    }
} => {
    const {wedding} = useWeddingContext();

    const addNewTaskCategory = async (category: TaskCategoryType) => {
        try {
            const newTaskCategory = await api.post(route('tasksCategory.create', {wedding: wedding.id}), category);
            return newTaskCategory.data.objectData as TaskCategoryType;
        }catch (error){
            console.log("API Error: ", error);
            throw error;
        }
    }

    const updateTaskCategory = async (category: TaskCategoryType) => {
        try{
            const updatedTask = await api.put(route('tasksCategory.update', {wedding: wedding.id, taskCategory: category.id}), category);
        } catch (error){
            console.log("API Error: ", error);
            throw error;
        }
    }

    const deleteTaskCategory = async (categoryID: number) => {
        try{
            await api.delete(route('tasksCategory.destroy', {wedding: wedding.id, taskCategory: categoryID}))
        }catch (error){
            console.log("API Error: ", error);
            throw error;
        }
    }


    return {
        actions: {
            addNewTaskCategory,
            updateTaskCategory,
            deleteTaskCategory,
        },
    }
}