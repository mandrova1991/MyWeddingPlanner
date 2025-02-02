<?php

namespace App\Events\Task;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskDeletedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $task;
    public $excludedUser;

    public function __construct($task, $excludedUser)
    {
        $this->task = $task;
        $this->excludedUser = $excludedUser;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('wedding.' . $this->task['wedding_id'] . '.tasks')
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'task' => $this->task,
            'excludedUser' => $this->excludedUser
        ];
    }
}
