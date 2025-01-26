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

    useEffect(() => {
        echo.channel(`wedding.${1}.tasks`)
            .listen('TaskCreatedEvent', (e) => {
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