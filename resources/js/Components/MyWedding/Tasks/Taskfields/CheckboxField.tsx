import {useState} from 'react';
import {Checkbox} from "@/Components/ui/checkbox";
import {useTaskToolbar} from "@/hooks/use-task-toolbar";
import {useTaskToolbarContext} from "@/Contexts/Tasks/TaskToolbarContext";
import taskToolbar from "@/Components/MyWedding/Tasks/Overlay/TaskToolbar";
import {useTaskContext} from "@/Contexts/Tasks/TaskContext";
import {useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {useTaskManagerFunctionContext} from "@/Contexts/Tasks/TaskManagerFunctionContext";

/*
    The checkbox field is used to select a task. It is then added to the taskToolbar.
 */

function CheckboxField({taskId, taskCategoryId}: { taskId: number, taskCategoryId: number }) {
    const [visible, setVisible] = useState(false);
    const taskToolbar = useTaskToolbarContext();
    const {deleteTask} = useTaskManagerFunctionContext();

    const unCheck = () => {
        setVisible(false);
    }

    const onChange = (state: boolean) => {
        if (state){
            taskToolbar.actions.addTask(taskId, () => deleteTask(taskCategoryId, taskId), () => unCheck());
        } else {
            taskToolbar.actions.removeTask(taskId)
        }
        setVisible(state);
    }

    let hoverClasses = visible ? "opacity-100" : "opacity-0";

    return (
        <Checkbox className={`group-hover:opacity-100 ${hoverClasses} border-gray-300 data-[state=checked]:bg-slate-500`} value={"test"} checked={visible} onCheckedChange={onChange} />
    );
}

export default CheckboxField;