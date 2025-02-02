import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer} from "react";
import {TaskMessageType} from "@/Components/MyWedding/Tasks/Features/TaskMessages/Types/message";
import useTaskMessagesResource from "@/Components/MyWedding/Tasks/Features/TaskMessages/Hooks/useTaskMessagesResource";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import useTaskMessageListener from "@/Components/MyWedding/Tasks/Features/TaskMessages/Hooks/UseTaskMessageListener";

interface TaskMessageContextProps {
    messages: TaskMessageType[];
    functions: TaskMessageManagerFunctions;
}

type TaskMessageManagerFunctions = {
    addMessage: (message: TaskMessageType) => void,
    updateMessage: (oldMessageId: number, message: TaskMessageType) => void,
}

export interface TaskMessageActionInterface {
    type: string;
    payload: any;
}

const TaskMessageManagerContext = createContext<TaskMessageContextProps | undefined>( undefined )

function taskMessageManagerReducer(state: TaskMessageType[], action: TaskMessageActionInterface): TaskMessageType[] {
    switch (action.type) {
        case 'SET_MESSAGES': {
            return action.payload.messages;
        }
        case 'ADD_MESSAGE': {
            const { message } = action.payload;
            return [...state, message];
        }
        case 'UPDATE_MESSAGE': {
            const { oldMessageId, message } = action.payload;
            const newState = state.map(oldMessage => {
                if (oldMessage.id === oldMessageId) {
                    return message
                }
                return oldMessage;
            });
        }

        default:
            return state;
    }
}

function TaskMessageManagerProvider({children}: {children: ReactNode}) {
    const {states: {task}} = useTaskContext();
    const {messages: initialMessages, loading} = useTaskMessagesResource(task);
    const [messages, dispatch] = useReducer(taskMessageManagerReducer, []);
    useTaskMessageListener({dispatch});

    useEffect(() => {
        if (initialMessages.length > 0) {
            dispatch({ type: 'SET_MESSAGES', payload: { messages: initialMessages } });
        }
    }, [initialMessages]);

    const addMessage = useCallback((message: TaskMessageType) => {
        dispatch({type: 'ADD_MESSAGE', payload: {message}});
    }, []);

    const updateMessage = useCallback((oldMessageId: number, message: TaskMessageType) => {
        dispatch({type: 'UPDATE_MESSAGE', payload: {oldMessageId, message}});
    }, [])

    const functions = useMemo(() => ({
        addMessage,
        updateMessage
    }), [])

    return(
        <TaskMessageManagerContext.Provider value={{messages, functions}} >
            {children}
        </TaskMessageManagerContext.Provider>
    )
}

function useTaskMessagesContext() {
    const context = useContext(TaskMessageManagerContext);
    if (!context) {
        throw new Error('useTaskMessagesResourceResource must be used within a TaskManagerProvider');
    }
    return context;
}

export { TaskMessageManagerProvider, useTaskMessagesContext };