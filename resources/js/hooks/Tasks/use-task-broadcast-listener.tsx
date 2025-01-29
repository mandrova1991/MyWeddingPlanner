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

    console.log(user)

    // TODO use wedding id to set the correct channel. Need to fix a bug first to make sure the wedding id is not undefined
    useEffect(() => {
        const applyChangesToTaskList = (e: any, type: string, payload: {}) => {
            const excludedUser = e.excludedUser;
            if (excludedUser !== user.id) {
                dispatch({ type: type, payload: payload });
            }
        }

        echo.channel(`wedding.${1}.tasks`)
            .listen('TaskCreatedEvent', (e: any) => {
                const task = e.task as TaskType;
                const categoryId =  task.category_id;
                applyChangesToTaskList(e, 'ADD_TASK', {categoryId, task});
            })
            .listen('TaskUpdatedEvent', (e: any) => {
                const task = e.task as TaskType;
                const categoryId =  task.category_id;
                applyChangesToTaskList(e, 'UPDATE_TASK_WITH_TASK', {categoryId, task});
            })
            .listen('TaskDeletedEvent', (e: any) => {
                const task = e.task as TaskType;
                const taskId = task.id;
                const categoryId =  task.category_id;
                applyChangesToTaskList(e, 'DELETE_TASK', {categoryId, taskId});
            });
    }, []);
}

export default UseTaskBroadcastListener;