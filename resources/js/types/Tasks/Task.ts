import {User} from "@/types";

export type TaskType = {
    id: number;
    title: string;
    description: string | null;
    status: string;
    order: number;
    due_date: Date | null;
    priority: string | null;
    progress: number;
    category_id: number;
    parent_task: number | null;
    wedding_id: number;
    assignees: User[] | [];
    created_by: number | null;
    updated_by: number | null;
    created_at: Date | null;
    updated_at: Date | null;
};
