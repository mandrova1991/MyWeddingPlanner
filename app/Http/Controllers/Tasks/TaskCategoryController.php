<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskCategories\CreateNewTaskCategoryRequest;
use App\Http\Requests\TaskCategories\DeleteTaskCategoryRequest;
use App\Http\Requests\TaskCategories\UpdateTaskCategoryRequest;
use App\Http\Resources\TaskCategoryResource;
use App\Http\Responses\ServerResponse;
use App\Models\TaskCategory;
use App\Models\Wedding;

class TaskCategoryController extends Controller
{
    public function index(Wedding $wedding)
    {
//        $taskCategories = TaskCategory::with('tasks')->where('wedding_id', $wedding->id)->get();
        $taskCategories = TaskCategory::where('wedding_id', $wedding->id)->get();

        return ServerResponse::basicResponse(
            'Task Categories retrieved successfully.',
            $taskCategories
        );
    }

    public function store(CreateNewTaskCategoryRequest $request, Wedding $wedding)
    {
        $data = $request->validated();

        $taskCategory = TaskCategory::create($data);

        return ServerResponse::basicResponse(
            'Task Category created successfully!',
            new TaskCategoryResource($taskCategory),
        );
    }

    public function show(TaskCategory $taskCategory, Wedding $wedding)
    {
        return ServerResponse::basicResponse(
            'Task Category retrieved successfully!',
            $taskCategory,
        );
    }

    public function update(UpdateTaskCategoryRequest $request, Wedding $wedding, TaskCategory $taskCategory)
    {
        $data = $request->validated();

        $taskCategory->update($data);

        return ServerResponse::basicResponse(
            'Task category updated successfully!',
            $taskCategory,
        );
    }

    public function destroy(DeleteTaskCategoryRequest $request, Wedding $wedding, TaskCategory $taskCategory)
    {
        $taskCategory->delete();

        return ServerResponse::basicResponse(
            'Task category deleted successfully!',
            null
        );
    }
}
