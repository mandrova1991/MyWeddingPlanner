<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'user_id',
        'message',
        'replied_to',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
