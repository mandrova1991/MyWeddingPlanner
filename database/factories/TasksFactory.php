<?php

namespace Database\Factories;

use App\Models\Wedding;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TasksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => implode(' ', $this->faker->words(5)),
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['todo', 'planned', 'wait_on_review', 'completed']),
            'wedding_id' => 1,
            'parent_task' => null,
            'category_id' => null,
            'order' => null,
            'due_date' => $this->faker->date(),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'progress' => $this->faker->numberBetween(0, 100),
            'created_by' => null,
            'updated_by' => null,
        ];
    }
}
