<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskMessages\CreateTaskMessageRequest;
use App\Http\Requests\TaskMessages\DeleteTaskMessageRequest;
use App\Http\Requests\TaskMessages\UpdateTaskMessageRequest;
use App\Http\Resources\TaskMassageResource;
use App\Http\Responses\ServerResponse;
use App\Models\TaskMassage;

class TaskMassageController extends Controller
{
    public function index()
    {
        return TaskMassageResource::collection(TaskMassage::all());
    }

    public function store(CreateTaskMessageRequest $request)
    {
        $taskMessage = TaskMassage::create($request->validated());


        return ServerResponse::basicResponse(
            'TaskMessage created successfully',
            new TaskMassageResource($taskMessage),
        );
    }

    public function show(TaskMassage $taskMassage)
    {
        return new TaskMassageResource($taskMassage);
    }

    public function update(UpdateTaskMessageRequest $request, TaskMassage $taskMassage)
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
