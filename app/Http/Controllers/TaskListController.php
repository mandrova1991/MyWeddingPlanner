<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use App\Models\Wedding;
use Inertia\Inertia;

class TaskListController extends Controller
{
    public function generateList(Wedding $wedding)
    {
        return Inertia::render('MyWedding/TaskList', [
            'task_categories' => $wedding->taskCategories,
            'tasks' => Tasks::with(['subtasks', 'assignees'])->where('wedding_id', $wedding->id)->get(),
            'users' => $wedding->users,
            'wedding' => $wedding,
        ]);
    }
}
