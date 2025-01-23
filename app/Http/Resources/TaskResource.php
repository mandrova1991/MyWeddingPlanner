<?php

namespace App\Http\Resources;

use App\Models\Task;
use App\Models\TaskAssignee;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Task */
class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'status'      => $this->status,
            'order'       => $this->order,
            'due_date'    => $this->due_date,
            'priority'    => $this->priority,
            'progress'    => $this->progress,
            'category_id' => $this->category_id,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
            'created_by'  => $this->created_by,
            'updated_by'  => $this->updated_by,
            'wedding_id'  => $this->wedding_id,
            'parent_task' => $this->parent_task,
            'assignees'   => TaskAssigneeResource::collection($this->assignees),
            'subtasks'    => TaskResource::collection($this->subtasks),
        ];
    }
}
