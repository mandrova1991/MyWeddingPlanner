<?php

use App\Models\User;
use App\Models\Wedding;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('test', function () {
    return true;
});

Broadcast::channel('wedding.${wedding_id}.tasks', function (User $user, Wedding $wedding) {
    return $user->hasPermissionInWedding('update_task', $wedding);
});