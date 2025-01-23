<?php

namespace App\Models;

use Illuminate\Console\View\Components\Task;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Wedding extends Model
{
    protected $fillable = [
        'name',
        'date',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_wedding_roles')
            ->withPivot('role_id');
    }

    public function taskCategories(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TaskCategory::class, 'wedding_id');
    }

    public function tasks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Task::class, 'wedding_id');
    }
}
