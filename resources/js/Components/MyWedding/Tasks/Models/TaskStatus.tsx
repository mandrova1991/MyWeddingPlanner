import React, {MouseEventHandler} from 'react';
import {twMerge} from "tailwind-merge";
import {CircleDot} from "lucide-react";

/*
    TaskStatus is the component that is shown. The color is different based on which status should render
    TODO implement statusses from the database with its color settings. In that way its customizable
 */

type TaskStatus = {
    name: string,
    title: string,
    color: string,
    status: string,
}
interface TaskStatusProps {
    status: TaskStatus
    onClick?: (status: TaskStatus) => void;
}
function TaskStatus({status, onClick}: TaskStatusProps) {
    let color = null;
    let textColor = null
    let dotColor = null
    switch (status.color) {
        case "red":
            color = "bg-red-500";
            textColor = "text-white"
            dotColor = "text-red-800";
            break;
        case "green":
            color = "bg-green-500";
            dotColor = "text-green-800";
            break;
        case "yellow":
            color = "bg-yellow-500";
            dotColor = "text-yellow-800";
            break;
        case "purple":
            color = "bg-purple-500";
            textColor = "text-white"
            dotColor = "text-purple-800";
            break;
    }

    const handleOnClick = () => {
        if (onClick) {
            onClick(status);
        }
    }

    return (
        <div className={twMerge("status-bg h-full px-3 flex items-center rounded", color, textColor)} onClick={handleOnClick}>
            <CircleDot strokeWidth={1.25} className={twMerge("w-4 h-4 ", dotColor)} />
            <p className="ml-3 text-sm">{status.title}</p>
        </div>
    );
}

export default TaskStatus;
