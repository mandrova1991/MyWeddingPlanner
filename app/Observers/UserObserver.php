<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param \App\Models\User $user
     * @return void
     */
    public function creating(User $user)
    {
        $user->avatar_initials = collect(explode(' ', $user->name))
            ->map(fn($name) => strtoupper(substr($name, 0, 1)))
            ->implode('');
    }
}
