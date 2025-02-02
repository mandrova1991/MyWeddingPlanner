<?php

namespace App\Http\Requests\TaskMessages;

use App\Models\Wedding;
use Illuminate\Foundation\Http\FormRequest;

class IndexTaskMessageRequest extends FormRequest
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
        return $user->hasPermissionInWedding('view_task_messages', $wedding);
    }
}
