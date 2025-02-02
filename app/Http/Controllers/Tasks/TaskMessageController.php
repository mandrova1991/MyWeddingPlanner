<?php

namespace App\Http\Controllers\Tasks;

use App\Events\TaskMessage\TaskMessageCreatedEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\TaskMessages\CreateTaskMessageRequest;
use App\Http\Requests\TaskMessages\DeleteTaskMessageRequest;
use App\Http\Requests\TaskMessages\IndexTaskMessageRequest;
use App\Http\Requests\TaskMessages\UpdateTaskMessageRequest;
use App\Http\Resources\TaskMassageResource;
use App\Http\Responses\ServerResponse;
use App\Jobs\BroadcastTaskEventJob;
use App\Models\Task;
use App\Models\TaskMessage;
use App\Models\Wedding;

class TaskMessageController extends Controller
{
    public function index(IndexTaskMessageRequest $request, Wedding $wedding, Task $task)
    {
        $request->authorize();
        $messages = $task->messages()
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return ServerResponse::basicResponse(
            'data retrieved successfully',
            TaskMassageResource::collection($messages)
        );
    }

    public function store(CreateTaskMessageRequest $request, Wedding $wedding, Task $task)
    {
        $taskMessage = TaskMessage::create($request->validated());
        BroadcastTaskEventJob::dispatch(new TaskMessageCreatedEvent($taskMessage, $task, auth()->user()));

        return ServerResponse::basicResponse(
            'TaskMessage created successfully',
            new TaskMassageResource($taskMessage),
        );
    }

    public function update(UpdateTaskMessageRequest $request, TaskMessage $taskMassage)
    {
        $taskMassage->update($request->validated());

        return ServerResponse::basicResponse(
            'TaskMessage updated successfully',
            new TaskMassageResource($taskMassage)
        );
    }

    public function destroy(DeleteTaskMessageRequest $taskMassage)
    {
        $taskMassage->delete();

        return ServerResponse::basicResponse(
            'Message has been deleted',
            null
        );
    }
}
