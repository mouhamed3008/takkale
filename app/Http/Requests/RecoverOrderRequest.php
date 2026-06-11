<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RecoverOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id',
            'amount_paid' => 'nullable|numeric|min:0',
            'payment_method_id' => 'required_with:amount_paid|exists:payment_methods,id',
        ];
    }
}
