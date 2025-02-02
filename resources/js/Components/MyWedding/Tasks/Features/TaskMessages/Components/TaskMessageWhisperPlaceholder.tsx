import React, {useEffect, useState} from 'react';
import {User} from "@/types";
import {echo} from "@/echo";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {Simulate} from "react-dom/test-utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";


function TaskMessageWhisperPlaceholder() {
    const [usersTyping, setUsersTyping] = useState<User[]>([] as User[])
    const task = useTaskContext();

    useEffect(() => {
        console.log(echo.options)
        echo.private(`tasks.${task.states.task.id}.messages`)
            .listenForWhisper('typing', (e: any) => {
                console.log(e)
                const user = e.user as User;
                const typing = e.typing;

                if (typing) {
                    setUsersTyping((prevState) => {
                        const existingUser = prevState.some((selectedUser) => selectedUser.id === user.id);
                        if (!existingUser) {
                            return [...prevState, user];
                        }

                        return prevState;
                    })
                } else {
                    setUsersTyping((prevState) => {
                        const existingUser = prevState.some((selectedUser) => selectedUser.id === user.id);
                        if (existingUser) {
                            return prevState.filter((selectedUser) => selectedUser.id !== user.id);
                        }

                        return prevState;
                    })
                }
            })
    }, []);

    return (
        <div className="flex pl-2">
            <div>
                {usersTyping && Object.values(usersTyping).map((user: User, index: number) => (
                    <TaskMessageAvatar key={user.id} user={user}/>
                ))}
            </div>
            <span className="p-2 text-sm italic text-gray-500">
                {usersTyping.length > 0 ? `${usersTyping.length > 1 ? 'are' : 'is'} typing...` : ''}
            </span>
        </div>
    );
}

function TaskMessageAvatar({user}: { user: User }) {
    return (
        <Avatar className="h-6 w-6 rounded-lg">
            <AvatarImage
                src={user.avatar}
                alt={user.name}/>
            <AvatarFallback
                className="rounded-full text-xs font-thin"
                style={{backgroundColor: user.avatar_color}}>{user.avatar_initials}</AvatarFallback>
        </Avatar>
    )
}

export default TaskMessageWhisperPlaceholder;