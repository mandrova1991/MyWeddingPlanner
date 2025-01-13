<?php

namespace Database\Seeders;

use App\Models\TaskAssignee;
use App\Models\TaskCategory;
use App\Models\Tasks;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\UserWeddingRole;
use App\Models\Wedding;
use Illuminate\Console\View\Components\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\Concerns\Has;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
        ]);

        Wedding::create([
            'name' => 'Wedding 1',
            'date' => '2019-01-01',
        ]);

        User::factory()->create([
            'name' => 'Nick Verbeek',
            'email' => 'nick@home.nl',
            'password' => Hash::make('password')
        ])->each(function ($user) {
            UserWeddingRole::factory()->create([
                'user_id' => $user->id,
                'role_id' => 1
            ]);
        });

        User::factory(10)->create()
            ->each(function ($user) {
                UserWeddingRole::factory(1)->create([
                    'user_id' => $user->id,
                ]);
            });

        TaskCategory::factory(3)
            ->create()
            ->each(function ($taskCategory) {
                $orderValues = range(0, 9);

                Tasks::factory(3)
                    ->create([
                        'category_id' => $taskCategory->id,
                        'order' => function ($task) use (&$orderValues) {
                            return array_pop($orderValues);
                        },
                    ]);
            });

        TaskAssignee::factory(5)->create();


    }
}
