<?php

namespace App\Http\Resources;

use App\Models\TaskMessage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin TaskMessage */
class TaskMassageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'message'    => $this->message,
            'replied_to' => new TaskMassageResource($this->replied_to),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'task_id' => $this->task_id,
            'user_id' => $this->user_id,
        ];
    }
}
