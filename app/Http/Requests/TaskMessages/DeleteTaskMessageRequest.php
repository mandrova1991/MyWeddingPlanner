<?php

namespace App\Http\Requests\TaskMessages;

use Illuminate\Foundation\Http\FormRequest;

class DeleteTaskMessageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'task_id'    => ['required', 'exists:tasks'],
            'user_id'    => ['required', 'exists:users'],
            'message'    => ['required'],
            'replied_to' => ['nullable', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        $wedding = $this->route('wedding');
        $message = $this->route('message');
        $user = auth()->user();

        // user may delete is message is his own.
        if ($user->id === $message->user_id) {
            return true;
        }

        return $user->hasPermissionInWedding('delete_task_message', $wedding);
    }
}
