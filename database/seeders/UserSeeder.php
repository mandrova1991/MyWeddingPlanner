<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserWeddingRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {

        // Create a first user we can use to login
        $user1 = User::factory()->create([
            'name' => 'Nick Torr',
            'email' => 'nick@home.nl',
            'password' => Hash::make('password')
        ]);
        UserWeddingRole::factory()->create([
            'user_id' => $user1->id,
            'role_id' => 1
        ]);


        // create a second user we can use to login with
        $user2 = User::factory()->create([
            'name' => 'Hans Torr',
            'email' => 'hans@home.nl',
            'password' => Hash::make('password')
        ]);
        UserWeddingRole::factory()->create([
            'user_id' => $user2->id,
            'role_id' => 1
        ]);


        // Create 10 other users in order to simulate 10 extra users.
        User::factory(10)->create()
            ->each(function ($user) {
                UserWeddingRole::factory(1)->create([
                    'user_id' => $user->id,
                ]);
            });
    }
}
