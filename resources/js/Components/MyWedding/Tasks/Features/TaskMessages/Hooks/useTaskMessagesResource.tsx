import React, {useEffect, useState} from 'react';
import api from "@/axios";
import {useWeddingContext} from "@/Contexts/Wedding/WeddingContext";
import {TaskMessageType} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Types/message";
import {TaskType} from "@/types/Tasks/Task";

function UseTaskMessagesResource(task: TaskType) {
    const [messages, setMessages] = useState<TaskMessageType[]>({} as TaskMessageType[]);
    const [loading, setLoading] = useState(true);
    const {wedding} = useWeddingContext();

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await api.get(`/api/wedding/${wedding.id}/tasks/${task.id}/messages`)
                .then((response) => setMessages(response.data.objectData))
        }

        if (task && wedding){
            fetchMessages();
            setLoading(false);
        }
    }, [task, wedding]);

    return {
        messages: messages,
        loading: loading
    };
}

export default UseTaskMessagesResource;