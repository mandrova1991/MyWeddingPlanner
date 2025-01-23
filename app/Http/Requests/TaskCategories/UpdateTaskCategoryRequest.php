<?php

namespace App\Http\Requests\TaskCategories;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'       => ['required', 'string'],
            'wedding_id' => ['required', 'integer'],
            'created_by' => ['required', 'integer'],
            'order'      => ['required', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        $wedding = $this->route('wedding');
        $user = auth()->user();
        return $user->hasPermissionInWedding('update_task_category', $wedding);
    }
}
