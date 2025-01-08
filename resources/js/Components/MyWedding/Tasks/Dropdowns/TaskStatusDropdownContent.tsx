import React from 'react';
import TaskStatus from "@/Components/MyWedding/Tasks/Models/TaskStatus";
import {SquarePlus} from "lucide-react";

/*
    This component renders the items in statusDropDownMenu.
    TODO update with database statussen. Also handeling adding a new status should be implemented
 */

function TaskStatusDropdownContent({statussen, onClick}: {statussen: object[], onClick: () => void}) {

    const handleAddNewStatus = () => {
        // TODO implent adding a new status
    }

    return (
        <div className="task-status-dropdown">
            <div className="flex items-center justify-between">
                <p className={'text-xs'}>Statuses</p>
                <SquarePlus className={'ml-auto cursor-pointer text-gray-300 hover:text-gray-500'} size={'19px'} strokeWidth={1.0} />
            </div>

                {statussen && Object.values(statussen).map((status, index) => (
                    <div key={index} className="task-status my-3 h-10">
                        <TaskStatus status={status} onClick={onClick}/>
                    </div>
                ))}
        </div>
    );
}

export default TaskStatusDropdownContent;