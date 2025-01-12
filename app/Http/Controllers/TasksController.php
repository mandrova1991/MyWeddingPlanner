<?php

namespace App\Http\Controllers;

use App\Http\Responses\ServerResponse;
use App\Models\TaskAssignee;
use App\Models\Tasks;
use App\Models\User_Wedding_Role;
use App\Models\Wedding;
use Exception;
use App\Http\Responses;
use Illuminate\Http\Request;

use Laravel\Sanctum\Sanctum;
use MongoDB\Driver\Server;
use function Laravel\Prompts\error;

class TasksController extends Controller
{
    public function index(Wedding $wedding)
    {

    }

    public function store(Request $request, Wedding $wedding)
    {

        try {
            // Validate incomming data
            $data = $request->validate([
                'id' => ['numeric'],
                'title' => ['required', 'string'],
                'description' => ['string', 'nullable'],
                'status' => ['required', 'string'],
                'category_id' => ['required', 'integer'],
                'order' => ['required', 'integer'],
                'due_date' => ['date', 'nullable'],
                'parent_task' => ['numeric', 'nullable'],
                'wedding_id' => ['numeric', 'required'],
                'priority' => ['string', 'nullable'],
                'progress' => ['integer'],
                'created_at' => ['date'],
                'updated_at' => ['date'],
                'updated_by' => ['numeric', 'nullable'],
                'created_by' => ['numeric', 'nullable'],
            ]);
        } catch (Exception $e) {
            return ServerResponse::errorResponse(
                $e->getMessage(),
                $request->route(),
                'Should validate input data',
                $request->all()
            );
        }


        // Get wedding and the users role in the wedding
        $userRole = auth()->user()->roleInWedding($wedding);

        // check if user has permission based on its role in the wedding
        if ($userRole != 'wedding_admin' && $userRole != 'wedding_planner') {
            return ServerResponse::basicResponse(
                'You are unauthorized!',
                null,
                401
            );
        }


        // Create the task as is given
        $task = Tasks::create($data);
        $taskData = Tasks::with(['subtasks', 'assignees'])->find($task->id);

        // Return a response.
        return ServerResponse::basicResponse(
            'Task created',
            $taskData,
        );
    }

    public function show(Wedding $wedding, Tasks $task)
    {


        return ServerResponse::basicResponse(
            'Task found',
            Tasks::with(['subtasks', 'assignees'])->find($task->id),
        );
    }

    public function update(Request $request, Wedding $wedding, Tasks $task)
    {
        try {
            // Validate user input. Note: none of these are set as required. Only updated fields have to be sent.
            // This ensures that our server isn't losing resources based on data thats already known.
            $data = $request->validate([
                'id' => ['numeric'],
                'title' => ['required', 'string'],
                'description' => ['string', 'nullable'],
                'status' => ['required', 'string'],
                'category_id' => ['required', 'integer'],
                'order' => ['required', 'integer'],
                'due_date' => ['date', 'nullable'],
                'parent_task' => ['numeric', 'nullable'],
                'wedding_id' => ['numeric', 'required'],
                'priority' => ['string', 'nullable'],
                'progress' => ['integer', 'nullable'],
                'created_at' => ['date'],
                'updated_at' => ['date'],
                'updated_by' => ['numeric', 'nullable'],
                'created_by' => ['numeric', 'nullable'],
            ]);


            // check if user has permission based on its role in the wedding
            $userRole = auth()->user()->roleInWedding($wedding);
            if ($userRole != 'wedding_admin' && $userRole != 'wedding_planner') {
                return ServerResponse::basicResponse(
                    'You are unauthorized!',
                    null,
                    401
                );
            }


            // Update task with new data
            $task->update($data);
            $assignees = $request->input('assignees');
            $assignees = array_map(function ($assignee) {
                return $assignee['user_id'];
            }, $assignees);

            $currentAssignees = TaskAssignee::where('tasks_id', $task->id)
                ->pluck('user_id')
                ->toArray();

            $toAdd = array_diff($assignees, $currentAssignees);
            $toRemove = array_diff($currentAssignees, $assignees);

            if ($toRemove){
                TaskAssignee::where('tasks_id', $task->id)
                    ->whereIn('user_id', $toRemove)
                    ->delete();
            }

            if ($toAdd) {
                foreach ($toAdd as $userId) {
                    TaskAssignee::create([
                        'user_id' => $userId,
                        'tasks_id' => $task->id,
                    ]);
                }
            }

        } // Send error when there is an issues within the validation process
        catch (\Illuminate\Validation\ValidationException $e) {
            return ServerResponse::errorResponse(
                $e->getMessage(),
                $request->route(),
                "Should validate input data",
                $task,
            );
        }

            // Send response when validation happend and is correct
            // It means that there is an issue with updating the task in the database
        catch (\Exception $e) {
            return ServerResponse::errorResponse(
                $e->getMessage(),
                $request->route(),
                "Should Update task",
                $task,
            );
        }


        // Send a correct response
        return ServerResponse::basicResponse(
            'Task updated',
            Tasks::with(['subtasks', 'assignees'])->find($task->id),
            200
        );
    }

    public function destroy(Wedding $wedding, Tasks $task)
    {
        // check if task is coupled to wedding
        if ($task->wedding_id != $wedding->id) {
            return ServerResponse::errorResponse(
                'You are unauthorized!',
                'Trying to delete a task that doesn\'t belong to the wedding!',
                status: 401
            );
        }

        $task->delete();

        return ServerResponse::basicResponse(
            'Task deleted',
            null
        );
    }
}
