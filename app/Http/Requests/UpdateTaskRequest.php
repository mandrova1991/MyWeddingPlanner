<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $wedding = $this->route('wedding');
        $user = auth()->user();
        return $user->hasPermissionInWedding('update_task', $wedding);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['numeric'],
            'title' => ['required', 'string'],
            'description' => ['string', 'nullable'],
            'status' => ['required', 'string'],
            'category_id' => ['required', 'integer'],
            'order' => ['required', 'integer'],
            'due_date' => ['date', 'nullable'],
            'parent_task' => ['numeric', 'nullable'],
            'wedding_id' => ['numeric', 'required'],
            'priority' => ['string', 'nullable'],
            'progress' => ['integer', 'nullable'],
            'created_at' => ['date'],
            'updated_at' => ['date'],
            'updated_by' => ['numeric', 'nullable'],
            'created_by' => ['numeric', 'nullable'],
        ];
    }
}
