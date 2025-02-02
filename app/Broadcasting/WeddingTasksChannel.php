<?php

namespace App\Broadcasting;

use App\Models\User;
use App\Models\Wedding;
use Illuminate\Broadcasting\Channel;

class WeddingTasksChannel extends Channel
{
    public function __construct()
    {
    }

    public function join(User $user, Wedding $wedding)
    {
        return $user->hasPermissionInWedding('update-task', $wedding);
    }
}
