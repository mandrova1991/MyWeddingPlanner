<?php

namespace Database\Factories;

use App\Models\TaskCategory;
use App\Models\Wedding;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskCategoryFactory extends Factory
{
    protected $model = TaskCategory::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'wedding_id' => 1,
            'created_by' => $this->faker->randomNumber(),
            'order' => $this->faker->unique()->numberBetween(0, 20),
        ];
    }
}
