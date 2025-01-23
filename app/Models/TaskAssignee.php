<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskAssignee extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'tasks_id',
    ];

//    public function user(): BelongsTo
//    {
//        return $this->belongsTo(User::class);
//    }
//
//    public function tasks(): BelongsTo
//    {
//        return $this->belongsTo(Task::class);
//    }
}
