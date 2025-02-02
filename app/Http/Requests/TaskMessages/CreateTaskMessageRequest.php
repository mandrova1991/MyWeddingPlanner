<?php

namespace App\Http\Requests\TaskMessages;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaskMessageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'task_id'    => ['required', 'exists:tasks,id'],
            'user_id'    => ['required', 'exists:users,id'],
            'message'    => ['required'],
            'replied_to' => ['nullable', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        $wedding = $this->route('wedding');
        $user = auth()->user();

        return $user->hasPermissionInWedding('create_task_messages', $wedding);
    }
}
