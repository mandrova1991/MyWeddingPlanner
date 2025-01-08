<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wedding_Event extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'wedding_id',
        'start_time',
        'end_time',
    ];

    protected function casts()
    {
        return [
            'start_time' => 'datetime',
            'end_time' => 'datetime',
        ];
    }
}
