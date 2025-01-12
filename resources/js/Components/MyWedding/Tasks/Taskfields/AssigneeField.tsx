import React, {useEffect} from 'react';
import {Trash2, UserPlus2} from "lucide-react";
import TableContentCell from "@/Components/MyWedding/Tasks/Table/TableContentCell";
import {usePage} from "@inertiajs/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/Components/ui/tooltip";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {User} from "@/types";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskDatabase} from "@/hooks/Database/use-task-database";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {TaskType} from "@/types/Tasks/Task";
import {TaskFieldProps} from "@/Components/MyWedding/Tasks/Task";

/*
    The assigneefield is used to assigne users to tasks.
    It is possible to assign multiple users to one task. They are shown as their avatar.
    The user list is taken from the weddings know users. The users are shown in a list.
    Assigned user are shown above this list. When a user is assigned as assignee the user willen be removed from the wedding users list.
    They will be added back when they are remove as assignee aswell.
 */

type Assignee = {
    id: number,
    user_id: number,
    tasks_id: number
}

function AssigneeField({value: currentAssignees, onChange, taskId}: TaskFieldProps & {taskId: number}) {
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
    const [shouldUpdate, setShouldUpdate] = React.useState(false);
    const [users, setUsers] = React.useState<User[]>([]);
    const initialUsers = usePage().props.users as User[];

    // prepare users from pageProps and remove users that are already assigned to the task
    useEffect(() => {
        const filteredUsers = initialUsers.filter(
            (user) => !Object.values(currentAssignees as Assignee[]).some((assignee) => assignee.id === user.id)
        );

        const selectedUsers = initialUsers.filter(
            (user) => Object.values(currentAssignees as Assignee[]).some((assignee) => {
                console.log("assignee", assignee);
                console.log("user", user)
                return assignee.user_id === user.id;
            })
        );

        setUsers(filteredUsers.sort((a, b) => a.name.localeCompare(b.name)));
        setSelectedUsers(selectedUsers.sort((a, b) => a.name.localeCompare(b.name)));
    }, [currentAssignees]);

    // update Users as assignee when there has been a change in assigned users.
    useEffect(() => {
        if (shouldUpdate) {
            updateTaskWithUpdatedAssignees(selectedUsers);
            setShouldUpdate(false);
        }
    }, [selectedUsers]);

    // adds a new user as assignee
    const addAssignee = (user: User) => {
        setShouldUpdate(true);
        const newUsers = [...selectedUsers, user].sort((a, b) => a.name.localeCompare(b.name));
        setSelectedUsers(newUsers);
        removeAssigneeFromUsers(user);
    };

    // removes a user from the assignee list
    const deleteAssignee = (user: User) => {
        setShouldUpdate(true);
        const newUsers = [...selectedUsers, user]
            .filter(selectedUser => selectedUser.id !== user.id)
            .sort((a, b) => a.name.localeCompare(b.name));
        setSelectedUsers(newUsers);
        addUserToUsers(user);
    };

    // update the task with the new assignees
    function updateTaskWithUpdatedAssignees(assignees: User[]) {
        const assigneeList = assignees.map((assignee) => {
            return {id: 0, user_id: assignee.id, tasks_id: taskId};
        })

        onChange('assignees', assigneeList);
    }

    // remove a user from the users list. when its add as assignee.
    function removeAssigneeFromUsers(userToRemove: User) {
        setUsers(prevState => prevState
            .filter(user => user.id !== userToRemove.id)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
    }

    // Add user back to users list
    function addUserToUsers(user: User) {
        setUsers(prevState => [...prevState, user].sort((a, b) => a.name.localeCompare(b.name)));
    }

    return (
        <TableContentCell>
            <div className="cursor-pointer w-full">
                <Popover>
                    <PopoverTrigger className="w-full flex items-center h-full">
                        <div>
                            {Object.values(selectedUsers).length != 0 && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-full flex items-center" asChild>
                                            <div>
                                                {selectedUsers && Object.values(selectedUsers).map((user, index) => (
                                                    <Assignee key={index} user={user}/>
                                                ))}


                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="w-fit">
                                            {selectedUsers && Object.values(selectedUsers).map((user, index) => (
                                                <div key={index} className="w-full flex items-center my-2">
                                                    <AssigneeStrip user={user}/>

                                                </div>
                                            ))}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                            {Object.values(selectedUsers).length == 0 && (
                                <UserPlus2 strokeWidth={1.25} className="assignee text-gray-300"/>
                            )}
                        </div>

                    </PopoverTrigger>
                    <PopoverContent className="shadow-xl">
                        <div className="assignee-selector">
                            <p className="text-xs font-thin">Assignees</p>
                            <div className="current-assignees ">
                                {selectedUsers && Object.values(selectedUsers).map((user, index) => (
                                    <SelectedAssignee key={index} assignee={user} onDelete={deleteAssignee}/>
                                ))}
                                {selectedUsers && Object.values(selectedUsers).length == 0 && (
                                    <p className="text-sm my-3 mx-2">No users assigned</p>
                                )}
                            </div>

                            <p className="text-xs font-thin">Users</p>
                            <div className="user-list">
                                {Object.values(users).map((user, index) => (
                                    <AssigneeSelector key={index} user={user} onSelect={addAssignee}/>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </TableContentCell>
    );
}

export default AssigneeField;


// Assignee holds the avatar. Assignee is used in the assigneefield shown in the TaskList.
// TODO rewrite this to have it accept UserType
function Assignee({user}: { user: User }) {
    const {auth} = usePage().props;
    const userInitials = auth.user.id == user.id ? "Me" : user.avatar_initials;

    return (
        <div className="task-assignee flex items-center -ml-3 first:ml-0">
            <Avatar className="h-6 w-6 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name}/>
                <AvatarFallback className="rounded-full text-xs font-thin" style={{backgroundColor: user.avatar_color}}>{userInitials}</AvatarFallback>
            </Avatar>
        </div>
    )
}

// The AssigneeSelector handles the click function. It also has the AssigneeStrip as its child.
// This is used in the assigneeSelectionList
// TODO rewrite this to have it accept UserTypes
function AssigneeSelector({user, onSelect}: { user: User, onSelect?: (user: User) => void }) {
    const handleOnClick = () => {
        if (!onSelect) {
            return;
        }

        onSelect(user);
    }

    return (
        <div className="flex items-center py-3 px-2 hover:bg-gray-50 cursor-pointer select-none"
             onClick={handleOnClick}>
            <AssigneeStrip user={user}/>
        </div>
    )
}


// AssigneeStrip is the visual representation of the user in the assigneeSelectionList.
// TODO rewrite this to have it accept UserType
function AssigneeStrip({user}: { user: User }) {
    const {auth} = usePage().props;
    const userInitials = auth.user.id == user.id ? "Me" : user.avatar_initials;

    return (
        <>
            <Avatar className="h-6 w-6 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name}/>
                <AvatarFallback className="rounded-full text-xs font-thin" style={{backgroundColor: user.avatar_color}}>{userInitials}</AvatarFallback>
            </Avatar>
            <p className="font-medium text-sm ml-2">{auth.user.id == user.id ? "Me" : user.name}</p>
        </>
    )
}

// SelectedAssignee is the visual representation of the user in the current assignees list.
// TODO rewrite this to have it accept UserTypes
function SelectedAssignee({assignee, onDelete}: { assignee: User, onDelete: (assignee: User) => void }) {
    const handleClick = () => {
        onDelete(assignee);
    }

    return (
        <div className="flex items-center px-2 py-3 group w-full hover:bg-gray-50 select-none">
            <AssigneeStrip user={assignee}/>
            <Trash2 className="ml-auto w-5 h-5 text-red-500 cursor-pointer group-hover:block hidden"
                    onClick={handleClick}/>
        </div>
    )
}
