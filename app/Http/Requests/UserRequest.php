<?php

namespace App\Http\Requests;

use App\Rules\PhoneNumber;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'role_id'        => ['required', Rule::exists('roles', 'id')],
            'name'           => ['required', 'string', 'max:255'],
            'email'          => ['required', 'string', 'email', 'max:255', Rule::unique('users')],
            'phone'          => ['required', new PhoneNumber, 'string', 'max:255', Rule::unique('users')->ignore(current_user())],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'name'            => 'Nom et prénom',
            'email'           => 'Adresse email',
            'phone'           => 'Numéro de téléphone',
            'role_id'         => 'Rôle',
        ];
    }
}
