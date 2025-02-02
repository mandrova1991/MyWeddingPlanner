import React, {useEffect, useRef} from 'react';
import {useAuthContext} from "@/Contexts/AuthContext";
import {usePermissionContext} from "@/Contexts/Global/PermissonContext";
import {
    TaskMessageManagerProvider
} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Context/TaskMessageManager";
import TaskMessageList from "@/Components/MyWedding/Tasks/Features/TaskMessages/Components/TaskMessageList";
import TaskMessageControls from "@/Components/MyWedding/Tasks/Features/TaskMessages/Components/TaskMessageControls";
import {TaskType} from "@/types/Tasks/Task";

interface TaskMessagesComponentProps {
    task: TaskType
}

function TaskMessagesComponent() {
    const {hasPermissionTo} = usePermissionContext();
    const messageComponentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageComponentRef.current){
            const parentHeight = 700;
            const parentPadding = 40;
            const listHeight = parentHeight - (parentPadding * 2);
            messageComponentRef.current.style.height = listHeight + "px";
        }
    }, []);

    return (
        <div ref={messageComponentRef} className="border border-gray-200 rounded-3xl flex flex-col">
            {hasPermissionTo('view_task_messages') && (
                <TaskMessageManagerProvider>
                    <TaskMessageList />
                    <TaskMessageControls />
                </TaskMessageManagerProvider>
            )}
        </div>
    );
}

export default TaskMessagesComponent;