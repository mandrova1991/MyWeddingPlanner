<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\TaskCategory;
use App\Models\Task;
use App\Models\User;
use App\Models\User_Wedding_Role;
use App\Models\Wedding;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TasksTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateTaskByUserWithRights()
    {
        $this->seedPermissions();
        $wedding_data = $this->createUserAndLogin('admin');

        $taskCategory = $this->createTaskCategory();
        $task = Task::factory()->make([
            'title' => 'Test Task',
            'wedding_id' => $wedding_data->id,
            'category_id' => $taskCategory->id,
            'order' => 1,
        ]);

        $response = $this->post(route('tasks.store', ['wedding' => $wedding_data->id]), $task->toArray());

        $response->assertStatus(200);
    }

    public function testCreateTaskByUserWithoutRights()
    {
        $this->seedPermissions();
        $taskCategory = $this->createTaskCategory();
        $wedding_data = $this->createUserAndLogin('guest');

        $task = Task::factory()->make([
            'title' => 'Test Task',
            'wedding_id' => $wedding_data->id,
            'category_id' => $taskCategory->id,
            'order' => 1,
        ]);
        $response = $this->post(route('tasks.store', ['wedding' => $wedding_data->id]), $task->toArray());

        $response->assertStatus(403);
    }

    public function testCanUpdateAsWeddingAdmin()
    {
        $this->UpdateTask('admin', 200);
    }

    public function testCannotUpdateAsGuest()
    {
        $this->UpdateTask('guest', 403, false);
    }


    public function UpdateTask($role, $shouldBeStatus, $checkJson = true)
    {
        $this->seedPermissions();
        // Setup data
        $taskCategory = $this->createTaskCategory();
        $task = Task::factory()->create([
            'title' => 'Test Task',
            'wedding_id' => 1,
            'category_id' => $taskCategory->id,
            'order' => 1,
        ]);

        // Alther task before userLogin.
        $task['assignees'] = [];
        $task->title = "Deze titel is veranderd";

        // Login and try to update the created task
        $wedding_data = $this->createUserAndLogin($role);
        $response = $this->put(route('tasks.update', ['wedding' => $wedding_data->id, 'task' => $task->id]), $task->toArray());
        $response->assertStatus($shouldBeStatus);
        if ($checkJson){
            $response->assertJsonFragment([
                'id' => $task->id,
                'title' => 'Deze titel is veranderd',
            ]);
        }
    }

    public function testDeleteTask()
    {
        $this->seedPermissions();
        $wedding_data = $this->createUserAndLogin('admin');

        $task = Task::create([
            'title' => 'Test Task',
            'description' => 'Test Description',
            'wedding_id' => $wedding_data->id,
            'status' => 'open',
        ]);

        $response = $this->delete(route('tasks.destroy', ['wedding' => $wedding_data->id, 'task' => $task->id]));

        $response->assertStatus(200);
    }

    public function testWrongWeddingIDOnDeletion()
    {
        $this->seedPermissions();
        $extraWedding = Wedding::create([
            'id' => 1,
            'name' => 'Test Wedding',
        ]);

        $wedding_data = $this->createUserAndLogin('admin');

        $task = Task::create([
            'title' => 'Test Task',
            'description' => 'Test Description',
            'wedding_id' => $wedding_data->id,
            'status' => 'open',
        ]);

        $response = $this->delete(route('tasks.destroy', ['wedding' => $extraWedding->id, 'task' => $task->id]));
        $response->assertStatus(403);
    }

    public function createWeddingData(User $user, $role)
    {
        $wedding = Wedding::create([
            'id' => 1,
            'name' => 'Test Wedding',
        ]);

        $role = Role::where('name', $role)->first();

        $wedding->users()->attach(auth()->id(), ['role_id' => $role->id]);

        return $wedding;
    }

    public function createUserAndLogin(string $role)
    {
        $user = User::factory()->create([
            'name' => 'Test User',
        ]);

        Sanctum::actingAs($user);

        return $this->createWeddingData($user, $role);
    }

    public function createTaskCategory()
    {
        return TaskCategory::factory()->create();
    }

    public function seedPermissions()
    {
        $this->seed(RolePermissionSeeder::class);
    }
}
