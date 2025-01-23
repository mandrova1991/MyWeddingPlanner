<?php

namespace App\Models;

use Illuminate\Console\View\Components\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskCategory extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'wedding_id',
        'order',
        'created_by',
        'category_id'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'category_id', 'id');
    }

    public function wedding()
    {
        return $this->belongsTo(Wedding::class, 'wedding_id' );
    }
}
