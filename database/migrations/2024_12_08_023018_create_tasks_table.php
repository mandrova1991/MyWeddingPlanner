<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status');
            $table->integer('order')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->string('priority')->default('none');
            $table->integer('progress')->default(0);
            $table->unsignedBigInteger('category_id')->nullable();

            // Relationships
            $table->foreignIdFor(\App\Models\User::class, 'created_by')->nullable();
            $table->foreignIdFor(\App\Models\User::class, 'updated_by')->nullable();
            $table->foreignIdFor(\App\Models\Wedding::class);
            $table->foreignIdFor(\App\Models\Tasks::class, 'parent_task')->nullable();
            $table->foreign('category_id')->references('id')->on('task_categories')->onDelete('cascade');

            $table->timestamps();


        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
