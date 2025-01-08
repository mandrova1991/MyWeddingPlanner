<?php

namespace App\Http\Controllers;

use App\Http\Responses\ServerResponse;
use App\Models\TaskCategory;
use App\Models\Wedding;
use Exception;
use Illuminate\Http\Request;

class TaskCategoryController extends Controller
{
    public function index(Wedding $wedding)
    {
        $taskCategories = TaskCategory::with('tasks')->where('wedding_id', $wedding->id)->get();

        return ServerResponse::basicResponse(
            'Task Categories retrieved successfully.',
            $taskCategories
        );
    }

    public function store(Request $request, Wedding $wedding)
    {
        try{
            $data = $request->validate([
                'name' => ['required'],
                'wedding_id' => ['required', 'integer'],
                'created_by' => ['required', 'integer'],
                'order' => ['required', 'integer'],
            ]);
        } catch (Exception $e){
            return ServerResponse::errorResponse(
                $e->getMessage(),
                'Trying to validate users input data',
                'should be validated when requirements are met',
                null,
            );
        }



        $userRole = auth()->user()->roleInWedding($wedding);
        if ($userRole != 'wedding_admin' && $userRole != 'wedding_planner') {
            return ServerResponse::basicResponse(
                'You are unauthorized!',
                null,
                401
            );
        }

        $taskCategory = TaskCategory::create($data);

        return ServerResponse::basicResponse(
            'Task Category created successfully!',
            $taskCategory,
        );
    }

    public function show(TaskCategory $taskCategory, Wedding $wedding)
    {
        return ServerResponse::basicResponse(
            'Task Category retrieved successfully!',
            $taskCategory,
        );
    }

    public function update(Request $request, Wedding $wedding, TaskCategory $taskCategory)
    {
        try{
            $data = $request->validate([
                'name' => ['string'],
                'wedding_id' => ['integer'],
                'created_by' => ['integer'],
            ]);
        } catch (Exception $e){
            return ServerResponse::errorResponse(
                $e->getMessage(),
                'Trying to validate users input data',
                'should be validated when requirements are met',
                ["request" => $request->all()],
            );
        }

        $userRole = auth()->user()->roleInWedding($wedding);
        if ($userRole != 'wedding_admin' && $userRole != 'wedding_planner') {
            return ServerResponse::errorResponse(
                "You are unauthorized!",
                'Trying to update task category',
                null,
                null,
            );
        }


        $taskCategory->update($data);

        return ServerResponse::basicResponse(
            'Task category updated successfully!',
            $taskCategory,
        );
    }

    public function destroy(Wedding $wedding, TaskCategory $taskCategory)
    {
        if ($taskCategory->wedding_id != $wedding->id) {
            return ServerResponse::errorResponse(
                'You are unauthorized!',
                'Trying to delete task category',
                null,
                null,
            );
        }

        $taskCategory->delete();

        return ServerResponse::basicResponse(
            'Task category deleted successfully!',
            null
        );
    }
}
