<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('wedding_events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('wedding_id');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
        });
    }

    public function down()
    {
        Schema::dropIfExists('wedding_events');
    }
};
