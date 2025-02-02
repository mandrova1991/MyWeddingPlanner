<?php

namespace Database\Seeders;

use App\Models\TaskAssignee;
use App\Models\TaskCategory;
use App\Models\Task;
use App\Models\TaskMessage;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\UserWeddingRole;
use App\Models\Wedding;
//use Illuminate\Console\View\Components\Task;
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
        Wedding::create([
            'name' => 'Wedding 1',
            'date' => '2019-01-01',
        ]);

        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
        ]);





        TaskCategory::factory(3)
            ->create()
            ->each(function ($taskCategory) {
                $orderValues = range(0, 9);

                Task::factory(3)
                    ->create([
                        'category_id' => $taskCategory->id,
                        'order' => function ($task) use (&$orderValues) {
                            return array_pop($orderValues);
                        },
                    ])
                ->each(function ($task) {
                    TaskMessage::factory(3)
                    ->create([
                        'task_id' => $task->id,
                    ]);
                });
            });

        TaskAssignee::factory(5)->create();


    }
}
