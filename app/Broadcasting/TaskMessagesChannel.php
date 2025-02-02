<?php

namespace App\Broadcasting;

use App\Models\Task;
use App\Models\User;
use App\Models\Wedding;

class TaskMessagesChannel
{
    public function __construct()
    {
    }

    public function join(User $user, Task $task): bool
    {
        $wedding = Wedding::findOrFail($task->wedding_id);
        return $user->hasPermissionInWedding('create_task_messages', $wedding);
    }
}
