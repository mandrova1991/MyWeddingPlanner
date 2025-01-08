<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWeddingRole extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'user_wedding_roles';

    protected $fillable = [
        'user_id',
        'wedding_id',
        'role',
    ];
}
