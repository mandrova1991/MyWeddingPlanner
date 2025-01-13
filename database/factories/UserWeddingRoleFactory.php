<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\UserWeddingRole;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserWeddingRoleFactory extends Factory
{
    protected $model = UserWeddingRole::class;

    public function definition(): array
    {
        $roles = Role::pluck('id');

        return [
            'user_id' => null,
            'wedding_id' => 1,
            'role_id' => $this->faker->randomElement($roles),
        ];
    }
}
