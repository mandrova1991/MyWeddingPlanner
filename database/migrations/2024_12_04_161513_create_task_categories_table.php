<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('task_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('wedding_id');
            $table->integer('created_by')->nullable();
            $table->integer('order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_categories');
    }
};
