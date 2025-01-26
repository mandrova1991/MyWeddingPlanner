<?php

namespace App\Http\Requests\TaskMessages;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskMessageRequest extends FormRequest
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

        // if user is creator of the message the may update the message
        if ($message->user_id == $user->id) {
            return true;
        }

        return $user->hasPermissionInWedding('update_task_message', $wedding);
    }
}
