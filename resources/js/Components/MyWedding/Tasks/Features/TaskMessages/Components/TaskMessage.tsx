import React from 'react';
import {TaskMessageType} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Types/message";
import {User} from "@/types";
import {useAuthContext} from "@/Contexts/AuthContext";
import {twMerge} from "tailwind-merge";

interface TaskMessageprops {
    message: TaskMessageType
}

function TaskMessage({ message }: TaskMessageprops) {
    const {user} = useAuthContext();

    return (
        <div className="my-4 flex flex-col">
            {user.id === message.user_id ? (
                <MessageByMe message={message} />
            ) : (
                <MessageByOthers message={message} />
            )}
        </div>
    );
}

export default TaskMessage;

function MessageByMe({ message }: {message: TaskMessageType}){
    // message from myself
    return(
        <MessageTemplate className="bg-blue-200 border-blue-300 self-end">
            <MessageText className="text-gray-700" text={message.message}/>
        </MessageTemplate>
    )
}

function MessageByOthers({ message }: {message: TaskMessageType}){
    // message by others
    return(
        <MessageTemplate className="bg-gray-200 border-gray-300">
            <MessageText className="text-gray-700" text={message.message}/>
        </MessageTemplate>
    )
}

function MessageTemplate({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <div className={twMerge("w-3/4 p-4 border rounded-xl", className)}>
            {children}
        </div>
    )
}

function MessageText({ text, className } : {text: string, className?: string }) {
    return(
        <p className={twMerge("text-sm font-thin", className)}>{text}</p>
    )
}