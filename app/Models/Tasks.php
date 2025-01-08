<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tasks extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'status',
        'wedding_id',
        'parent_task',
        'category_id',
        'order',
        'due_date',
    ];

    protected function casts()
    {
        return [
            'due_date' => 'datetime',
        ];
    }

    public function parentTask(): BelongsTo
    {
        return $this->belongsTo(Tasks::class, 'parent_task');
    }

    public function subtasks(): HasMany
    {
        return $this->hasMany(Tasks::class, 'parent_task');
    }

    public function taskCategory(): BelongsTo
    {
        return $this->belongsTo(TaskCategory::class, 'category_id');
    }

    public function wedding(): BelongsTo
    {
        return $this->belongsTo(Wedding::class, 'wedding_id');
    }

    public function assignees(): HasMany
    {
        return $this->hasMany(TaskAssignee::class, 'tasks_id');
    }

    public function getCustomArray()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'wedding_id' => $this->wedding_id,
            'category_id' => $this->category_id,
            'order' => $this->order,
            'due_date' => $this->due_date,
            'priority' => $this->priority,
            'progress' => $this->progress,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'subtasks' => $this->subtasks(),
        ];
    }
}
