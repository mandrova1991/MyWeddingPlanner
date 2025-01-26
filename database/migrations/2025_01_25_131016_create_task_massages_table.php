<?php

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('task_massages', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Task::class)->constrained('tasks');
            $table->foreignIdFor(User::class)->constrained('users');
            $table->longText('message');
            $table->unsignedBigInteger('replied_to')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_massages');
    }
};
