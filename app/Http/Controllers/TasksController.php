<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tasks\DeleteTaskRequest;
use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Responses\ServerResponse;
use App\Models\Task;
use App\Models\User_Wedding_Role;
use App\Models\Wedding;

class TasksController extends Controller
{
    public function index(Wedding $wedding)
    {
        $tasks = Task::where("wedding_id", $wedding->id)->get();
        return ServerResponse::basicResponse(
            'Index',
            TaskResource::collection($tasks),
        );
    }

    public function store(StoreTaskRequest $request, Wedding $wedding)
    {
        $validatedData = $request->validated();

        $task = Task::create($validatedData);

        return ServerResponse::basicResponse(
            'Task created',
            new TaskResource($task),
        );
    }

    public function show(Wedding $wedding, Task $task)
    {
        return ServerResponse::basicResponse(
            'Task found',
            new TaskResource($task),
        );
    }

    public function update(UpdateTaskRequest $request, Wedding $wedding, Task $task)
    {
        $data = $request->validated();

        $task->update($data);
        $assignees = collect($request->input('assignees'))->pluck('user_id')->toArray();
        $task->assignees()->sync($assignees);

        return ServerResponse::basicResponse(
            'Task updated',
            new TaskResource($task),
            200
        );
    }

    public function destroy(DeleteTaskRequest $request, Wedding $wedding, Task $task)
    {
        $task->delete();

        return ServerResponse::basicResponse(
            'Task deleted',
            null
        );
    }
}
