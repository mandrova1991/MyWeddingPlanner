import React, {useEffect, useState} from 'react';
import {
    TaskMessageManagerProvider, useTaskMessagesContext
} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Context/TaskMessageManager";
import TaskMessageTextarea from "@/Components/MyWedding/Tasks/Features/TaskMessages/Components/TaskMessageTextarea";
import {Send} from "lucide-react";
import {echo} from "@/echo";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {useAuthContext} from "@/Contexts/AuthContext";
import TaskMessageWhisperPlaceholder
    from "@/Components/MyWedding/Tasks/Features/TaskMessages/Components/TaskMessageWhisperPlaceholder";
import {TaskMessageType} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Types/message";
import {
    useTaskMessageDatabase
} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Hooks/UseTaskMessageDatabase";

function TaskMessageControls() {
    const [message, setMessage] = useState("");
    const {functions: TaskMessageListFunctions} = useTaskMessagesContext();
    const {user} = useAuthContext();
    const task = useTaskContext();
    const taskMessageDatabase = useTaskMessageDatabase();

    const sendWhisper = (typingState: boolean) => {
        echo.private(`tasks.${task.states.task.id}.messages`)
            .whisper('typing', {
                user: user,
                typing: typingState
            })
    }

    const handleChange = (value: string) => {
        setMessage(value);
        if (value != ""){
            sendWhisper(true);
        }
    }

    const handleSubmit = () => {
        sendWhisper(false);
        const thempId = -Math.random()
        const newMessage: TaskMessageType = {
            id: thempId, // transform to temporary one
            message: message,
            task_id: task.states.task.id,
            user_id: user.id,
            replied_to: null,
            created_at: new Date(),
        }
        TaskMessageListFunctions.addMessage(newMessage);
        const createdMessage = taskMessageDatabase.actions.addTaskMessage(newMessage, task.states.task);
        TaskMessageListFunctions.updateMessage(thempId, createdMessage);

    }

    return (
        <div className="">
            <TaskMessageWhisperPlaceholder/>
            <hr className="w-full h-0.5"></hr>
            <div className="task-messager-controls w-full flex justify-between items-center p-2  gap-2">
                <TaskMessageTextarea placeholder="Write a comment" onChange={handleChange} onSubmit={handleSubmit} onBlur={() => sendWhisper(false)}/>
                <button className="self-end" onClick={handleSubmit}>
                    <Send
                        className="bg-blue-700 w-full h-full p-2 rounded-full text-white hover:bg-gray-200 hover:text-gray-900"
                        strokeWidth={1.25} size={'32px'}/>
                </button>
            </div>
        </div>
    );
}

export default TaskMessageControls;