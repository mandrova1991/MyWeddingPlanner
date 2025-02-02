<?php

namespace App\Jobs;

use App\Events\Task\TaskCreatedEvent;
use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class BroadcastTaskCreatedEventJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Task $task;
    protected $user_id;

    public function __construct(Task $task, $user_id)
    {
        $this->task = $task;
        $this->user_id = $user_id;
    }

    public function handle(): void
    {
        broadcast(new TaskCreatedEvent(
            $this->task,
            $this->user_id)
        )->toOthers();
    }
}
