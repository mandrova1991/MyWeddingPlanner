import {Dispatch, useEffect} from 'react';
import {
    taskListManagerActionInterface,
} from "@/Components/MyWedding/Tasks/TaskListManager/TaskManager";
import {echo} from "@/echo";
import {UseWeddingContext} from "@/Contexts/Wedding/WeddingContext";
import {TaskType} from "@/types/Tasks/Task";
import {useAuthContext} from "@/Contexts/AuthContext";

interface UseTaskBroadcastListenerProps {
    dispatch: (actions: taskListManagerActionInterface) => void
}

const UseTaskBroadcastListener = ({dispatch} : UseTaskBroadcastListenerProps) => {
    const {wedding} = UseWeddingContext();
    const {user} = useAuthContext();

    // TODO use wedding id to set the correct channel. Need to fix a bug first to make sure the wedding id is not undefined
    useEffect(() => {
        echo.channel(`wedding.${1}.tasks`)
            .listen('TaskCreatedEvent', (e: any) => {
                const excludedUser = e.excludedUser;
                if (excludedUser.id !== user.id) {
                    const task = e.task as TaskType;
                    const categoryId =  task.category_id;
                    dispatch({ type: 'ADD_TASK', payload: { categoryId , task } });
                }
            });
    }, []);
}

export default UseTaskBroadcastListener;