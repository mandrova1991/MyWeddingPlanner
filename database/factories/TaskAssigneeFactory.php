<?php

namespace Database\Factories;

use App\Models\TaskAssignee;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskAssigneeFactory extends Factory
{
    protected $model = TaskAssignee::class;

    public function definition(): array
    {
        return [

            'user_id' => User::inRandomOrder()->first()->id,
            'task_id' => Task::inRandomOrder()->first()->id,
        ];
    }
}
