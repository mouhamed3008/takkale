<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Customer extends Model
{
    //
    use HasFactory;
    use SoftDeletes;
    // protected $dates = ['deleted_at'];

    protected $guarded = [];

    protected static function booted(): void
    {
        static::creating(function (Customer $customer) {
            if (Auth::check()) {
                $customer->user_id = current_user()->id;
                $customer->company_id = current_user()->company_id ?? current_user()->company?->id;
            }
        });
    }

    public const ABILITIES_LIST = [
        'Customers' => [
            ['name' => 'list_customer', 'label' => 'Afficher tous les comptes utilisateurs', 'key' => 'CUSTOMER'],
            ['name' => 'create_customer', 'label' => 'Créer un compte utilisateur', 'key' => 'CUSTOMER'],
            ['name' => 'read_customer', 'label' => 'Voir les informations du compte', 'key' => 'CUSTOMER'],
            ['name' => 'update_customer', 'label' => 'Modifier les informations du compte utilisateur', 'key' => 'CUSTOMER'],

        ],
    ];
}
