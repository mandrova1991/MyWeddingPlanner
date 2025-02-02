<?php

use App\Broadcasting\TaskMessagesChannel;
use App\Broadcasting\WeddingTasksChannel;
use Illuminate\Support\Facades\Broadcast;

//Broadcast::routes(['middleware' => ['auth:sanctum']]);

Broadcast::channel('wedding.${wedding_id}.tasks', WeddingTasksChannel::class );
Broadcast::channel('tasks.{task}.messages', TaskMessagesChannel::class);