import React from "react";
import {TaskType} from "@/types/Tasks/Task";
import api from "@/axios";
import {usePage} from "@inertiajs/react";


/*
    This hook is created to handle all the api interactions regarding the database for Task
    It can create, update and delete them.
 */


export type useTaskDatabaseReturnType = {
    actions: {
        createTask: (task: TaskType) => Promise<TaskType>,
        updateTask: (task: TaskType) => void,
        deleteTask: (taskId: number) => void,
        getTask: (taskId: number) => Promise<TaskType>,
    },
}

export const useTaskDatabase = (): useTaskDatabaseReturnType => {
    const wedding = usePage().props.wedding as WeddingType;

    // TODO Handle Errors
    const createTask = async (task: TaskType) => {
        try{
            const response = await api.post(`/api/${wedding.id}/tasks/create`, task);
            console.log("response after create task", response);
            return response.data.objectData as TaskType;
        }catch(error){
            throw error;
        }
    }

    // TODO handle errors
    const updateTask = async (task: TaskType) => {
        try{
            const response = await api.put(`/api/${wedding.id}/tasks/update/${task.id}`, task);
            // if (response.data.status !== 200) {
            //     throw new Error("Update failed.");
            // }
        } catch (error){
            throw error;
        }
    }

    // TODO handle errors
    const deleteTask = async (taskID: number) => {
        const response = await api.delete(route('tasks.destroy', {wedding: wedding.id, task: taskID}));

    }

    const getTask = async (taskID: number) => {
        const response = await api.get(route('tasks.show', {wedding: wedding.id, task: taskID}));
        return response.data.objectData as TaskType;
    }


    return {
        actions: {
            createTask,
            updateTask,
            deleteTask,
            getTask
        },
    }
}