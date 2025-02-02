<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\TaskMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TaskMessageFactory extends Factory
{
    protected $model = TaskMessage::class;

    public function definition(): array
    {
        return [
            'message'    => $this->faker->sentence(20),
            'replied_to' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'task_id' => Task::factory(),
            'user_id' => User::inRandomOrder()->first(),
        ];
    }
}
