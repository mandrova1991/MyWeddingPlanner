<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('street');
            $table->string('number');
            $table->string('city');
            $table->string('country');
            $table->string('entrance');
            $table->text('parking');
            $table->string('in_house_location');
            $table->text('extra_description');
        });
    }

    public function down()
    {
        Schema::dropIfExists('locations');
    }
};
