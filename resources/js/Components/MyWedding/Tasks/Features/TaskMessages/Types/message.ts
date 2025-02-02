
export type TaskMessageType = {
    id: number,
    task_id: number,
    user_id: number,
    message: string,
    replied_to: number | null,
    created_at: Date,
}