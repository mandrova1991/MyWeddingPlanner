import React, {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {Ellipsis, Pencil, Trash2} from "lucide-react";
import TextDialog from "@/Components/MyWedding/Tasks/Overlay/TextDialog";
import YesNoDialog from "@/Components/MyWedding/Tasks/Overlay/YesNoDialog";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useTaskCategoryDatabase} from "@/hooks/Database/use-task-category-database";


/*
    This component renders the taskCategory menu dropdown.
    It holds functions such as Renaming and removing the taskCategory.
    May update with new features in the future
 */


function TaskCategoryMenuDropdown() {
    const [taskCategoryOptionsOpenened, setTaskCategoryOptionsOpenened] = useState(false);
    const taskCategory = useTaskCategoryContext();
    const taskManager = useTaskManagerFunctionContext();
    const taskCategoryDatabase = useTaskCategoryDatabase();


    // handle Renaming the taskCategory in the taskCategory Hook
    const handleRename = (value: string) => {
        // TODO rewrite to use the taskManagerFunctions
        const updatedCategory = {...taskCategory.state, 'name': value}; // Create a shallow copy of the current task
        taskManager.updateCategory(updatedCategory.id, 'name', value); // Update the name of the copy in the TaskManager
        taskCategoryDatabase.actions.updateTaskCategory(updatedCategory)  // Use the copy to update the taskCategory in the database
        setTaskCategoryOptionsOpenened(false);
    }

    // Handle to remove the taskCategory from the taskCategory Hook
    const handleRemove = () => {
        taskManager.deleteCategory(taskCategory.state.id); // Delete the category from the taskManager
        taskCategoryDatabase.actions.deleteTaskCategory(taskCategory.state.id); // Delete the category in the database
    }

    return (
        <Popover open={taskCategoryOptionsOpenened} onOpenChange={setTaskCategoryOptionsOpenened}>
            <PopoverTrigger className="focus-visible:outline-none">
                <Ellipsis className={'ml-3 cursor-pointer text-gray-400 hover:text-gray-500'} size={"18px"} strokeWidth={1.25}/>
            </PopoverTrigger>
            <PopoverContent className={'w-52 text-sm'}>
                <TextDialog title="Rename" defaultValue={taskCategory.state.name} description="Please provide a new name." triggerName="Rename" onSubmit={handleRename} icon={<Pencil strokeWidth={1.25} size={'18px'} />}/>
                <YesNoDialog title="Remove" description="Are you sure to delete the category and all its tasks?" onSubmit={handleRemove} icon={<Trash2 strokeWidth={1.25} size={'18px'}/>}/>
            </PopoverContent>
        </Popover>
    );
}

export default TaskCategoryMenuDropdown;