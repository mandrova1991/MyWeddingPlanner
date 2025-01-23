<?php

namespace App\Http\Resources;

use App\Models\TaskCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin TaskCategory */
class TaskCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'created_by' => $this->created_by,
            'order'      => $this->order,
            'wedding_id' => $this->wedding_id,
        ];
    }
}
