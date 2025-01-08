<?php

namespace Database\Factories;

use App\Models\TaskAssignee;
use App\Models\Tasks;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskAssigneeFactory extends Factory
{
    protected $model = TaskAssignee::class;

    public function definition(): array
    {
        return [

            'user_id' => User::inRandomOrder()->first()->id,
            'tasks_id' => Tasks::inRandomOrder()->first()->id,
        ];
    }
}
