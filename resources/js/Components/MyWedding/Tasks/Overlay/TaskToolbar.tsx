import React from 'react';
import {TaskToolbarContext, useTaskToolbarContext} from "@/Contexts/Tasks/TaskToolbarContext";
import {CopyPlus, SquareX, Trash2} from "lucide-react";
import task from "@/Components/MyWedding/Tasks/Task";

function TaskToolbar() {
    const toolbar = useTaskToolbarContext();

    // toolbar.handlers.setToolBarOpened(true);

    const handleDeleteOnClick = () => {
        toolbar.handlers.handleDeleteTask(); // Delete selected Tasks
    }

    const handleDuplicateOnClick = () => {
        // duplicate selected tasks
    }

    const handleClearOnClick = () => {
        toolbar.handlers.handleClearTasks();
    }

    return (
        <>
            {toolbar.states.toolBarOpened && (
                <div
                    className="task-toolbar w-[60%] p-4 bg-slate-700 absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full text-white shadow-xl">
                    <div className="flex items-center">
                        <p className="font-medium text-sm">{toolbar.derived.getNumberOfTasksSelected()} tasks
                            selected</p>
                        <SquareX strokeWidth={1.25} className={"cursor-pointer ml-2"} onClick={handleClearOnClick}/>
                        <CopyPlus className="ml-auto cursor-pointer" onClick={handleDuplicateOnClick}/>
                        <Trash2 className="ml-4 cursor-pointer" onClick={handleDeleteOnClick}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskToolbar;