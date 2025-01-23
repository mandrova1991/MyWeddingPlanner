<?php

namespace App\Http\Requests\TaskCategories;

use Illuminate\Foundation\Http\FormRequest;

class CreateNewTaskCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'       => ['required', 'string'],
            'wedding_id' => ['required', 'integer'],
            'order'      => ['required', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        $wedding = $this->route('wedding');
        $user = auth()->user();
        return $user->hasPermissionInWedding('create_task_category', $wedding);
    }
}
