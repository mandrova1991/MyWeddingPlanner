<?php

namespace App\Http\Resources;

use App\Models\TaskAssignee;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin TaskAssignee */
class TaskAssigneeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'      => $this->id,
            'task_id' => $this->pivot->task_id,
            'user_id' => $this->pivot->user_id,
        ];
    }
}
