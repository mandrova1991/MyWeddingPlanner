import React, {useEffect, useRef} from 'react';
import {useTaskMessagesContext} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Context/TaskMessageManager";
import TaskMessage from "@/Components/MyWedding/Tasks/Features/TaskMessages/Components/TaskMessage";

function TaskMessageList() {
    const {messages} = useTaskMessagesContext();
    const messagesListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesListRef.current){
            messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={messagesListRef} key={'taskMessageList'} className="no-scrollbar task-message-list w-full flex-1 p-4 overflow-y-auto">
            {messages && Object.values(messages).map((message) => (
                    <TaskMessage key={message.id} message={message} />
            ))}
        </div>
    );
}

export default TaskMessageList;