<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\TaskMassage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TaskMassageFactory extends Factory
{
    protected $model = TaskMassage::class;

    public function definition(): array
    {
        return [
            'message'    => $this->faker->word(),
            'replied_to' => $this->faker->randomNumber(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'task_id' => Task::factory(),
            'user_id' => User::factory(),
        ];
    }
}
