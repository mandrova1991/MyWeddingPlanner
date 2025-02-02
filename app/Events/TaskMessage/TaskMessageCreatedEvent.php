<?php

namespace App\Events\TaskMessage;

use App\Models\Task;
use App\Models\TaskMessage;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskMessageCreatedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private TaskMessage $message;
    private Task $task;
    private User $user;

    public function __construct(TaskMessage $message, Task $task, User $user){
        $this->message = $message;
        $this->task = $task;
        $this->user = $user;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('tasks.' . $this->task->id . '.messages'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'task_message' => $this->message,
            'user' => $this->user,
        ];
    }
}
