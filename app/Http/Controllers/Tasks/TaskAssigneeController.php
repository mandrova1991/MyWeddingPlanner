<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use App\Models\TaskAssignee;
use Illuminate\Http\Request;

class TaskAssigneeController extends Controller
{
    public function index()
    {
        return TaskAssignee::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users'],
            'tasks_id' => ['required', 'exists:tasks'],
        ]);

        return TaskAssignee::create($data);
    }

    public function show(TaskAssignee $taskAssignee)
    {
        return $taskAssignee;
    }

    public function update(Request $request, TaskAssignee $taskAssignee)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users'],
            'tasks_id' => ['required', 'exists:tasks'],
        ]);

        $taskAssignee->update($data);

        return $taskAssignee;
    }

    public function destroy(TaskAssignee $taskAssignee)
    {
        $taskAssignee->delete();

        return response()->json();
    }
}
