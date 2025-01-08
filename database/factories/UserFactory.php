<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
//        $firstName = fake()->firstName();
//        $lastName = fake()->lastName();
//        $initials = Str::substr($firstName, 0, 1) . Str::substr($lastName, 0, 1);

        return [
            'name' => fake()->firstName() . ' ' . fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'avatar_color' => fake()->randomElement([
                '#94a3b8', '#9ca3af', '#a1a1aa', '#a3a3a3', '#a8a29e',
                '#f87171', '#fb923c', '#fbbf24', '#facc15', '#a3e635',
                '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8',
                '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9',
                '#f472b6', '#fb7185',
            ]),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
