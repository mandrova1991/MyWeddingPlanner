<?php

namespace App\Events;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskUpdatedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Task $task,
        public $excludedUser
    )
    {
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('wedding' . $this->task->wedding_id . '.tasks' )
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'task' => new TaskResource($this->task),
            'excludedUser' => $this->excludedUser
        ];
    }
}
