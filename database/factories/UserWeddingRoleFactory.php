<?php

namespace Database\Factories;

use App\Models\UserWeddingRole;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserWeddingRoleFactory extends Factory
{
    protected $model = UserWeddingRole::class;

    public function definition(): array
    {
        return [
            'user_id' => null,
            'wedding_id' => 1,
            'role' => $this->faker->randomElement(['wedding_admin', 'wedding_manager', 'wedding_guest']),
        ];
    }
}
