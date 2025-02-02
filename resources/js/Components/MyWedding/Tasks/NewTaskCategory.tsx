import React, {useState} from 'react';
import {Dialog, DialogContent} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";
import {PlusCircle} from "lucide-react";
import {Input} from "@/Components/ui/input";
import {useTaskCategoryDatabase} from "@/hooks/Database/use-task-category-database";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useWeddingContext} from "@/Contexts/Wedding/WeddingContext";
import {useAuthContext} from "@/Contexts/AuthContext";


// New TaskCategory dialog is a dialog that appears when the user clicks the "Add Category" button.
// Its meant to create a new TaskCategory.
// TODO implement function to add a new Category

function NewTaskCategory({buttonClassName}: { buttonClassName?: string }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const taskCategoryDatabase = useTaskCategoryDatabase();

    const taskManager = useTaskManagerFunctionContext();
    const {addCategory, updateCategory} = useTaskManagerFunctionContext();
    const {wedding} = useWeddingContext();
    const {user: authUser} = useAuthContext();

    const handleSubmit = async () => {
        const newCategory: TaskCategoryType = {
            id: 0,
            name: categoryName,
            tasks: [],
            order: taskManager.getNewCategoryOrderPosition(),
            wedding_id: wedding.id,
            created_by: authUser.id,
        }

        // Create a temporary TaskCategory
        const tempID = -Math.random();
        const tempCategory = {...newCategory, id: tempID};

        // Handle Storing
        addCategory(tempCategory);// add Temporary taskCategory to the taskManager
        const storedCategory = await taskCategoryDatabase.actions.addNewTaskCategory(tempCategory); // Store temporary taskCategory in the database via API
        updateCategory(tempCategory.id, 'id', storedCategory.id); // Update the temporary taskCategory's id with the one coming from the database

        setOpenDialog(false);
    }

    return (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <Button className={buttonClassName} onClick={() => setOpenDialog(!openDialog)}>
                    <PlusCircle strokeWidth={1.25} size={'34px'} className={'text-white-700'}/>
                    Add Category
                </Button>
                <DialogContent>
                    <Input onChange={(e) => setCategoryName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") handleSubmit()}} placeholder="Enter Category Name"/>
                    <Button className={'mt-4 bg-blue-700 hover:bg-blue-500'} onClick={() => handleSubmit()}>Create Category</Button>
                </DialogContent>
            </Dialog>
    );
}

export default NewTaskCategory;