<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'street',
        'number',
        'city',
        'country',
        'entrance',
        'parking',
        'in_house_location',
        'extra_description',
    ];
}
