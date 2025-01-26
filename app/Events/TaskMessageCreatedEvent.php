<?php

namespace App\Events;

use App\Models\Task;
use App\Models\TaskMassage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskMessageCreatedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

//    private TaskMassage $message;
//    private Task $task;
//
//    public function __construct(TaskMassage $message, Task $task){
//        $this->message = $message;
//        $this->task = $task;
//    }

    public string $text = "test";

    public function __construct()
    {

    }

    public function broadcastOn(): array
    {
        return [
//            new Channel('task.' . $this->task->id . '.messages'),
            new Channel('test'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'test' => "test",
        ];
    }
}
