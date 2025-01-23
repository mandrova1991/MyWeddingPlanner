<?php

namespace App\Http\Requests\TaskCategories;

use Illuminate\Foundation\Http\FormRequest;

class DeleteTaskCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [

        ];
    }

    public function authorize(): bool
    {
        $wedding = $this->route('wedding');
        $user = auth()->user();
        return $user->hasPermissionInWedding('delete_task_category', $wedding);
    }
}
