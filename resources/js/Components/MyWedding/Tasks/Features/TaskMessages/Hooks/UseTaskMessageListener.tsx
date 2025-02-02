import React, {Dispatch, useEffect} from 'react';
import {echo} from "@/echo";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {
    TaskMessageActionInterface
} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Context/TaskMessageManager";
import {TaskMessageType} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Types/message";
import {useAuthContext} from "@/Contexts/AuthContext";
import {User} from "@/types";

interface TaskMessageListenerProps {
    dispatch: (actions: TaskMessageActionInterface) => void;
}

function UseTaskMessageListener({dispatch}: TaskMessageListenerProps) {
    const task = useTaskContext();
    const {user} = useAuthContext();

    useEffect(() => {
        echo.private(`tasks.${task.states.task.id}.messages`)
            .listenToAll((e: any)=> {
            })
            .listen('TaskMessage\\TaskMessageCreatedEvent', (e: any) => {
                const message = e.task_message as TaskMessageType;
                const authUser = e.user as User;
                if (authUser.id !== user.id){
                    console.log('user not me')
                    dispatch({type: 'ADD_MESSAGE', payload: {message: message}});
                }
            });
    }, []);
}

export default UseTaskMessageListener;