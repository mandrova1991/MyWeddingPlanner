import React from "react";
import {TaskMessageType} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Types/message";
import {TaskType} from "@/types/Tasks/Task";
import api from "@/axios";

export type useTaskMessageDatabaseReturnType = {
    actions: {
        addTaskMessage: (
            message: TaskMessageType,
            task: TaskType
        ) => Promise<TaskMessageType>;
        updateTaskMessage: (
            message: TaskMessageType,
            task: TaskType
        ) => void;
        deleteTaskMessage: (
            message: TaskMessageType,
            task: TaskType
        ) => void
    },
}

export const useTaskMessageDatabase = (): useTaskMessageDatabaseReturnType => {
    const addTaskMessage = async (message: TaskMessageType, task: TaskType) => {
        const response = await api.post(
            `/api/wedding/${task.wedding_id}/tasks/${task.id}/messages`,
            message
        );

        if (response.data.error !== null){
            console.error(response.data.error);
            // TODO handle Error
        }

        return response.data.ObjectData as TaskMessageType;
    }

    const updateTaskMessage = async (message: TaskMessageType, task: TaskType) => {
        const response = await api.put(
            `/api/wedding/${task.wedding_id}/tasks/${task.id}/messages`,
            [message]
        );

        if (response.data.error !== null){
            console.error(response.data.error);
            // TODO handle Error
        }

        return response.data.ObjectData as TaskMessageType;
    }

    const deleteTaskMessage = async (message: TaskMessageType, task: TaskType) => {
        const response = await api.delete(
            `/api/wedding/${task.wedding_id}/tasks/${task.id}/messages/${message.id}`,
        );

        if (response.data.error !== null){
            console.error(response.data.error);
            // TODO handle Error
        }
    }

    return {
        actions: {
            addTaskMessage,
            updateTaskMessage,
            deleteTaskMessage,
        },
    }
}