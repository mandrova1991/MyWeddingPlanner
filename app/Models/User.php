<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function weddings() :belongsToMany
    {
        return $this->belongsToMany(Wedding::class, 'user_wedding_roles')
            ->withPivot('role_id');
    }

    public function weddingRoles()
    {
        return $this->belongsToMany(Wedding::class, 'user_wedding_roles')
            ->withPivot('role_id')
            ->withTimestamps();
    }

    public function hasPermissionInWedding(string $permission, Wedding $wedding): bool
    {
        $role = $this->weddingRoles()->where('wedding_id', $wedding->id)->first();

        if (!$role){
            return false;
        }

        $roleModel = Role::find($role->pivot->role_id);

        if (!$roleModel){
            return false;
        }

        return $roleModel->permissions->contains('name', $permission);
    }

    public function assignedToTasks(): BelongsToMany
    {
        return $this->belongsToMany(TaskAssignee::class, 'user_task_assignees', 'id', 'user_id');
    }

    public function listPermissionsInWedding(Wedding $wedding)
    {
        $role = $this->weddingRoles()->where('wedding_id', $wedding->id)->first();
        if (!$role){
            return false;
        }

        $roleModel = Role::find($role->pivot->role_id);
        if (!$roleModel){
            return false;
        }

        return $roleModel->permissions->pluck('name');
    }
}
