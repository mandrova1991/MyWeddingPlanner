import {TaskType} from "@/types/Tasks/Task";

export type TaskCategoryType = {
    id: number,
    name: string,
    order: number,
    wedding_id: number,
    created_by: number,
    tasks: TaskType[],
}
