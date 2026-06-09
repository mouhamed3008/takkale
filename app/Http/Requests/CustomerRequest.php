<?php

namespace App\Http\Requests;

use App\Rules\PhoneNumber;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $customerId = $this->route('customer');

        return [
            'fullname' => ['required', 'string', 'max:255'],
            'phone' => ['required', new PhoneNumber, 'string', 'max:255', Rule::unique('customers', 'phone')->ignore($customerId)],
            'email' => ['nullable', 'string', 'email', 'max:255', Rule::unique('customers', 'email')->ignore($customerId)],
            'address' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'fullname' => 'Nom complet',
            'phone' => 'Numéro de téléphone',
            'email' => 'Adresse email',
            'address' => 'Adresse',
        ];
    }
}
